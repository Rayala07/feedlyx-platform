import axios from "axios";

const user_api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function getUserDetails() {
  const response = await user_api.get("/get-me");

  return response.data;
}
