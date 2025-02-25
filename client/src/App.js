import React, { Component } from "react";
import axios from "axios";
import getWeb3 from "./getWeb3";
import Main from "./components/Main/Main";
import ItemManagerContracts from "./contracts/ItemManager.json";
import ItemContract from "./contracts/Item.json";
import "./App.css";

class App extends Component {
  state = {
    loaded: false,
    items: [],
    currentView: "home",
    cost: "",
    itemName: "",
    account: "",
  };

  componentDidMount = async () => {
    try {
      this.web3 = await getWeb3();
      this.accounts = await this.web3.eth.getAccounts();
      this.setState({ account: this.accounts[0] });
      this.networkId = await this.web3.eth.net.getId();

      this.itemManager = new this.web3.eth.Contract(
        ItemManagerContracts.abi,
        ItemManagerContracts.networks[this.networkId] &&
          ItemManagerContracts.networks[this.networkId].address
      );

      this.item = new this.web3.eth.Contract(
        ItemContract.abi,
        ItemContract.networks[this.networkId] &&
          ItemContract.networks[this.networkId].address
      );

      this.listenToPaymentEvent();
      this.loadItems();
      this.setState({ loaded: true });
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", this.handleAccountsChanged);
      }
    } catch (error) {
      alert(
        "Không tải được web3, tài khoản hoặc hợp đồng. Kiểm tra bảng điều khiển để biết chi tiết."
      );
      console.error(error);
    }
  };

  componentWillUnmount() {
    if (window.ethereum) {
      window.ethereum.removeListener(
        "accountsChanged",
        this.handleAccountsChanged
      );
    }
  }

  handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      console.log("Không tìm thấy tài khoản nào");
    } else {
      this.setState({ account: accounts[0] });
      // Reload the entire page
      window.location.reload();
    }
  };

  listenToPaymentEvent = () => {
    this.itemManager.events.SupplyChainStep().on("data", async (evt) => {
      try {
        console.log(evt);
        let itemObject = await this.itemManager.methods
          .items(evt.returnValues._itemIndex)
          .call();
        if (Number(itemObject._state) === 1) {
          alert("Vật phẩm " + itemObject._identifier + " đã được thanh toán, giao ngay");
        }
      } catch (error) {
        console.error("Error processing payment event:", error);
      }
    });
  };

  loadItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      // Check the structure of the response
      console.log("Loaded items:", response.data);
      this.setState({ items: response.data });
    } catch (error) {
      console.error("Error loading items from backend:", error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    const { cost, itemName } = this.state;

    try {
      const result = await this.itemManager.methods
        .createItem(itemName, cost)
        .send({ from: this.accounts[0] });
      alert(`Gửi ${cost} Wei đén ${result.logs[0].address}`);
      const itemAddress =
        result.events.SupplyChainStep.returnValues._itemAddress;
      const itemIndex = Number(
        result.events.SupplyChainStep.returnValues._itemIndex
      );
      console.log("ItemIndex:", itemIndex);
      const itemData = {
        name: itemName,
        cost: cost,
        fromAddress: this.accounts[0],
        toAddress: result.logs[0].address,
        itemAddress: itemAddress,
        hash: result.transactionHash,
        status: "Create",
        contractIndex: itemIndex,
      };

      const response = await axios.post(
        "http://localhost:5000/api/items/add",
        itemData
      );
      console.log("Item added to backend:", response.data);
      this.loadItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  handleBuyItem = async (itemId, itemPrice) => {
    try {
      const selectedItem = this.state.items.find((item) => item._id === itemId);

      if (!selectedItem || isNaN(itemPrice) || itemPrice <= 0) {
        throw new Error("Vị trí vật phẩm hoặc giá vật phẩm không hợp lệ");
      }

      if (
        this.accounts[0].toLowerCase() ===
        selectedItem.fromAddress.toLowerCase()
      ) {
        throw new Error("Chủ sở hữu không thể mua sản phẩm của chính mình");
      }

      const itemOnChain = await this.itemManager.methods.items(selectedItem.contractIndex).call();

      if (Number(itemOnChain._state) === 1) {
        alert("Sản phẩm này đã được mua");
        return;
      }

      const valueInWei = this.web3.utils.toWei(itemPrice.toString(), "wei");
      const itemIndexAsNumber = selectedItem.contractIndex;

      if (isNaN(itemIndexAsNumber)) {
        throw new Error("Invalid item contract index");
      }

      await this.itemManager.methods
        .triggerPayment(itemIndexAsNumber)
        .send({ from: this.accounts[0], value: valueInWei });

      const itemData = {
        index: selectedItem._id,
        status: "Purchased",
        buyer: this.accounts[0],
      };

      await axios.post("http://localhost:5000/api/items/update", itemData);
      this.loadItems();
    } catch (error) {
      console.error("Error buying item:", error.message);
      alert(`Error buying item: ${error.message}`);
    }
  };

  handleDeliverItem = async (itemId) => {
    try {
      const selectedItem = this.state.items.find((item) => item._id === itemId);

      if (!selectedItem) {
        throw new Error("Invalid item");
      }

      const itemOnChain = await this.itemManager.methods.items(selectedItem.contractIndex).call();

      if (Number(itemOnChain._state) !== 1) {
        throw new Error("Sản phẩm chưa sẵn sàng để giao hàng");
      }

      if (
        this.accounts[0].toLowerCase() !==
        selectedItem.fromAddress.toLowerCase()
      ) {
        throw new Error("Chỉ có chủ sở hữu mới có thể giao hàng");
      }

      const itemIndexAsNumber = selectedItem.contractIndex;

      if (isNaN(itemIndexAsNumber)) {
        throw new Error("Invalid item contract index");
      }

      await this.itemManager.methods
        .triggerDelivery(itemIndexAsNumber)
        .send({ from: this.accounts[0] });

      const itemData = {
        index: selectedItem._id,
        status: "Delivered",
      };

      await axios.post("http://localhost:5000/api/items/update", itemData);
      alert("Sản phẩm đã được giao thành công");
      this.loadItems();
    } catch (error) {
      console.error("Error delivering item:", error.message);
      alert(`Error delivering item: ${error.message}`);
    }
  };

  handleSubmitRating = async (itemId, rating) => {
    try {
      const selectedItem = this.state.items.find((item) => item._id === itemId);

      if (!selectedItem) {
        throw new Error("Mặt hàng không hợp lệ");
      }

      const itemIndexAsNumber = selectedItem.contractIndex;

      if (isNaN(itemIndexAsNumber)) {
        throw new Error("Invalid item contract index");
      }

      await this.itemManager.methods
        .submitRating(itemIndexAsNumber, rating)
        .send({ from: this.state.account });

      const itemData = {
        index: selectedItem._id,
        rating: rating,
        isRated: true,
      };

      await axios.post("http://localhost:5000/api/items/update", itemData);
      alert("Đã gửi đánh giá thành công!");
      this.loadItems(); // Refresh the list of items
    } catch (error) {
      console.error("Error submitting rating:", error.message);
      alert(`Error submitting rating: ${error.message}`);
    }
  };

  changeView = (view) => {
    this.setState({ currentView: view });
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        <Main
          currentView={this.state.currentView}
          items={this.state.items}
          onSubmit={this.handleSubmit}
          onInputChange={this.handleInputChange}
          onViewChange={this.changeView}
          handleBuyItem={this.handleBuyItem}
          handleDeliverItem={this.handleDeliverItem}
          handleSubmitRating={this.handleSubmitRating}
          account={this.state.account}
        />
      </div>
    );
  }
}

export default App;
