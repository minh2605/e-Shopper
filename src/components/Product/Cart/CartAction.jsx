import React, { PureComponent } from "react";

// import API from "../../Api";
import API_LINK from "../../Api/ApiLink";
import "./Cart.css";

class CartAction extends PureComponent {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("token");
    this.api = `${API_LINK}/upload/user/product`;
  }

  handleTotalPrice = () => {
    const { cart } = this.props;
    const totalPrice = cart.reduce((total, product) => {
      if (product.sale !== 0) {
        return (
          total +
          (product.qty * product.price -
            (product.qty * product.price * product.sale) / 100)
        );
      } else {
        return total + product.qty * product.price;
      }
    }, 0);
    return totalPrice;
  };

  render() {
    return (
      <section id="do_action" className="row col-sm-12">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping & Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href="#a">
                  Get Quotes
                </a>
                <a className="btn btn-default check_out" href="#a">
                  Continue
                </a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>
                    Cart Sub Total <span>$59</span>
                  </li>
                  <li>
                    Eco Tax <span>$2</span>
                  </li>
                  <li>
                    Shipping Cost <span>Free</span>
                  </li>
                  <li>
                    Total <span>${this.handleTotalPrice()}</span>
                  </li>
                </ul>
                <a className="btn btn-default update" href="#a">
                  Update
                </a>
                <a className="btn btn-default check_out" href="#a">
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CartAction;
