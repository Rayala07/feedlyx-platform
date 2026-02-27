import React from 'react'
import {RiBookmarkLine, RiHeartLine} from "@remixicon/react"

const Post = ({username, idx, image}) => {
  return (
    <article className="feed-card" id={idx}>
        <div className="feed-card__header">
            <div className="feed-card__avatar" />
            <span className="feed-card__username">{username}</span>
        </div>

        <div className="feed-card__image">
            <img src={image} alt="" />
        </div>

        {/* Actions */}
        <div className="feed-card__actions">
            <button className="feed-card__icon feed-card__icon--like">
            <RiHeartLine />
            </button>

            <button className="feed-card__icon feed-card__icon--save">
            <RiBookmarkLine />
            </button>
        </div>

        {/* Caption */}
        <div className="feed-card__caption">
            <span className="feed-card__caption-user">username</span>
            <span className="feed-card__caption-text">
            This is a long caption example that should wrap properly inside the
            boundary without breaking the layout even if the text is extremely long.
            </span>
        </div>
    </article>
  )
}

export default Post
