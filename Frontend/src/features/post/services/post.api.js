import axios from "axios";

const post_api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
});

export async function fetchPosts() {
  const response = await post_api.get("/feed");

  return response.data;
}
