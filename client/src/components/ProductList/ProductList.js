import React, { useState } from "react";
import "./style.css";
import hethang from "../images/hethang.png";

const ProductList = ({
  items,
  handleBuyItem,
  handleDeliverItem,
  handleSubmitRating,
  account,
}) => {
  const [rating, setRating] = useState({});

  const shortenAddress = (address) => {
    return address
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : "Địa chỉ không có sẵn";
  };

  const handleRatingChange = (itemId, e) => {
    setRating({ ...rating, [itemId]: e.target.value });
  };

  const submitRating = (itemId) => {
    const itemRating = rating[itemId];
    if (itemRating) {
      handleSubmitRating(itemId, itemRating);
    } else {
      alert("Vui lòng nhập đánh giá trước khi gửi.");
    }
  };

  // Function to render stars based on rating
  const renderStars = (ratingValue) => {
    if (ratingValue === 0) {
      return <span> Chưa có đánh giá nào</span>;
    }

    return (
      <div className="star-display">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= ratingValue ? "filled-star" : "empty-star"}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="product-list">
      <h2>Sản phẩm</h2>
      {items.length > 0 ? (
        items.map((item) => {
          return (
            <div className="product-item" key={item._id}>
              <div className="product-name">{item.name}</div>
              <div className="product-price">Giá: {item.cost} Wei</div>
              <div className="product-status">Trạng thái: {item.status}</div>
              <div className="product-address">
                Địa chỉ sản phẩm:{" "}
                <span className="shortened-address">
                  {shortenAddress(item.itemAddress)}
                </span>
              </div>

              {item.status !== "Delivered" && (
                <>
                  {item.status !== "Purchased" && (
                    <button onClick={() => handleBuyItem(item._id, item.cost)}>
                      Mua Hàng
                    </button>
                  )}

                  {item.status === "Purchased" && (
                    <button onClick={() => handleDeliverItem(item._id)}>
                      Giao Hàng
                    </button>
                  )}
                </>
              )}

              {item.status === "Delivered" && (
                <>
                  {item.buyer &&
                  account &&
                  item.buyer.toLowerCase() === account.toLowerCase() ? (
                    <>
                      {item.isRated ? (
                        <div className="product-rating">
                          <strong>Đánh giá:</strong>
                          {renderStars(item.rating !== null ? item.rating : 0)}
                        </div>
                      ) : (
                        <div className="product-rating">
                          <div className="rating">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <React.Fragment key={star}>
                                <input
                                  type="radio"
                                  id={`star${star}-${item._id}`}
                                  name={`rating-${item._id}`}
                                  value={star}
                                  onChange={(e) =>
                                    handleRatingChange(item._id, e)
                                  }
                                />
                                <label htmlFor={`star${star}-${item._id}`}>
                                  &#9733;
                                </label>
                              </React.Fragment>
                            ))}
                          </div>
                          <button onClick={() => submitRating(item._id)}>
                            Gửi Đánh giá
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="product-rating">
                      <strong>Đánh giá:</strong>
                      {renderStars(item.rating !== null ? item.rating : 0)}
                    </div>
                  )}
                  <div className="sold-out-badge">
                    <img src={hethang} alt="Sold Out" />
                  </div>
                </>
              )}
            </div>
          );
        })
      ) : (
        <div>No items found</div>
      )}
    </div>
  );
};

export default ProductList;
