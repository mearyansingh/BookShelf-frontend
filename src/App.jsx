import { Outlet } from "react-router-dom"
// import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import { AuthProvider } from "./Context/AuthContext"

function App() {

  return (
    <>
      <AuthProvider>
        <Header />
        <main className="min-vh-100" style={{ marginTop: "68px" }}>
          <Outlet />
        </main>
        <Footer />
      </AuthProvider>

    </>
  )
}

export default App
