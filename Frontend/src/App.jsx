import { RouterProvider } from "react-router-dom"
import { routes } from "./routes"
import "./styles.scss"

const App = () => {
  return (
    <RouterProvider router={routes} />
  )
}

export default App
