import React from 'react'

const NotFound = () => {
   return (
      <div className="error-bg">


         <div className="error-container mt-5">

            <div className="container">

               <div className="row justify-content-center">
                  <div className="col-12">
                     <h1>404</h1>
                  </div>
                  <div className="col-xl-6 col-sm-10">
                     <h2 className="fw-semibold mb-4">
                        We're sorry but it looks like the page doesn't exist anymore.
                     </h2>
                     <a href="#" className="btn btn-dark rounded-5 px-5 py-3 fs-5">Go to Dashboard</a>
                  </div>
               </div>

            </div>

         </div>
      </div>
   )
}

export default NotFound