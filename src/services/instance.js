// define the base url for the API
import axios from "axios";

const baseURL = "https://todo-back-frb9.onrender.com";

const instance = axios.create({
  baseURL,
  timeout: 7000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const protectedInstance = axios.create({
  baseURL,
  timeout: 7000,
  headers: { "Content-Type": "application/json" },
});

protectedInstance.defaults.withCredentials = true;
instance.defaults.withCredentials = true;

export { instance, protectedInstance };
