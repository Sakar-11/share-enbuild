require("dotenv").config();
const SecureStorage = require("secure-web-storage");
var CryptoJS = require("crypto-js");

module.exports = global.config = {
  backendURL: "http://localhost:5000/api",
  // backendURL: "http://137.184.13.236:5000/api",
  // backendURL: "https://en2.herokuapp.com/api",
  // backendURL: "https://enbuild.in/api/api",
  rolesWithStoreDrawerVisible: ["store_manager", "purchase_manager"],
  secureStorage: new SecureStorage(localStorage, {
    hash: function hash(key) {
      key = CryptoJS.SHA256(key, process.env.REACT_APP_SECRET_KEY);

      return key.toString();
    },
    encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, process.env.REACT_APP_SECRET_KEY);

      data = data.toString();

      return data;
    },
    decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, process.env.REACT_APP_SECRET_KEY);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
    },
  }),
};
