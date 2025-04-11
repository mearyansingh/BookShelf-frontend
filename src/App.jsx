import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import { AuthProvider } from "./Context/AuthContext"

function App() {

  return (
    <>
      <AuthProvider>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Suspense fallback={<h1>Loading...</h1>}>
              <Outlet />
            </Suspense>
          </main>
          <Footer />
          <ToastContainer />
        </div >
      </AuthProvider>
    </>
  )
}

export default App
