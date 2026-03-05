import { RouterProvider } from "react-router-dom"
import { routes } from "./routes"
import "./styles.scss"
import { AuthProvider } from "./features/auth/auth.context"
import { PostContextProvider } from "./features/post/post.context"
import { ProfileContextProvider } from "./features/profile/profile.context"

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <ProfileContextProvider>
            <RouterProvider router={routes} />
        </ProfileContextProvider>
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App
