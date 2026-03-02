import {RiBookmarkLine, RiHeartFill, RiHeartLine} from "@remixicon/react"
import { usePost } from "../hooks/usePost";

const Post = ({post}) => {

    const {handleToggleLike} = usePost()

  return (
    <article className="feed-card">
        <div className="feed-card__header">
            <div className="feed-card__avatar">
                <img className='profile-image' src={post.user.profileImage} alt="" />
            </div>
            <span className="feed-card__username">{post.user.username}</span>
        </div>

        <div className="feed-card__image">
            <img className='img-container' src={post.img_url} alt="" />
        </div>

        {/* Actions */}
        <div className="feed-card__actions">
            <button onClick={() => (handleToggleLike(post._id))} className="feed-card__icon feed-card__icon--like">
             {post.isLiked ? (<RiHeartFill />) : (<RiHeartLine />)}
            </button>

            <button className="feed-card__icon feed-card__icon--save">
            <RiBookmarkLine />
            </button>
        </div>

        {/* Caption */}
        <div className="feed-card__caption">
            <span className="feed-card__caption-user">{post.username}</span>
            <span className="feed-card__caption-text">
            {post.caption}
            </span>
        </div>
    </article>
  )
}

export default Post
