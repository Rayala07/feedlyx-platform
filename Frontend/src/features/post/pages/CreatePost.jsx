import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/createpost.scss"
import { usePost } from "../hooks/usePost"

const CreatePost = () => {
  const [caption, setCaption] = useState("")
  const postImageRef = useRef(null)

  const {handleCreatePost} = usePost()

  const navigate = useNavigate()


  const handlePostSubmit = async(e) => {
    e.preventDefault()

    try {
      const imageFile = postImageRef.current.files[0];
      await handleCreatePost(imageFile, caption)
      navigate("/")
    } catch(err) {
      console.log(err)
    }
  } 

  return (
    <main className="create-post-page">
      <div className="form-container">
        <p id="create-page-header">Share Your Moments</p>
          <form className="upload-form" onSubmit={handlePostSubmit}>
            <label id="post-image-input-field" htmlFor="post-image">Upload image here</label>
            <input ref={postImageRef} type="file" id="post-image" hidden/>
            <input value={caption} onChange={(e) => setCaption(e.target.value)} type="text" placeholder="Caption..." id="post-caption-field" />

            <div>
              <button type="submit" id="post-button">Create Post</button>
            </div>
        </form>
      </div>
    </main>
  )
}

export default CreatePost