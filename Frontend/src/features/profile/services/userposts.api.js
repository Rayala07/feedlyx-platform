import axios from "axios";

const post_api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
});

export async function getUserPosts() {
  const response = await post_api.get("/profile");

  return response.data;
}
