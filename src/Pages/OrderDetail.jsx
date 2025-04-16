import { useState } from 'react'
import { Container, Row, Col, Card, Badge, Button, ProgressBar, Collapse, ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetOrderByEmailQuery } from '../Store/ordersApi'
import { useAuth } from '../Context/AuthContext'
import { formattedDateWithDelivery, getImgUrl } from '../Helpers';
import { useFetchAllBooksQuery } from '../Store/bookApi';
import Loader from '../Components/Loader';

const trackingSteps = [
  {
    title: "Package has shipped",
    timestamp: "April 11, 2025 - 9:45 AM",
    description: "Your package has left our warehouse",
    completed: true,
    icon: "truck"
  },
  {
    title: "Order processed",
    timestamp: "April 10, 2025 - 2:30 PM",
    description: "Your order has been processed and is being prepared for shipment",
    completed: true,
    icon: "box-seam"
  },
  {
    title: "Order received",
    timestamp: "April 10, 2025 - 10:15 AM",
    description: "We've received your order and payment has been confirmed",
    completed: true,
    icon: "check-circle"
  }
]
const OrderDetail = () => {
  //CONTEXT
  const { currentUser } = useAuth()
  const email = currentUser?.email;
  //RTK QUERY
  const { data: ordersData = [], isLoading, isError, refetch } = useGetOrderByEmailQuery(email ? email : skipToken)
  const { data: allBooks } = useFetchAllBooksQuery();

  const { id: orderId } = useParams()

  //Initial state
  const [openSupport, setOpenSupport] = useState(false);

  // Find the specific order by ID
  const order = ordersData?.find(order => order?._id === orderId)

  // Get books associated with the productIds in the order
  const orderedBooks = order ? allBooks?.filter(book => order?.productIds?.includes(book?._id)) : [];

  // Function to render stars for ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={`bi ${i < rating ? 'bi-star-fill' : 'bi-star'}`}
          style={{ color: i < rating ? '#ffbe0b' : '#dee2e6', marginRight: '2px' }}
        />
      );
    }
    return stars;
  };

  isLoading && <Loader />
  isError && <p>Something went wrong. <Button onClick={refetch} type='button'>Try Again</Button></p>;

  return (
    <section className="py-lg-16 py-5">
      <Container>
        {/* Header */}
        <div className='text-center mb-5'>
          <h1 className="display-4 fw-bold mb-2">
            Order Details
          </h1>
          <p className="text-muted">Thank you for shopping with BookShelf!</p>
        </div>
        {(!isLoading && !isError && ordersData?.length === 0 && allBooks?.length === 0) ? (
          <Card className='order-card text-center border-light-subtle p-5'>
            <div className="py-5">
              <i className="bi bi-bag text-muted" style={{ fontSize: '4rem' }}></i>
              <h3 className="mt-3">No orders found</h3>
              <p className="text-muted">Please try again later.</p>
            </div>
          </Card>
        ) : (
          <>

            {/* Order Summary Card */}
            <Card className='order-card border-light-subtle rounded-top-4  overflow-hidden mb-4'>
              <div className="order-header rounded-top-4 overflow-hidden text-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">
                    <i className="bi bi-bookmark-star me-2"></i>
                    Order Summary
                  </h5>
                  <Badge bg="light" text="dark" className="badge-pill px-3 py-2 d-flex align-items-center">
                    {/* {order.status === "Shipped" ? (
                      <><i className="bi bi-truck me-2"></i> {order.status}</>
                  ) : order.status === "Delivered" ? (
                      <><i className="bi bi-check-circle me-2"></i> {order.status}</>
                  ) : (
                      <><i className="bi bi-clock-history me-2"></i> {order.status}</>
                  )} */}
                    <i className="bi bi-clock-history me-2" />Processing
                  </Badge>
                </div>
              </div>
              <Card.Body className="py-4">
                <Row className="order-summary-row">
                  <Col md={6} lg={3} className='mb-3 mb-lg-0'>
                    <div className="order-summary-item">
                      <div className="order-summary-icon flex-shrink-0">
                        <i className="bi bi-receipt fs-4"></i>
                      </div>
                      <div className='flex-grow-1'>
                        <div className="text-muted small">Order Number</div>
                        <div className="fw-bold text-break">{order?._id}</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} lg={3} className='mb-3 mb-lg-0'>
                    <div className="order-summary-item">
                      <div className="order-summary-icon flex-shrink-0">
                        <i className="bi bi-calendar-event fs-4"></i>
                      </div>
                      <div className='flex-grow-1'>
                        <div className="text-muted small">Order Date</div>
                        <div className="fw-bold">{formattedDateWithDelivery(order?.createdAt).orderDate}</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} lg={3} className='mb-3 mb-lg-0'>
                    <div className="order-summary-item">
                      <div className="order-summary-icon flex-shrink-0">
                        <i className="bi bi-box-seam fs-4"></i>
                      </div>
                      <div className='flex-grow-1'>
                        <div className="text-muted small">Total Items</div>
                        <div className="fw-bold">{orderedBooks?.length} books</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} lg={3} className=''>
                    <div className="order-summary-item">
                      <div className="order-summary-icon flex-shrink-0">
                        <i className="bi bi-credit-card fs-4"></i>
                      </div>
                      <div className='flex-grow-1'>
                        <div className="text-muted small">Total Amount</div>
                        <div className="fw-bold">${order?.totalPrice?.toFixed(2)}</div>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* {order.status === "Shipped" && ( */}
                <div className='mt-4 pt-3 border-top'>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Estimated delivery: <strong>{formattedDateWithDelivery(order?.createdAt).expectedDeliveryDate}</strong></span>
                    <span className="badge bg-success-subtle text-success badge-pill">35% Complete</span>
                  </div>
                  <ProgressBar
                    animated
                    variant='success'
                    now={35}
                    className="mt-1"
                    style={{ height: "10px" }}
                  />
                  <div className="d-flex justify-content-between mt-3">
                    <div className="text-center">
                      <div className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px" }}>
                        <i className="bi bi-check text-white small"></i>
                      </div>
                      <div className="text-muted small mt-1">Ordered</div>
                    </div>
                    <div className="text-center">
                      <div className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px" }}>
                        <i className="bi bi-check text-white small"></i>
                      </div>
                      <div className="text-muted small mt-1">Processing</div>
                    </div>
                    <div className="text-center">
                      <div className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px" }}>
                        <i className="bi bi-check text-white small"></i>
                      </div>
                      <div className="text-muted small mt-1">Shipped</div>
                    </div>
                    <div className="text-center">
                      <div className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px" }}>
                        <i className="bi bi-circle text-muted small"></i>
                      </div>
                      <div className="text-muted small mt-1">Delivered</div>
                    </div>
                  </div>
                </div>
                {/* )} */}
              </Card.Body>
            </Card>
            {/* Main content */}
            <Row className="g-4">
              {/* Order items column */}
              <Col lg={8}>
                <Card className={`order-card border-light-subtle mb-4`}>
                  <Card.Body className="p-3">
                    <div className="section-header">
                      <div className="section-header-icon">
                        <i className="bi bi-book"></i>
                      </div>
                      <h5 className="mb-0 fw-bold">Order Items</h5>
                    </div>
                    {orderedBooks?.map((book, index) => (
                      <div
                        key={book._id}
                        className='book-item'
                      >
                        <Row>
                          <Col xs={4} md={3}>
                            <img
                              src={getImgUrl(book?.coverImage)}
                              alt={book.title}
                              className="img-fluid book-cover"
                              style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover" }}
                            />
                          </Col>
                          <Col xs={8} md={9}>
                            <h5 className="mb-1">{book.title}</h5>
                            <p className="text-muted mb-2">by N/A</p>
                            <div className="mb-2">
                              {renderStars(Math.floor(Math.random() * 2) + 4)}
                            </div>
                            <div className="d-flex flex-wrap gap-2 mb-3">
                              <Badge bg="primary-subtle text-primary-emphasis" className="rounded-pill">
                                Hardcover
                              </Badge>
                              <Badge bg="secondary-subtle text-secondary-emphasis" text="dark" className="rounded-pill">
                                Qty: 1
                              </Badge>
                              <Badge bg="success-subtle text-success-emphasis" text="primary" className="rounded-pill">
                                In stock
                              </Badge>
                            </div>
                            <div className="d-flex flex-wrap gap-3 justify-content-between align-items-end">
                              <div className="fw-bold fs-5">${book.newPrice.toFixed(2)}</div>
                              <div className='vstack gap-3'>
                                <Button variant="outline-primary" size="sm" className="me-2">
                                  <i className="bi bi-heart me-1"></i>
                                  Save
                                </Button>
                                <Button as={Link} type='button' to={`/books/${book?._id}`} variant="outline-primary" size="sm" >
                                  <i className="bi bi-arrow-repeat me-1"></i>
                                  Buy Again
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </Card.Body>
                  <Card.Footer className='border-light-subtle py-3'>
                    <div className="d-sm-flex justify-content-between align-items-center gap-3 ">
                      <Button as={Link} type="button" to="/" variant="outline-primary" className='d-block w-100 mb-3 mb-sm-0'>
                        <i className="bi bi-arrow-left me-2"></i>
                        Continue Shopping
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => window.print()}
                        className='d-block w-100'
                      >
                        <i className="bi bi-printer me-2"></i>
                        Print Order
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
                {/* Tracking Information */}
                <Card className='order-card border-light-subtle mb-4'>
                  <Card.Body className="p-4">
                    <div className="section-header">
                      <div className="section-header-icon">
                        <i className="bi bi-truck"></i>
                      </div>
                      <h5 className="mb-0 fw-bold">Tracking Information</h5>
                    </div>
                    <div className="d-flex gap-2 flex-wrap align-items-center justify-content-between mb-4 mt-3">
                      <div>
                        <div className="text-muted small">Tracking Number</div>
                        <div className="fw-bold">1Z999AA10123456784</div>
                      </div>
                      <Button variant="primary">
                        <i className="bi bi-box-arrow-up-right me-2"></i>
                        Track Package
                      </Button>
                    </div>
                    <div className="mt-4">
                      {trackingSteps.map((step, index) => (
                        <div key={index} className={`tracking-step ${step.completed ? 'completed' : ''} `}>
                          <div className="d-flex mb-4">
                            <div className="flex-shrink-0">
                              <div className={`tracking-circle bg-${step.completed ? 'success' : 'light'} text-${step.completed ? 'white' : 'muted'}`}>
                                <i className={`bi bi-${step.icon}`}></i>
                              </div>
                            </div>
                            <div className="tracking-info">
                              <div className="fw-bold">{step.title}</div>
                              <div className="text-muted small">{step.timestamp}</div>
                              <div className="text-muted small mt-1">{step.description}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              {/* Order details and customer info column */}
              <Col lg={4}>
                {/* Customer Information */}
                <Card className='order-card border-light-subtle mb-4'>
                  <Card.Body className="p-4">
                    <div className="section-header">
                      <div className="section-header-icon">
                        <i className="bi bi-person"></i>
                      </div>
                      <h5 className="mb-0 fw-bold">Customer Information</h5>
                    </div>
                    <div className="mt-3">
                      <div className="d-flex align-items-center mb-3 p-2 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px" }}>
                          {order?.name.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-bold">{order?.name}</div>
                          <div className="text-muted small">Premium Member</div>
                        </div>
                      </div>
                      <div className="mb-3 mt-4">
                        <div className="d-flex align-items-center mb-2">
                          <div className="text-primary me-2">
                            <i className="bi bi-envelope"></i>
                          </div>
                          <div className="text-muted small">Email</div>
                        </div>
                        <div>{order?.email}</div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <div className="text-primary me-2">
                            <i className="bi bi-telephone"></i>
                          </div>
                          <div className="text-muted small">Phone</div>
                        </div>
                        <div>{order?.phone}</div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                {/* Shipping Address */}
                <Card className='order-card border-light-subtle mb-4'>
                  <Card.Body className="p-4">
                    <div className="section-header">
                      <div className="section-header-icon">
                        <i className="bi bi-geo-alt"></i>
                      </div>
                      <h5 className="mb-0 fw-bold">Shipping Address</h5>
                    </div>
                    <div className="mt-3 p-3 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                      <div className="d-flex align-items-center mb-3">
                        <div className="text-primary me-2">
                          <i className="bi bi-house-door"></i>
                        </div>
                        <div className="fw-medium">Home Address</div>
                      </div>
                      <address className="mb-2 ps-4">
                        {order?.fullAddress?.address}<br />
                        {order?.fullAddress?.city}, {order?.fullAddress?.state} {order?.fullAddress?.zipcode}<br />
                        {order?.fullAddress?.country}
                      </address>
                      {/* <div className="d-flex justify-content-end">
                    <Button variant="outline-primary" size="sm">
                      <i className="bi bi-pencil me-1"></i>
                      Edit
                    </Button>
                  </div> */}
                    </div>
                  </Card.Body>
                </Card>
                {/* Payment Details */}
                <Card className='order-card border-light-subtle mb-4'>
                  <Card.Body className="p-4">
                    <div className="section-header">
                      <div className="section-header-icon">
                        <i className="bi bi-credit-card"></i>
                      </div>
                      <h5 className="mb-0 fw-bold">Payment Details</h5>
                    </div>
                    <div className="mt-3 p-3 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                      <div className="d-flex align-items-center mb-3">
                        <div className="text-primary me-2">
                          <i className="bi bi-credit-card"></i>
                        </div>
                        <div className="fw-medium">Cash On Delivery</div>
                      </div>
                      <div className="payment-details mt-3">
                        <div className="payment-details-row">
                          <span>Subtotal</span>
                          <span>N/A</span>
                        </div>
                        <div className="payment-details-row">
                          <span>Shipping</span>
                          <span>N/A</span>
                        </div>
                        <div className="payment-details-row">
                          <span>Tax</span>
                          <span>N/A</span>
                        </div>
                        <div className="payment-details-row">
                          <span className="payment-total">Total</span>
                          <span className="payment-total">${order?.totalPrice?.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                {/* Help and Support */}
                <Card className='order-card border-light-subtle'>
                  <Card.Body className="p-4">
                    <div className="section-header">
                      <div className="section-header-icon">
                        <i className="bi bi-question-circle"></i>
                      </div>
                      <h5 className="mb-0 fw-bold">Need Help?</h5>
                    </div>
                    <div className="mt-3">
                      <Button
                        variant="outline-primary"
                        className="w-100 mb-3"
                        onClick={() => setOpenSupport(!openSupport)}
                        aria-expanded={openSupport}
                      >
                        <i className="bi bi-chat-dots me-2"></i>
                        Contact Support
                      </Button>
                      <Collapse in={openSupport}>
                        <div>
                          <div className="bg-light p-3 rounded mb-3">
                            <p className="text-muted small mb-3">
                              If you need assistance with your order, our customer support team is here to help.
                            </p>
                            <Button variant="primary" className="w-100">
                              <i className="bi bi-headset me-2"></i>
                              Start Live Chat
                            </Button>
                          </div>
                        </div>
                      </Collapse>
                      <ListGroup>
                        <ListGroup.Item className="d-flex align-items-center">
                          <i className="bi bi-arrow-return-left text-primary me-3"></i>
                          <span>Returns & Refunds</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex align-items-center">
                          <i className="bi bi-file-earmark-text text-primary me-3"></i>
                          <span>Order FAQs</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex align-items-center">
                          <i className="bi bi-shield-check text-primary me-3"></i>
                          <span>Shipping Policies</span>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container >
    </section >
  )
}

export default OrderDetail