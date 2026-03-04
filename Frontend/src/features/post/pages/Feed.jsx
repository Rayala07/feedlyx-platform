import React, { useEffect } from "react";
import "../styles/feed.scss";
import { usePost } from "../hooks/usePost";
import Post from "../components/Post";
import {useNavigate} from "react-router-dom"
import Loader from "../../shared/components/Loader";

const Feed = () => {

  const {feed, handleGetFeed, loading} = usePost()

  const navigate = useNavigate();

  useEffect(()=> {
    handleGetFeed()
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []
)

  if(loading) {
    return (
      <Loader />
    )
  }

  if(!feed) {
    return (
      <main>
        <h1>Error Loading Feed :(</h1>
      </main>
    )
  }

  const handleCreatePostClick = () => {
    navigate("/create-post")
  }

  const handleProfileClick = () => {
    navigate("/user-profile")
  }

  return (
    <main className="feed-page">
      <div className="feed-page__overlay" />

      <section className="feed-device">
        <div className="feed-device__frame">

          <div className="feed-list">
            {/* Post */}
            {feed.map((post) => {
              return <Post key={post._id} post={post}/>
            })}
          </div>

          <nav className="feed-nav">
            <button className="feed-nav__btn">Home</button>
            <button onClick={handleCreatePostClick} className="feed-nav__btn feed-nav__btn--add">+</button>
            <button onClick={handleProfileClick} className="feed-nav__btn">Profile</button>
          </nav>

        </div>
      </section>
    </main>
  );
};

export default Feed;