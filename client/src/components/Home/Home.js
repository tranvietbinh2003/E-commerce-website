import React from 'react';
import "./style.css";
import raucu1 from "../images/raucu1.png"
import raucu2 from "../images/raucu2.png"
import raucu3 from "../images/raucu3.png"
import anh1 from "../images/muado.png"
const Home = () => {
  return (
    <div id="homemain">
      <div id="home1">
        <div className="home1-left">
          <h1 className="h1-title">
            Chào mừng bạn đến với
            <span id="title-1"> nhà hàng </span>
            của chúng tôi.
          </h1>
          <p id="home-content">
            Trang web Shopfruit là một nền tảng trực tuyến chuyên cung cấp
            các loại trái cây tươi ngon và chất lượng cao. Với mục tiêu mang
            đến sự tiện lợi và trải nghiệm mua sắm dễ dàng cho khách hàng,
            Shopfruit cam kết cung cấp những sản phẩm an toàn, có nguồn gốc
            rõ ràng và được bảo quản tốt nhất. Đặc biệt, Shopfruit luôn đặt
            khách hàng lên hàng đầu, với dịch vụ chăm sóc tận tâm và giao
            hàng nhanh chóng. Hãy đến với Shopfruit để tận hưởng những hương
            vị tươi ngon từ thiên nhiên, ngay tại nhà của bạn!
          </p>
        </div>
        <div className="home1-right">
          <img src={raucu1} alt="Rau Cu 1" />
          <img src={raucu2} alt="Rau Cu 2" />
          <img src={raucu3} alt="Rau Cu 3" />
        </div>
      </div>
      <div id="home2">
        <div className="home2-left">
          <img src={anh1} alt="Anh 1" />
        </div>
        <div className="home2-right">
          <h1 id="home2-title">
            Chào mừng đến với ShopFruit, một trang web thương mại điện tử
          </h1>
          <p id="home2-content">
            Bạn đang tìm kiếm những loại trái cây tươi ngon và bổ dưỡng? Hãy
            ghé thăm trang sản phẩm của chúng tôi, nơi bạn có thể dễ dàng
            tìm thấy các loại trái cây yêu thích với chất lượng tốt nhất.
            Tại ShopFruit, chúng tôi mang đến cho bạn một danh mục sản phẩm
            đa dạng, từ những trái cây nhiệt đới ngọt lịm, đến những loại
            trái cây đặc sản độc đáo, tất cả đều được chọn lọc kỹ càng để
            đảm bảo sự hài lòng cho bạn. Bấm vào đây để khám phá các sản
            phẩm tuyệt vời của chúng tôi và bắt đầu trải nghiệm mua sắm ngay
            hôm nay!
          </p>
          <button>Đến Ngay</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
