import axios from "axios";

const post_api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
});

export async function fetchPosts() {
  const response = await post_api.get("/feed");

  return response.data;
}

export async function likePost(postId) {
  const response = await post_api.post(`/like/${postId}`);

  return response.data;
}

export async function unlikePost(postId) {
  const response = await post_api.post(`/unlike/${postId}`);

  return response.data;
}

export async function createPost() {
  const response = await post_api.post("/create")
}
