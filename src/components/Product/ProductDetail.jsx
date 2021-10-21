import React, { PureComponent } from "react";
import { PopupboxManager, PopupboxContainer } from "react-popupbox";
import "react-popupbox/dist/react-popupbox.css";

import API from "../Api";
import API_LINK from "../Api/ApiLink";

const getProductById = async (id) => {
  const url = `/api/product/detail/${id}`;
  const res = await API.get(url);
  if (res.data.response === "success") {
    return res.data.data;
  } else {
    return;
  }
};

class ProductDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.api = `${API_LINK}/upload/user/product`;
    this.state = {
      detailProduct: {},
      showcaseImg: null,
    };
  }

  async componentDidMount() {
    const productId = this.props.match.params.id;
    const detailProduct = await getProductById(productId);
    this.setState({ detailProduct: detailProduct });
  }

  openPopupbox(product, image) {
    const content = (
      <img
        src={
          this.state.showcaseImg || `${this.api}/${product.id_user}/${image}`
        }
        alt=""
      />
    );
    PopupboxManager.open({
      content,
      config: {
        titleBar: {
          enable: true,
          text: product.name,
        },
        fadeIn: true,
        fadeInSpeed: 500,
      },
    });
  }

  handleSmallImages = (e) => {
    const showcaseImg = e.target.src.replace("small_", "");
    console.log(showcaseImg);
    this.setState({ showcaseImg: showcaseImg });
  };

  render() {
    if (Object.keys(this.state.detailProduct).length !== 0) {
      const image = JSON.parse(this.state.detailProduct.image);
      const product = this.state.detailProduct;
      const finalPrice = product.price - (product.price * product.sale) / 100;
      return (
        <div className="col-sm-9">
          <div className="product-details row">
            <div className="col-sm-5">
              <div className="view-product">
                <img
                  src={
                    this.state.showcaseImg ||
                    `${this.api}/${product.id_user}/${image[0]}`
                  }
                  alt=""
                />
                <h3 onClick={() => this.openPopupbox(product, image[0])}>
                  Zoom
                </h3>
              </div>
              <div className="carousel-inner">
                {image.map((img) => (
                  <span onClick={this.handleSmallImages} key={img}>
                    <img
                      src={`${this.api}/${product.id_user}/small_${img}`}
                      alt=""
                    />
                  </span>
                ))}
              </div>
            </div>
            <div className="col-sm-7">
              <div className="product-information">
                <h4 className="newarrival">Sale {product.sale}%</h4>
                <h2>{product.name}</h2>
                <p>Product ID: {product.id}</p>
                <h4>
                  5 <i className="fas fa-star"></i>
                </h4>
                <span>
                  <span>US ${finalPrice}</span>
                  <label>Quantity:</label>
                  <input type="text" />
                  <button type="button" className="btn btn-fefault cart">
                    <i className="fa fa-shopping-cart"></i>
                    Add to cart
                  </button>
                </span>
                <p>Original Price: {product.price}</p>
                <p>
                  <b>Availability:</b> In Stock
                </p>
                <p>
                  <b>Company:</b> {product.company_profile}
                </p>
                <p>
                  <b>Condition:</b> Sale {product.sale}%
                </p>
                <p>
                  <b>Brand:</b> {product.id_brand}
                </p>
                <h4>Socials</h4>
              </div>
            </div>
          </div>
          <PopupboxContainer />
        </div>
      );
    } else return null;
  }
}

export default ProductDetail;
