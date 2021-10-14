import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import API from "../../Api";
import "./Product.scss";

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("token");
    this.api = "http://192.168.30.105:8080/laravel/public/upload/user/product";
    this.state = {
      myProducts: {},
    };
  }

  componentDidMount() {
    const url = "/api/user/my-product";
    const config = {
      headers: {
        Authorization: "Bearer " + this.token,
      },
    };
    API.get(url, config)
      .then((res) => {
        if (res.data.response === "success") {
          this.setState({
            myProducts: res.data.data,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  handleDeleteProduct = (productId, productName) => {
    const url = `/api/user/delete-product/${productId}`;
    const config = {
      headers: {
        Authorization: "Bearer " + this.token,
      },
    };
    if (window.confirm(`Do you want to delete ${productName}`)) {
      API.get(url, config)
        .then((res) => {
          if (res.data.response === "success") {
            const remainProduct = Object.values(this.state.myProducts).filter(
              (product) => product.id !== productId
            );
            this.setState({
              myProducts: remainProduct,
            });
            alert("Delete successfully");
          }
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  render() {
    const myProducts = this.state.myProducts;
    return (
      <div className="product-section col-sm-9">
        <table className="product__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(myProducts).map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  {JSON.parse(product.image).map((img, index) => (
                    <span key={index}>
                      <img
                        src={`${this.api}/${product.id_user}/${img}`}
                        alt={`img${index}`}
                      />
                    </span>
                  ))}
                </td>
                <td>{product.price}$</td>
                <td>
                  <Link to={`/account/product/edit/${product.id}`}>
                    <i className="far fa-edit"></i>
                  </Link>
                  <button
                    onClick={() =>
                      this.handleDeleteProduct(product.id, product.name)
                    }
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/account/product/add">
          <button className="btn-new-product">Add new</button>
        </Link>
      </div>
    );
  }
}

export default Product;
