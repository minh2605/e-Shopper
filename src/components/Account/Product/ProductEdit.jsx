import React, { PureComponent } from "react";

import API from "../../Api";
import API_LINK from "../../Api/ApiLink";
import FormErrors from "../../FormErrors";

const getBrandAndCategory = async () => {
  const url = "/api/category-brand";
  const res = await API.get(url);
  const brands = res.data.brand;
  const categories = res.data.category;
  return {
    brands: brands,
    categories: categories,
  };
};

const getProductById = async (id) => {
  const url = `/api/user/product/${id}`;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await API.get(url, config);
  if (res.data.response === "success") {
    return res.data.data;
  } else {
    return;
  }
};

class ProductEdit extends PureComponent {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("token");
    this.api = `${API_LINK}/upload/user/product`;
    this.state = {
      brands: [],
      categories: [],
      avatarCheckbox: [],
      formErrors: {},
      uploadImage: [],
      currProduct: {
        name: "",
        price: "",
        status: "",
        sale: "",
        company: "",
        id_brand: "",
        id_category: "",
        detail: "",
      },
    };
  }

  async componentDidMount() {
    const { id: productId } = this.props.match.params;
    const productInfo = await getProductById(productId);
    const brandAndCategory = await getBrandAndCategory();
    const { brands, categories } = brandAndCategory;

    this.setState({
      brands: brands,
      categories: categories,
      uploadImage: "",
      currProduct: {
        id: productInfo.id,
        id_user: productInfo.id_user,
        name: productInfo.name,
        price: productInfo.price,
        status: productInfo.status,
        sale: productInfo.sale,
        company: productInfo.company_profile,
        id_brand: productInfo.id_brand,
        id_category: productInfo.id_category,
        detail: productInfo.detail,
        image: productInfo.image,
      },
    });
  }

  handleUploadImages = (e) => {
    const images = e.target.files;
    console.log(images);
    if (images.length > 3) {
      alert("You must upload maximum 3 images. Try again!");
      return;
    }
    this.setState({
      uploadImage: [...images],
    });
  };

  handleInputChange = (e) => {
    const productEdit = this.state.currProduct;
    this.setState({
      currProduct: {
        ...productEdit,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleCheckBoxAvatar = (imgName) => {
    console.log(imgName);
    this.setState(function (prevState) {
      const isChecked = prevState.avatarCheckbox.includes(imgName);

      //If checked -> remove it from array -> return
      if (isChecked) {
        return {
          avatarCheckbox: prevState.avatarCheckbox.filter(
            (img) => img !== imgName
          ),
        };
      }
      //If unchecked -> add it to array
      else {
        return { avatarCheckbox: [...prevState.avatarCheckbox, imgName] };
      }
    });
  };

  handleValidateImagesUpload = (listImage) => {
    let response = "";
    const fileExtensions = ["png", "jpeg", "jpg"];
    if (!listImage || listImage.length === 0) {
      return "Images must be uploaded";
    }

    //Loop and check each image
    listImage.forEach((image) => {
      const { name, size } = image;
      const extension = name.split(".")[1];
      if (size > 1024 ** 2) {
        response = "Image must be smaller than 1MB";
        return;
      }
      if (fileExtensions.indexOf(extension) === -1) {
        response = "Files must be images";
        return;
      }
    });
    return response;
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, price, sale, status, detail, company, image } =
      this.state.currProduct;
    const newFormErrors = {};
    let flag = true;

    //Check select options
    // if (status ) {
    //   newFormErrors.status = "Status must not be empty";
    //   flag = false;
    // }

    //Check inputs
    if (!name || name.trim().length === 0) {
      newFormErrors.name = "Name must not be empty";
      flag = false;
    }

    if (!price || price.toString().trim().length === 0) {
      newFormErrors.price = "Price must not be empty";
      flag = false;
    } else {
      if (Number.isNaN(parseInt(price))) {
        newFormErrors.price = "Price must be a number";
        flag = false;
      }
    }

    if (!company || company.trim().length === 0) {
      newFormErrors.company = "Company must not be empty";
      flag = false;
    }
    if (!detail || detail.trim().length === 0) {
      newFormErrors.detail = "Detail must not be empty";
      flag = false;
    }

    //Check status vs sale
    if (parseInt(status) === 0) {
      if (!sale || sale.toString().trim().length === 0) {
        newFormErrors.sale = "Sale percent must not be empty";
        flag = false;
      }
    }
    if (parseInt(status) === 1) {
      delete newFormErrors.sale;
      this.setState((prevState) => ({
        currProduct: {
          ...prevState.currProduct,
          sale: "",
        },
      }));
    }

    //Check images
    const imgError = this.handleValidateImagesUpload(this.state.uploadImage);
    if (imgError) {
      newFormErrors.images = imgError;
      flag = false;
    }

    //Check remain image
    const uploadImgCount = this.state.uploadImage.length; //new img recently uploaded
    const deleteImgCount = this.state.avatarCheckbox.length; //Old img selected
    const totalImgCount = image.length + uploadImgCount; // new + old img
    const remainImgCount = totalImgCount - deleteImgCount; //remain img after check or uncheck
    if (remainImgCount > 3) {
      newFormErrors.totalImage = "Maximum images for a product must be 3";
      flag = false;
    }

    if (!flag) {
      this.setState({
        formErrors: newFormErrors,
      });
    } else {
      this.setState({
        formErrors: {},
      });
      this.postUpdateProduct(this.state.currProduct);
    }
  };
  postUpdateProduct = (productUpdate) => {
    const {
      id,
      name,
      price,
      detail,
      company,
      sale,
      id_brand,
      id_category,
      status,
    } = productUpdate;
    const files = this.state.uploadImage;
    const avatarCheckbox = this.state.avatarCheckbox;
    const token = localStorage.getItem("token");
    const url = `/api/user/edit-product/${id}`;
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    const formData = new FormData();
    formData.append("category", id_category);
    formData.append("brand", id_brand);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("status", status);
    formData.append("sale", sale ? sale : "");
    formData.append("company", company);
    formData.append("detail", detail);
    files.forEach((file) => {
      formData.append("file[]", file);
    });
    avatarCheckbox.forEach((ava) => {
      formData.append("avatarCheckBox[]", ava);
    });

    API.post(url, formData, config)
      .then((res) => {
        if (res.data.response === "success") {
          alert("Update successfully");
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      id_user,
      name,
      price,
      status,
      sale,
      image,
      company,
      id_brand,
      id_category,
      detail,
    } = this.state.currProduct;
    console.log("rerender");
    return (
      <div className="product-section col-sm-9">
        <div className="product__title">Update Product</div>
        <FormErrors errors={this.state.formErrors} />
        <form className="product__form" onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            placeholder="Name"
            className="form__ip ip_name"
          />
          <input
            type="text"
            value={price}
            name="price"
            onChange={this.handleInputChange}
            placeholder="Price"
            className="form__ip ip_price"
          />
          <select
            name="id_category"
            className="form__ip ip_category"
            onChange={this.handleInputChange}
          >
            {this.state.categories.map((category) => {
              if (category.id === id_category) {
                return (
                  <option key={category.category} value="" hidden>
                    {category.category}
                  </option>
                );
              } else return null;
            })}
            {this.state.categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.category}
              </option>
            ))}
          </select>
          <select
            name="id_brand"
            className="form__ip ip_brand"
            onChange={this.handleInputChange}
          >
            {this.state.brands.map((brand) => {
              if (brand.id === id_brand) {
                return (
                  <option key={brand.brand} value="" hidden>
                    {brand.brand}
                  </option>
                );
              } else return null;
            })}
            {this.state.brands.map((brand) => (
              <option value={brand.id} key={brand.id}>
                {brand.brand}
              </option>
            ))}
          </select>
          <select
            name="status"
            className="form__ip ip_status"
            onChange={this.handleInputChange}
          >
            <option value="" hidden>
              {parseInt(status) === 1 ? "New" : "Sale"}
            </option>
            <option value="1">New</option>
            <option value="0">Sale</option>
          </select>
          <input
            type={parseInt(status) === 0 ? "text" : "hidden"}
            name="sale"
            value={sale ? sale : ""}
            onChange={this.handleInputChange}
            placeholder="0 %"
            className="form__ip ip_sale"
          />
          <input
            type="text"
            value={company}
            name="company"
            onChange={this.handleInputChange}
            placeholder="Company"
            className="form__ip ip_company"
          />
          <input
            type="file"
            multiple
            name="image"
            onChange={this.handleUploadImages}
            placeholder="Name"
            className="form__ip ip_img"
          />
          <div className="form__images">
            <span>Old images</span>
            {image &&
              image.map((img, index) => (
                <div key={index} className="product-img">
                  <img
                    data-name={img}
                    src={`${this.api}/${id_user}/${img}`}
                    alt={`img${index}`}
                  />
                  <input
                    type="checkbox"
                    checked={this.state.avatarCheckbox.includes(img)}
                    onChange={() => this.handleCheckBoxAvatar(img)}
                  />
                  Delete
                </div>
              ))}
          </div>
          <input
            type="text"
            name="detail"
            value={detail}
            onChange={this.handleInputChange}
            placeholder="Detail"
            className="form__ip ip_detail"
          />
          <button type="submit" className="form__btn">
            Update product
          </button>
        </form>
      </div>
    );
  }
}

export default ProductEdit;
