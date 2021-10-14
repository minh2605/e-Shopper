import React, { PureComponent } from "react";

import FormErrors from "../../FormErrors";
import API from "../../Api";

class MemberUpdate extends PureComponent {
  constructor(props) {
    super(props);
    this.auth = JSON.parse(localStorage.getItem("auth"));
    const { name, email, phone, address, country } = this.auth;
    this.state = {
      userUpdate: {
        name: name,
        email: email,
        password: "",
        phone: phone,
        address: address,
        country: country,
        avatar: "",
      },
      file: "",
      formErrors: {},
    };
  }

  handleInputChange = (e) => {
    const userUpdate = this.state.userUpdate;
    this.setState({
      userUpdate: {
        ...userUpdate,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleAvatarUpload = (e) => {
    let reader = new FileReader();
    const file = e.target.files;
    const userUpdate = this.state.userUpdate;
    // console.log(file);
    reader.onload = (e) => {
      this.setState({
        userUpdate: {
          ...userUpdate,
          avatar: e.target.result,
        },
        file: file[0],
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  handleValidateAvatar = (avatar) => {
    const fileExtensions = ["png", "jpeg", "jpg"];

    if (!avatar) {
      return "Image must be uploaded";
    } else {
      const { name, size } = avatar;
      const extension = name.split(".")[1];

      if (fileExtensions.indexOf(extension) === -1) {
        return "File must be an image";
      }
      if (size > 1024 ** 2) {
        return "Image must be smaller than 1MB";
      }
    }
  };

  postUserUpdateInfo = (userInfo) => {
    const token = localStorage.getItem("token");
    const { id } = this.auth;
    console.log(userInfo);
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    API.post(`/api/user/update/${id}`, userInfo, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.userUpdate.avatar);
    const { name, address, phone, country } = this.state.userUpdate;
    let flag = true;

    const newFormErrors = {};
    if (!name || name.trim().length === 0) {
      newFormErrors.name = "Name must not be empty";
      flag = false;
    }
    if (!phone || phone.trim().length === 0) {
      newFormErrors.phone = "Phone must not be empty";
      flag = false;
    }
    if (!address || address.trim().length === 0) {
      newFormErrors.address = "Address must not be empty";
      flag = false;
    }
    if (!country || country.trim().length === 0) {
      newFormErrors.country = "Country must not be empty";
      flag = false;
    }

    const avatarErrors = this.handleValidateAvatar(this.state.file);
    if (avatarErrors) {
      newFormErrors.avatar = avatarErrors;
      flag = false;
    }

    if (!flag) {
      this.setState({
        formErrors: newFormErrors,
      });
    } else {
      this.postUserUpdateInfo(this.state.userUpdate);
      this.setState({
        formErrors: {},
      });
      alert("thanh cong");
    }
  };

  render() {
    const { name, email, phone, address, country } = this.state.userUpdate;
    return (
      <div className="account-section col-sm-9">
        <h3 className="account__title">User update</h3>
        <FormErrors errors={this.state.formErrors} />
        <form className="form-update" onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            placeholder="Name"
            className="form__ip ip_name"
          />
          <input
            readOnly
            type="text"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            placeholder="Email"
            className="form__ip ip_mail"
          />
          <input
            type="password"
            name="password"
            onChange={this.handleInputChange}
            placeholder="Password"
            className="form__ip ip_pass"
          />
          <input
            type="text"
            name="address"
            value={address}
            onChange={this.handleInputChange}
            placeholder="Address"
            className="form__ip ip_address"
          />
          <input
            type="text"
            name="country"
            value={country}
            onChange={this.handleInputChange}
            placeholder="Country"
            className="form__ip ip_country"
          />
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={this.handleInputChange}
            placeholder="Phone"
            className="form__ip ip_phone"
          />
          <input
            type="file"
            onChange={this.handleAvatarUpload}
            className="form__ip ip_avatar"
          />
          <button className="form__btn">Update</button>
        </form>
      </div>
    );
  }
}

export default MemberUpdate;
