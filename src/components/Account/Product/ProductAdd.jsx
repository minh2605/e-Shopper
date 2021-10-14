import React, { PureComponent } from "react";

import API from "../../Api";
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

class ProductAdd extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: {},
      brands: [],
      categories: [],
      productAdd: {
        sale: "",
      },
    };
  }

  async componentDidMount() {
    try {
      const brandAndCategory = await getBrandAndCategory();
      const { brands, categories } = brandAndCategory;
      this.setState({
        brands: brands,
        categories: categories,
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleInputChange = (e) => {
    const productAdd = this.state.productAdd;
    this.setState({
      productAdd: {
        ...productAdd,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleProductImages = (e) => {
    const files = e.target.files;
    const productAdd = this.state.productAdd;
    if (files.length > 3) {
      alert("You must upload maximum 3 images. Try again!");
      return;
    }
    this.setState({
      productAdd: {
        ...productAdd,
        file: [...files],
      },
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
    const {
      name,
      price,
      sale,
      status,
      brand,
      category,
      detail,
      company,
      file,
    } = this.state.productAdd;
    const newFormErrors = {};
    let flag = true;

    //Check select options
    if (!status) {
      newFormErrors.status = "Status must not be empty";
      flag = false;
    }
    if (!brand) {
      newFormErrors.brand = "Brand must not be empty";
      flag = false;
    }
    if (!category) {
      newFormErrors.category = "Category must not be empty";
      flag = false;
    }

    //Check inputs
    if (!name || name.trim().length === 0) {
      newFormErrors.name = "Name must not be empty";
      flag = false;
    }

    if (!price || price.trim().length === 0) {
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
    if (status === "0") {
      if (!sale || sale.trim().length === 0) {
        newFormErrors.sale = "Sale percent must not be empty";
        flag = false;
      }
    }
    if (status === "1") {
      delete newFormErrors.sale;
      this.setState((prevState) => ({
        productAdd: {
          ...prevState.productAdd,
          sale: "",
        },
      }));
    }

    //Check images
    const imgError = this.handleValidateImagesUpload(file);
    if (imgError) {
      newFormErrors.images = imgError;
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
      this.postNewProduct(this.state.productAdd);
    }
  };

  postNewProduct = (productInfo) => {
    const {
      name,
      price,
      detail,
      company,
      sale,
      brand,
      category,
      status,
      file,
    } = productInfo;
    const token = localStorage.getItem("token");
    const url = "/api/user/add-product";
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    const formData = new FormData();
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("status", status);
    formData.append("sale", sale ? sale : "");
    formData.append("company", company);
    formData.append("detail", detail);
    // formData.append("file[]", file);
    file.forEach((item) => {
      formData.append("file[]", item);
    });

    console.log(productInfo);
    API.post(url, formData, config)
      .then((res) => {
        console.log(res);
        alert("Add new product successfully");
        this.props.history.push("/account/product/list");
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { sale } = this.state.productAdd;
    return (
      <div className="product-section col-sm-9">
        <div className="product__title">Create Product</div>
        <FormErrors errors={this.state.formErrors} />
        <form className="product__form" onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="name"
            //value={name}
            onChange={this.handleInputChange}
            placeholder="Name"
            className="form__ip ip_name"
          />
          <input
            type="text"
            name="price"
            onChange={this.handleInputChange}
            placeholder="Price"
            className="form__ip ip_price"
          />
          <select
            name="category"
            className="form__ip ip_category"
            onChange={this.handleInputChange}
          >
            <option value="" hidden>
              Category
            </option>
            {this.state.categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.category}
              </option>
            ))}
          </select>
          <select
            name="brand"
            className="form__ip ip_brand"
            onChange={this.handleInputChange}
          >
            <option value="" hidden>
              Brand
            </option>
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
              Status
            </option>
            <option value="1">New</option>
            <option value="0">Sale</option>
          </select>
          <input
            type={this.state.productAdd.status === "0" ? "text" : "hidden"}
            value={sale}
            name="sale"
            onChange={this.handleInputChange}
            placeholder="0 %"
            className="form__ip ip_sale"
          />
          <input
            type="text"
            name="company"
            // value={company}
            onChange={this.handleInputChange}
            placeholder="Company"
            className="form__ip ip_company"
          />
          <input
            type="file"
            multiple
            name="image"
            onChange={this.handleProductImages}
            placeholder="Name"
            className="form__ip ip_img"
          />
          <input
            type="text"
            name="detail"
            //value={detail}
            onChange={this.handleInputChange}
            placeholder="Detail"
            className="form__ip ip_detail"
          />
          <button type="submit" className="form__btn">
            Add product
          </button>
        </form>
      </div>
    );
  }
}

export default ProductAdd;
