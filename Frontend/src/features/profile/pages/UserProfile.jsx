import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/userprofile.scss"
import { useProfile } from '../hooks/useProfile'
import { useAuth } from '../../auth/hooks/useAuth'
import Loader from '../../shared/components/Loader'
import { RiArrowLeftSLine } from '@remixicon/react'

const UserProfile = () => {

  const {loading, handleGetUser, user, handleGetPosts, posts} = useProfile()
  const {handleLogout} = useAuth()

  const navigate = useNavigate();

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

  const handleRedirect = () => {
    navigate("/")
  }

  const handleUserLogout = async() => {
    handleLogout()
    navigate("/login")
  }

  return (
    <main className='profile-page'>
      <section className='profile-container'>
      <div className='profile-header'>
        <div className='profile-header-left'>
        <RiArrowLeftSLine onClick={handleRedirect} id='home-btn' />
        <p id='logout-btn' onClick={handleUserLogout}>Logout</p>
        </div>
        <p>Feedlyx</p>
      </div>

      <div className='profile-details'>
        <div className='profile-and-username'>
          <img id='user-image' src={user.profileImage} alt="user-profile" />
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
              <div key={post._id} className='post-container'>
                <img src={post.img_url} alt="" />
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
