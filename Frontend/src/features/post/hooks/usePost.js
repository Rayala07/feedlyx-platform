import { fetchPosts } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);

  // eslint-disable-next-line no-unused-vars
  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setFeed(data.posts);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return { loading, post, feed, handleGetFeed };
};
