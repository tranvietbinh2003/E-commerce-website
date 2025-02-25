const ItemManager = artifacts.require("ItemManager");

module.exports = async function (deployer) {
  await deployer.deploy(ItemManager);
};
