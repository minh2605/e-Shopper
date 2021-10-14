import axios from "axios";

export default axios.create({
  baseURL: `http://192.168.30.105:8080/laravel/public`,
});
