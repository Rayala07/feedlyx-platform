import { useContext } from "react";
import { ProfileContext } from "../profile.context";
import { getUserDetails } from "../services/userdetails.api";
import { getUserPosts } from "../services/userPosts.api";

export const useProfile = () => {
  const context = useContext(ProfileContext);

  const { loading, setLoading, user, setUser, posts, setPosts } = context;

  const handleGetUser = async () => {
    try {
      setLoading(true);
      const data = await getUserDetails();
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetPosts = async () => {
    try {
      setLoading(true);
      const data = await getUserPosts();
      setPosts(data.posts);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return { loading, handleGetUser, user, handleGetPosts, posts };
};
