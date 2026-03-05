import React, { useEffect } from 'react'
import "../styles/userprofile.scss"
import { useProfile } from '../hooks/useProfile'
import Loader from '../../shared/components/Loader'

const UserProfile = () => {

  const {loading, handleGetUser, user, handleGetPosts, posts} = useProfile()

  useEffect(() => {
    handleGetUser()
    handleGetPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(loading) {
    return <Loader />
  }

  if(!user) {
    return (
      <main>Error Loading Profile</main>
    )
  }

  if(!posts) {
    return (
      <main>Error Loading Profile</main>
    )
  }

  return (
    <main className='profile-page'>
      <section className='profile-container'>
      <div className='profile-header'>
        <p>Feedlyx</p>
      </div>

      <div className='profile-details'>
        <div className='profile-and-username'>
          <img id='user-image' src={user.profileImage} alt="" />
          <p id='user-name'>{user.username}</p>
        </div>
        <div id='user-bio'>
          {user.bio}
        </div>
      </div>

      <section className='posts-section'>
        <div className='posts-section-header'>
          <p>Posts</p>
        </div>
        <div className='user-posts'>
            {posts.length > 0 ? posts.map((post) => {
            return (
              <div key={post._id}>
                {post.caption}
              </div>
            )
            }) : <p id='no-posts-meesage'>
              Create your first post
            </p>}
        </div>
      </section>
      </section>
    </main>
  )
}

export default UserProfile
