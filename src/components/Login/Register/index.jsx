import React, { useEffect, useState } from "react";
import "./Register.scss";
import FormErrors from "../../FormErrors";
import API from "../../Api";

function isEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function Register() {
  const [register, setRegister] = useState({
    level: 0,
  });
  const [file, setFile] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [validForm, setValidForm] = useState(false);

  useEffect(() => {
    function postRegister() {
      if (validForm) {
        // const api = "http://192.168.30.105:8080/laravel/public/api";
        const userRegister = register;
        console.log("posting");
        console.log(userRegister);
        API.post(`/register`, userRegister)
          .then((res) => {
            console.log(res);
            if (res.data.message === "success") {
              alert("Register successfully");
            } else {
              // setFormErrors(res.data);
              console.log(res.data.errors);
              //setFormError({...res.data.errors})
            }
          })
          .catch((error) => console.log(error));
      } else return;
    }
    postRegister();
    //eslint-disable-next-line
  }, [validForm]);

  function handleInput(e) {
    const newRegister = { ...register, [e.target.name]: e.target.value };
    setRegister(newRegister);
  }

  function handleAvatar(e) {
    let reader = new FileReader();
    const file = e.target.files;
    console.log(file);
    reader.onload = (e) => {
      setRegister({
        ...register,
        avatar: e.target.result,
      });
      setFile({
        file: file[0],
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  function handleValidateAvatar(avatar) {
    const fileExtensions = ["png", "jpeg", "jpg"];

    if (Object.keys(avatar).length === 0) {
      return "Image must be uploaded";
    } else {
      const { name, size } = avatar.file;
      const extension = name.split(".")[1];

      if (fileExtensions.indexOf(extension) === -1) {
        return "File must be an image";
      }
      if (size > 1024 ** 2) {
        return "Image must be smaller than 1MB";
      }
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const { name, email, password, phone, address } = register;
    let newFormErrors = {};
    let flag = true;

    //Validate Input
    if (!name || name.length < 1) {
      flag = false;
      newFormErrors = {
        ...newFormErrors,
        name: "Name must not be empty",
      };
    }

    if (!isEmail(email)) {
      flag = false;
      newFormErrors = {
        ...newFormErrors,
        email: "Email is not valid",
      };
    }

    if (!email || email.trim().length === 0) {
      flag = false;
      newFormErrors = {
        ...newFormErrors,
        email: "Email must not be empty",
      };
    }
    if (!password || password.trim().length === 0) {
      flag = false;
      newFormErrors = {
        ...newFormErrors,
        password: "Password must not be empty",
      };
    }
    if (!phone || phone.trim().length === 0) {
      flag = false;
      newFormErrors = {
        ...newFormErrors,
        phone: "Phone must not be empty",
      };
    }
    if (!address || address.trim().length === 0) {
      flag = false;
      newFormErrors = {
        ...newFormErrors,
        address: "Address must not be empty",
      };
    }

    //Validate Avatar
    const avatarError = handleValidateAvatar(file);
    if (avatarError) {
      newFormErrors = {
        ...newFormErrors,
        avatar: avatarError,
      };
      flag = false;
    }

    if (!flag) {
      setFormErrors(newFormErrors);
    } else {
      setFormErrors({});
      setValidForm(true);
    }
  }

  return (
    <div className="register col-sm-5">
      <FormErrors errors={formErrors} />
      <form
        className="register-form"
        encType="multipart/form-data"
        onSubmit={handleFormSubmit}
      >
        <h4 className="form__title">Register to your account</h4>
        <input
          onChange={handleInput}
          type="text"
          className="form__ip ip__name"
          name="name"
          placeholder="Name"
        />
        <input
          onChange={handleInput}
          type="text"
          className="form__ip ip__email"
          name="email"
          placeholder="Email address"
        />
        <input
          onChange={handleInput}
          type="password"
          className="form__ip ip__pass"
          name="password"
          placeholder="Password"
        />
        <input
          onChange={handleInput}
          type="text"
          className="form__ip ip__phone"
          name="phone"
          placeholder="Phone"
        />
        <input
          onChange={handleInput}
          type="text"
          className="form__ip ip__address"
          name="address"
          placeholder="Address"
        />
        <input
          onChange={handleAvatar}
          type="file"
          className="form__ip ip__avatar"
          name="avatar"
        />
        <input
          onChange={handleInput}
          type="text"
          className="form__ip ip__level"
          name="level"
          value="0"
          placeholder="Level"
        />

        <button className="form__btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
