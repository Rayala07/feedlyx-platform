import React, { useEffect } from "react";
import "../styles/feed.scss";
import { usePost } from "../hooks/usePost";
import Post from "../components/Post";

const Feed = () => {

  const {feed, handleGetFeed, loading} = usePost()

  useEffect(()=> {
    handleGetFeed()
  },
  []
)

  if(loading || !feed) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }

  console.log(feed)

  return (
    <main className="feed-page">
      <div className="feed-page__overlay" />

      <section className="feed-device">
        <div className="feed-device__frame">

          <div className="feed-list">
            {/* Post */}
            {feed.map((post, idx) => {
              return <Post idx={idx} username={post.user.username} image={post.img_url}/>
            })}
          </div>

          <nav className="feed-nav">
            <button className="feed-nav__btn">Home</button>
            <button className="feed-nav__btn feed-nav__btn--add">+</button>
            <button className="feed-nav__btn">Profile</button>
          </nav>

        </div>
      </section>
    </main>
  );
};

export default Feed;