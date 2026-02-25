import axios from "axios";

const auth_api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const register = async (username, email, password) => {
  try {
    const response = await auth_api.post("/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const login = async (username, email, password) => {
  try {
    const response = await auth_api.post("/login", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMe = async () => {
  try {
    const response = await auth_api.get("/get-me");

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
