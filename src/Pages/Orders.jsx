import React from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import { useGetOrderByEmailQuery } from '../Store/ordersApi'
import { useAuth } from '../Context/AuthContext'

const Orders = () => {
   const { currentUser } = useAuth()
   const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email)
   // console.log(orders)
   return (
      <section className="py-lg-16 py-5">
         <Container>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error getting order data</div>}
            {orders.length > 0 ?
               (<>
                  <h5>Your Orders</h5>
                  <ListGroup variant="flush">
                     {orders.map((order, index) => (
                        <ListGroup.Item key={order._id}>
                           <p className='p-1 bg-secondary text-white w-25 rounded mb-1'># {index + 1}</p>
                           <h6 className="fw-bold">Order ID: {order._id}</h6>
                           <p className="">Name: {order.name}</p>
                           <p className="">Email: {order.email}</p>
                           <p className="">Phone: {order.phone}</p>
                           <p className="">Total Price: ${order.totalPrice}</p>
                           <h6 className="fw-semibold mt-2">Address:</h6>
                           <p>{order.fullAddress.city} ,{order.fullAddress.city}, {order.fullAddress.state}, {order.fullAddress.country}, {order.fullAddress.zipcode}</p>
                           <h6 className="fw-semibold mt-2">Products Id:</h6>
                           <ul>
                              {order.productIds.map((productId) => (
                                 <li key={productId}>{productId}</li>
                              ))}
                           </ul>
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               </>
               )
               :
               (
                  <div>
                     <p>No! orders found</p>
                  </div>
               )
            }
         </Container >
      </section >
   )
}

export default Orders