import { instance, protectedInstance } from "./instance";

const userServices = {
  register: (username, email, password) => {
    return instance.post("/users/register", { username, email, password });
  },

  login: (email, password) => {
   
    return instance.post("/users/login", { email, password }, 
        { withCredentials: true });
  },

  getProfile: () => protectedInstance.get("/users/profile"),
  updateProfile: (payload) => protectedInstance.put("/users/profile", payload),
  logout: () => protectedInstance.get("/users/logout"),
  deleteProfile: () => protectedInstance.delete("/users/profile"),
};

export default userServices;

