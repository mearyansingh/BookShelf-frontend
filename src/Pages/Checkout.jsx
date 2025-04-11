import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { useCreateOrderMutation } from '../Store/ordersApi';

const CheckoutPage = () => {
   const [isChecked, setIsChecked] = useState(false)
   const navigate = useNavigate()
   const { currentUser } = useAuth()
   const cartItems = useSelector(state => state.cart.cartItems);
   const [createOrder, { isLoading, error }] = useCreateOrderMutation()
   // Calculate total price and total items
   // const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
   const totalPrice = cartItems.reduce((acc, item) => acc + (item.newPrice * item.quantity), 0).toFixed(2)
   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);  // Calculate total items

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm()


   const onSubmit = async (data) => {
      console.log(data)
      const newOrder = {
         name: data.fullname,
         email: currentUser?.email,
         fullAddress: {
            address: data.address,
            city: data.city,
            country: data.country,
            state: data.state,
            zipcode: data.zipcode

         },
         phone: data.phone,
         productIds: cartItems.map(item => item?._id),
         totalPrice: totalPrice,
      }
      console.log(newOrder, "newOrder")
      try {
         await createOrder(newOrder).unwrap()
         alert("Order placed successfully!")
         navigate("/orders")
      } catch (error) {
         console.log("Error while placing the order!", error)
         alert("Failed to place order")
      }
   };

   if (isLoading) return <div>Loading....</div>

   return (
      <section className="bg-light py-3 py-md-5">
         {console.log(errors, "errors")}
         <div className="container">
            <div className="row gy-3 gy-md-4 gy-lg-0 align-items-md-center">
               <div className="col-12 col-lg-6">
                  <div className="row justify-content-xl-center">
                     <div className="col-12 col-xl-11">
                        <h2 className="h1 mb-3">Personal Detail</h2>
                        <p className="lead fs-4 text-secondary mb-5">Please fill out all the fields.</p>
                        <div className="d-flex">
                           <div>
                              <h4 className="mb-3">Cash on delivery</h4>
                              <div className="d-flex mb-1">
                                 <p className="text-secondary fw-bold mb-0 me-5">Total price</p>
                                 <p className="text-secondary mb-0">{totalPrice}</p>
                              </div>
                              <div className="d-flex">
                                 <p className="text-secondary fw-bold mb-0 me-5">Items</p>
                                 <p className="text-secondary mb-0">{totalItems}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-12 col-lg-6">
                  <div className="bg-white border rounded shadow-sm overflow-hidden">
                     <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
                           <div className="col-12">
                              <label htmlFor="fullname" className="form-label">Full Name <span className="text-danger">*</span></label>
                              <Form.Control
                                 type="text"
                                 className="form-control"
                                 id="fullname"
                                 name="fullname"
                                 {...register("fullname", { required: true })}
                              // isInvalid={errors?.fullname ? "true" : "false"}
                              />
                           </div>
                           <div className="col-12 col-md-6">
                              <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                              <div className="input-group">
                                 <span className="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                       <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                    </svg>
                                 </span>
                                 <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    defaultValue={currentUser?.email}
                                 />
                              </div>
                           </div>
                           <div className="col-12 col-md-6">
                              <label htmlFor="phone" className="form-label">Phone Number</label>
                              <div className="input-group">
                                 <span className="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                                       <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg>
                                 </span>
                                 <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    {...register("phone", { required: true })}
                                 />
                              </div>
                           </div>
                           <div className="col-12">
                              <label htmlFor="address" className="form-label">Address/Street <span className="text-danger">*</span></label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="address"
                                 name="address"
                                 {...register("address", { required: true })}
                              />
                           </div>
                           <div className="col-12">
                              <label htmlFor="city" className="form-label">City <span className="text-danger">*</span></label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="city"
                                 name="city"
                                 {...register("city", { required: true })}
                              />
                           </div>
                           <div className="col-12">
                              <label htmlFor="country" className="form-label">Country / Region <span className="text-danger">*</span></label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="country"
                                 name="country"
                                 {...register("country", { required: true })}
                              />
                           </div>
                           <div className="col-12">
                              <label htmlFor="state" className="form-label">State <span className="text-danger">*</span></label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="state"
                                 name="state"
                                 {...register("state", { required: true })}
                              />
                           </div>
                           <div className="col-12">
                              <label htmlFor="zipcode" className="form-label">Zipcode <span className="text-danger">*</span></label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="zipcode"
                                 name="zipcode"
                                 {...register("zipcode", { required: true })}
                              />
                           </div>
                           <div className="col-12">
                              <Form.Check type="checkbox" id="tnc">
                                 <Form.Check.Input type="checkbox" onChange={(e) => setIsChecked(e.target.checked)} />
                                 <Form.Check.Label>I am aggree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shoping Policy.</Link></Form.Check.Label>
                              </Form.Check>
                           </div>
                           <div className="col-12">
                              <div className="d-grid">
                                 <Button disabled={!isChecked} className="btn btn-primary btn-lg" type="submit">Send Message</Button>
                              </div>
                           </div>
                        </div>
                     </Form>
                  </div>
               </div>
            </div>
         </div>
      </section >
   )
}

export default CheckoutPage