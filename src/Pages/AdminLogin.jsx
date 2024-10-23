import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { getBaseUrl } from '../Helpers';

const AdminLogin = () => {
   const [message, setMessage] = useState()
   const navigate = useNavigate()
   const { register, handleSubmit, watch, formState: { errors } } = useForm();

   const onSubmit = async (data) => {
      console.log(data)
      try {
         const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
            headers: { 'Content-Type': 'application/json' }
         })
         const auth = await response.data
         console.log(auth, "auth")
         if (auth.token) {
            localStorage.setItem('token', auth.token)
            setTimeout(() => {
               localStorage.removeItem('token')
               alert('Token has been expired! Please login again.');
               navigate("/")
            }, 3600 * 1000)
         }
         alert("Admin login successful!")
         navigate("/dashboard")
      } catch (error) {
         setMessage("Please provide a valid email and password!")
         console.log(error)
      }
   };

   return (
      <section className="bg-light p-3 p-md-4 p-xl-5">
         <Container>
            <Row className="justify-content-center">
               <Col className="col-12 col-xxl-11">
                  <Card className="border-light-subtle shadow-sm">
                     <div className="row g-0">
                        <div className="col-12 col-md-6">
                           <Image fluid className="rounded-start w-100 h-100 object-fit-cover" loading="lazy" src="https://cdn.pixabay.com/photo/2023/11/18/16/04/login-8396701_640.jpg" alt="Welcome back you've been missed!" />
                        </div>
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                           <div className="col-12 col-lg-11 col-xl-10">
                              <div className="card-body p-3 p-md-4 p-xl-5">
                                 <div className="row">
                                    <div className="col-12">
                                       <div className="mb-5">
                                          <div className="text-center mb-4">
                                             <Link to="/admin" className='text-decoration-none fw-bold'>
                                                <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path> </svg>
                                                <span className='ms-1 fs-5'>BookShelf</span>
                                             </Link>
                                          </div>
                                          <h4 className="text-center">Welcome to admin dashboard login!</h4>
                                       </div>
                                    </div>
                                 </div>
                                 <Form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row gy-3 overflow-hidden">
                                       <div className="col-12">
                                          <div className="form-floating mb-3">
                                             <input
                                                type="text"
                                                className="form-control"
                                                name="username"
                                                id="username"
                                                placeholder="Enter username"
                                                {...register("username", { required: true })}
                                             />
                                             <label htmlFor="username" className="form-label">Username</label>
                                          </div>
                                       </div>
                                       <div className="col-12">
                                          <div className="form-floating mb-3">
                                             <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                {...register("password", { required: true })}
                                             />
                                             <label htmlFor="password" className="form-label">Password</label>
                                          </div>
                                       </div>
                                       <div className="col-12">
                                          <div className="d-grid">
                                             <Button size="lg" variant='dark' type="submit">Log in now</Button>
                                          </div>
                                       </div>
                                    </div>
                                 </Form>
                              </div>
                           </div>
                        </div>
                     </div>
                  </Card>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default AdminLogin