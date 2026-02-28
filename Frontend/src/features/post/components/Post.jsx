import React from 'react'
import {RiBookmarkLine, RiHeartLine} from "@remixicon/react"

const Post = ({profile ,username, idx, image, caption}) => {
  return (
    <article className="feed-card" id={idx}>
        <div className="feed-card__header">
            <div className="feed-card__avatar">
                <img className='profile-image' src={profile} alt="" />
            </div>
            <span className="feed-card__username">{username}</span>
        </div>

        <div className="feed-card__image">
            <img className='img-container' src={image} alt="" />
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
            <span className="feed-card__caption-user">{username}</span>
            <span className="feed-card__caption-text">
            {caption}
            </span>
        </div>
    </article>
  )
}

export default Post
