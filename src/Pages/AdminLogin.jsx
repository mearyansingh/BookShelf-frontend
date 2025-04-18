import React, { useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Image, InputGroup, Row, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from 'axios';
import { getBaseUrl } from '../Helpers';

const AdminLogin = () => {
	//Initial state
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate()

	//REACT-HOOK-FORM
	const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

	//Function to handle the admin login
	const onSubmit = async (data) => {
		try {
			const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
				headers: { 'Content-Type': 'application/json' }
			})
			const auth = await response?.data
			if (auth.token) {
				localStorage.setItem('token', auth.token)
				// Set token expiration
				setTimeout(() => {
					localStorage.removeItem('token')
					toast.error('Token has been expired! Please login again.');
					navigate("/")
				}, 3600 * 1000)
			}
			toast.success("Admin login successful!")
			navigate("/dashboard")
		} catch (error) {
			console.log("Error while admin login", error)
			toast.error(error.response?.data?.message || "Login failed. Please check your credentials.")
		}
	};

	return (
		<section className="login-page bg-light min-vh-100 d-flex align-items-center py-5">
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} lg={10} xl={9}>
						<Alert variant='warning' dismissible>
							<p className='mb-1'><span className='fw-semibold pe-2'>Username:</span> admin</p>
							<p className='mb-1'><span className='fw-semibold pe-2'>Password:</span>1234567</p>
							<small><i className='bi bi-info-circle pe-1' />For testing purposes only</small>
						</Alert>
						<Card className="border-0 shadow overflow-hidden">
							<Row className="g-0">
								{/* Login image - hidden on smaller screens */}
								<Col md={5} className="d-none d-md-block position-relative login-image-container">
									<div
										className="login-image h-100"
										style={{
											backgroundImage: 'url(https://cdn.pixabay.com/photo/2023/11/18/16/04/login-8396701_640.jpg)',
											backgroundSize: 'cover',
											backgroundPosition: 'center'
										}}
									>
										<div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)' }}>
											<h2 className="text-white mb-0">Admin Portal</h2>
											<p className="text-white-50 mb-0">Manage your book inventory</p>
										</div>
									</div>
								</Col>

								{/* Login form */}
								<Col md={7} className="bg-white">
									<div className="login-wrapper p-4 p-lg-5">
										<div className="text-center mb-4">
											<Link to="/" className="d-inline-block text-decoration-none mb-4">
												<div className="d-flex align-items-center justify-content-center">
													<svg id="logo-35" width="40" height="32" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path>
														<path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path>
													</svg>
													<span className="ms-2 fw-bold fs-4 text-primary">BookShelf</span>
												</div>
											</Link>

											<h3 className="mb-1 fw-bold">Welcome Back</h3>
											<p className="text-muted">Log in to access your admin dashboard</p>
										</div>

										<Form onSubmit={handleSubmit(onSubmit)}>
											<Form.Group className="mb-3">
												<Form.Label className="fw-medium">Username</Form.Label>
												<InputGroup>
													<InputGroup.Text className={`bg-light border-end-0 ${errors.username ? 'border-danger' : ''}`}>
														<i className="bi bi-person text-muted"></i>
													</InputGroup.Text>
													<Form.Control
														type="text"
														placeholder="Enter your username"
														className={`border-start-0 ${errors.username ? 'is-invalid' : ''}`}
														{...register("username", {
															required: "Username is required"
														})}
													/>
												</InputGroup>
												{errors.username && (
													<Form.Text className="text-danger">
														{errors.username.message}
													</Form.Text>
												)}
											</Form.Group>

											<Form.Group className="mb-4">
												<div className="d-flex justify-content-between align-items-center mb-1">
													<Form.Label className="fw-medium mb-0">Password</Form.Label>
													<Link to="#" className="text-decoration-none small text-primary">Forgot password?</Link>
												</div>
												<InputGroup>
													<InputGroup.Text className={`bg-light border-end-0 ${errors.password ? 'border-danger' : ''}`}>
														<i className="bi bi-lock text-muted"></i>
													</InputGroup.Text>
													<Form.Control
														type={showPassword ? "text" : "password"}
														placeholder="Enter your password"
														className={`border-start-0 border-end-0 ${errors.password ? 'is-invalid' : ''}`}
														{...register("password", {
															required: "Password is required"
														})}
													/>
													<InputGroup.Text
														className={`bg-light border-start-0 cursor-pointer ${errors.password ? 'border-danger' : ''}`}
														onClick={() => setShowPassword(!showPassword)}
														style={{ cursor: 'pointer' }}
													>
														<i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
													</InputGroup.Text>
												</InputGroup>
												{errors.password && (
													<Form.Text className="text-danger">
														{errors.password.message}
													</Form.Text>
												)}
											</Form.Group>
											<div className="d-grid">
												<Button
													variant="primary"
													size="lg"
													type="submit"
													className="text-white py-2"
													disabled={isSubmitting}
												>
													{isSubmitting ? (
														<>
															<Spinner
																as="span"
																animation="border"
																size="sm"
																role="status"
																aria-hidden="true"
																className="me-2"
															/>
															Logging in...
														</>
													) : (
														<>
															<i className="bi bi-box-arrow-in-right me-2"></i>
															Log In
														</>
													)}
												</Button>
											</div>
										</Form>
										<div className="mt-4 text-center">
											<p className="text-muted small mb-0">
												<i className="bi bi-shield-lock me-1"></i>
												Secure admin access only
											</p>
										</div>
									</div>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default AdminLogin