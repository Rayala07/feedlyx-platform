import {
  fetchPosts,
  likePost,
  unlikePost,
  createPost,
} from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);

  // eslint-disable-next-line no-unused-vars
  const { loading, setLoading, post, setPost, feed, setFeed } = context;
0
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

  const handleToggleLike = async (postId) => {
    if (!feed) return;

    const prevFeed = [...feed];

    const updatedFeed = feed.map((p) =>
      p._id === postId ? { ...p, isLiked: !p.isLiked } : p,
    );

    setFeed(updatedFeed);

    const clickedPost = feed.find((p) => p._id === postId);

    try {
      if (!clickedPost.isLiked) {
        await likePost(postId);
      } else {
        await unlikePost(postId);
      }
    } catch (err) {
      setFeed(prevFeed);
      console.log(err);
    }
  };

  const handleCreatePost = async (imgFile, caption) => {
    try {
      setLoading(true);
      const data = await createPost(imgFile, caption);
      setFeed([data.post, ...feed]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   handleGetFeed();
  // }, []);

  return {
    loading,
    post,
    feed,
    handleGetFeed,
    handleToggleLike,
    handleCreatePost,
  };
};
