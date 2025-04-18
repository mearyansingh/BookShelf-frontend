import { Suspense, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import { AuthProvider } from "./Context/AuthContext"
import Loader from "./Components/Loader";

function App() {
  return (
    <>
      <AuthProvider>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </main>
          <Footer />
        </div >
      </AuthProvider>
    </>
  )
}

export default App
