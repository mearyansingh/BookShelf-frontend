import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Form, InputGroup, Dropdown, Pagination, ProgressBar, Image } from 'react-bootstrap';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetOrderByEmailQuery } from '../Store/ordersApi'
import { useAuth } from '../Context/AuthContext'
import { useFetchAllBooksQuery } from '../Store/bookApi';
import { formattedDateWithDelivery, getImgUrl } from '../Helpers';
import Loader from '../Components/Loader';
const Orders = () => {
  const { currentUser } = useAuth()
  const email = currentUser?.email;
  const { data: ordersData = [], isLoading, isError, refetch } = useGetOrderByEmailQuery(email ? email : skipToken)
  const { data: allBooks } = useFetchAllBooksQuery();

  //Initial state
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate()

  // Pagination logic
  const ordersPerPage = 3;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  // Helper to get book details by ID
  const getBooksByIds = (productIds = []) => {
    return allBooks?.filter(book => productIds.includes(book?._id));
  };

  console.log(ordersData, "ordersData")
  console.log(getBooksByIds, "getBooksByIds")

  // Filter orders based on status and search query
  const filteredOrders = ordersData.filter(order => {
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    const books = getBooksByIds(order?.productIds);
    const matchesSearch = order?._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      books?.some(book => book?.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    console.log(dateA, dateB)
    console.log(a, b)

    switch (sortBy) {
      case 'date-asc':
        return dateA - dateB;
      case 'date-desc':
        return dateB - dateA;
      case 'amount-asc':
        return a.totalPrice - b.totalPrice;
      case 'amount-desc':
        return b.totalPrice - a.totalPrice;
      default: return 0;
    }
  });

  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  useEffect(() => {
    // Set loaded state to trigger animations

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Render status badge with appropriate color
  const renderStatusBadge = (status) => {
    const statusConfig = {
      Shipped: { color: 'primary-subtle text-primary', icon: 'truck' },
      Delivered: { color: 'success-subtle text-success', icon: 'check-circle' },
      Processing: { color: 'warning-subtle text-warning', icon: 'clock-history' },
      Cancelled: { color: 'danger-subtle text-danger', icon: 'x-circle' },
      Default: { color: 'secondary-subtle text-secondary', icon: 'circle' }
    };
    const { color, icon } = statusConfig[status] || statusConfig.Default;
    return (
      <Badge bg={color} className="badge-pill px-3 py-2 d-flex align-items-center">
        <i className={`bi bi-${icon} me-2`}></i> {status}
      </Badge>
    );
  };

  // Handle pagination navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the order list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  isLoading && <Loader />
  isError && <p>Something went wrong. <Button onClick={refetch} type='button'>Try Again</Button></p>
  if (!isLoading && !isError && ordersData?.length === 0 && allBooks?.length === 0) return <p>No order found.</p>;

  return (
    <section className="py-lg-16 py-5">
      <Container>
        {/* Header */}
        <div className={`text-center mb-5 ${isLoaded ? 'fade-in' : ''}`}>
          <h1 className="display-4 fw-bold mb-2">My Orders</h1>
          <p className="text-muted">Track and manage all your BookShelf purchases</p>
        </div>
        {/* Filter and Search Section */}
        <Card className={`order-card mb-4 border-light-subtle ${isLoaded ? 'scale-in' : ''}`}>
          <Card.Body className="p-4">
            <Row className="align-items-center g-3">
              <Col lg={4} md={6} className="">
                <InputGroup className='border-light-subtle'>
                  <InputGroup.Text className="bg-light border-light-subtle border-end-0">
                    <i className="bi bi-search text-muted"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by order # or book title"
                    className="border-light-subtle border-start-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col lg={3} md={6} className="">
                <Form.Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border-light-subtle"
                >
                  <option value="All">All Orders</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </Col>
              <Col lg={3} md={6} className="">
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-light-subtle"
                >
                  <option value="date-desc">Date (Newest First)</option>
                  <option value="date-asc">Date (Oldest First)</option>
                  <option value="amount-desc">Price (High to Low)</option>
                  <option value="amount-asc">Price (Low to High)</option>
                </Form.Select>
              </Col>
              <Col lg={2} md={6}>
                <Button variant="primary" className="w-100">
                  <i className="bi bi-funnel me-2"></i>
                  Filter
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        {/* Orders List */}
        {sortedOrders.length === 0 ? (
          <Card className={`order-card text-center border-light-subtle p-5 ${isLoaded ? 'fade-in delay-1' : ''}`}>
            <div className="py-5">
              <i className="bi bi-bag text-muted" style={{ fontSize: '4rem' }}></i>
              <h3 className="mt-3">No orders found</h3>
              <p className="text-muted">Try adjusting your search or filter to find what you're looking for.</p>
              <Button variant="primary" className="mt-3" onClick={() => {
                setFilterStatus('All');
                setSearchQuery('');
              }}>
                Clear Filters
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {currentOrders.map((order, index) => {
              const books = getBooksByIds(order?.productIds);
              const { orderDate, expectedDeliveryDate } = formattedDateWithDelivery(order.createdAt);
              return (
                <Card key={order?._id} className={`order-card border-light-subtle mb-4 ${isLoaded ? `slide-in delay-${index + 1}` : ''}`}>
                  <Card.Body className="p-0">
                    {/* Order Header */}
                    <div className="p-3 bg-dark bg-gradient bg-opacity-10 border-bottom border-light-subtle d-flex justify-content-between align-items-center flex-wrap">
                      <div className="d-flex align-items-center mb-2 mb-md-0">
                        <div className="me-3">
                          <div className="text-muted small">Order #</div>
                          <div className="fw-bold">{order?._id}</div>
                        </div>
                        <div className="me-3 d-none d-md-block">
                          <div className="text-muted small">Order Date</div>
                          <div>{orderDate}</div>
                        </div>
                        <div>
                          <div className="text-muted small">Total</div>
                          <div className="fw-bold">${order?.totalPrice?.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        {renderStatusBadge('Processing')}
                        <Dropdown className="ms-2">
                          <Dropdown.Toggle variant="link" id={`dropdown-${order._id}`} className="btn-sm text-decoration-none bg-white text-black border-light-subtle shadow-sm">
                            <i className="bi bi-three-dots-vertical"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end" className='border-light-subtle'>
                            <Dropdown.Item href={`/order/${order._id}`}>
                              <i className="bi bi-eye me-2"></i> View Details
                            </Dropdown.Item>
                            {/* {order.status === 'Shipped' && ( */}
                            <Dropdown.Item href="#">
                              <i className="bi bi-geo-alt me-2"></i> Track Shipment
                            </Dropdown.Item>
                            {/* )} */}
                            {/* {(order.status === 'Processing' || order.status === 'Shipped') && ( */}
                            <Dropdown.Item href="#">
                              <i className="bi bi-x-circle me-2"></i> Cancel Order
                            </Dropdown.Item>
                            {/* )} */}
                            {/* {order.status === 'Delivered' && ( */}
                            <Dropdown.Item href="#">
                              <i className="bi bi-arrow-return-left me-2"></i> Return Items
                            </Dropdown.Item>
                            {/* )} */}
                            <Dropdown.Item href="#">
                              <i className="bi bi-printer me-2"></i> Print Receipt
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    {/* Order Items */}
                    <div className="p-3">
                      <Row>
                        <Col lg={8}>
                          <div className="d-flex flex-wrap">
                            {books?.map((book, idx) => (
                              <div key={book?._id} className="book-thumbnail me-3 mb-3">
                                <Image
                                  fluid
                                  onClick={() => navigate(`/books/${book?._id}`)}
                                  src={getImgUrl(book?.coverImage)}
                                  alt={book?.title}
                                  className="book-cover cursor-pointer"
                                  style={{ width: "80px", aspectRatio: "2/3", objectFit: "cover" }}
                                />
                                {idx === 2 && books?.length > 3 && (
                                  <div className="more-items cursor-pointer" onClick={() => navigate(`/books/${book?._id}`)}>+{books?.length - 3}</div>
                                )}
                              </div>
                            ))}
                          </div>
                          <div>
                            <div className="mb-1">
                              <span className="fw-bold">{books?.length} items: </span>
                              <span className="text-muted">
                                {books?.map((book, idx) => (
                                  <span key={book?._id}>
                                    {book.title}{idx < books?.length - 1 ? ', ' : ''}
                                  </span>
                                ))}
                              </span>
                            </div>
                            {/* {order.status === 'Shipped' && ( */}
                            <div className="text-muted small">
                              <i className="bi bi-calendar-event me-1"></i>
                              Estimated delivery: {expectedDeliveryDate}
                            </div>
                            {/* // )} */}
                            {/* {order.status === 'Delivered' && (
															<div className="text-muted small">
																<i className="bi bi-check-circle me-1"></i>
																Delivered on: {order.deliveryDate}
															</div>
														)}
														{order.status === 'Cancelled' && (
															<div className="text-muted small">
																<i className="bi bi-x-circle me-1"></i>
																Cancelled on: {order.cancellationDate}
															</div>
														)} */}
                          </div>
                        </Col>
                        <Col lg={4} className="mt-3 mt-lg-0 d-flex flex-column justify-content-center align-items-lg-end">
                          <ProgressBar variant='warning' animated now={25} className='w-100 mb-3' />
                          <div className="d-flex gap-3 text-center text-lg-end">
                            <Button
                              variant="primary"
                              href={`/order-detail/${order?._id}`}
                            >
                              View Details
                            </Button>
                            {/* {order.status === 'Delivered' && ( */}
                            <Button variant="outline-primary">
                              <i className="bi bi-star me-1"></i> Write Review
                            </Button>
                            {/* )} */}
                            {/* {order.status === 'Shipped' && ( */}
                            {/* <Button variant="outline-primary">
															<i className="bi bi-geo-alt me-1"></i> Track Order
														</Button> */}
                            {/* )} */}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </Card>
              )
            })}
            {/* Pagination */}
            {totalPages > 1 && (
              <div className={`d-flex justify-content-center mt-5 ${isLoaded ? 'fade-in delay-6' : ''}`}>
                <Pagination className="custom-pagination">
                  <Pagination.First
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />

                  {[...Array(totalPages)].map((_, idx) => {
                    // Show limited page numbers for cleaner UI
                    if (
                      idx === 0 || // First page
                      idx === totalPages - 1 || // Last page
                      (idx >= currentPage - 2 && idx <= currentPage + 1) // Pages around current
                    ) {
                      return (
                        <Pagination.Item
                          key={idx + 1}
                          active={idx + 1 === currentPage}
                          onClick={() => handlePageChange(idx + 1)}
                        >
                          {idx + 1}
                        </Pagination.Item>
                      );
                    } else if (
                      idx === currentPage - 3 ||
                      idx === currentPage + 2
                    ) {
                      // Add ellipsis for skipped pages
                      return <Pagination.Ellipsis key={`ellipsis-${idx}`} disabled />;
                    }
                    return null;
                  })}

                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
        {/* Help Section */}
        <Card className={`order-card shadow-sm mt-5 border-light-subtle ${isLoaded ? 'slide-in delay-6' : ''}`}>
          <Card.Body className="p-4">
            <div className="text-center">
              <h2 className="fw-bold mb-1">Need help with your order?</h2>
              <p className="text-muted mb-4">Our customer support team is available to assist you with any questions.</p>
              <Row className="justify-content-center">
                <Col md={4} className="mb-3 mb-md-0">
                  <Card className="bg-light border-0 h-100">
                    <Card.Body className="text-center p-4">
                      <div className="order-summary-icon mx-auto mb-3">
                        <i className="bi bi-chat-dots fs-4"></i>
                      </div>
                      <h5 className="fw-bold">Live Chat</h5>
                      <p className="text-muted small mb-3">Talk to our support team in real-time.</p>
                      <Button variant="outline-primary" size="sm">Start Chat</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="mb-3 mb-md-0">
                  <Card className="bg-light border-0 h-100">
                    <Card.Body className="text-center p-4">
                      <div className="order-summary-icon mx-auto mb-3">
                        <i className="bi bi-envelope fs-4"></i>
                      </div>
                      <h5 className="fw-bold">Email Support</h5>
                      <p className="text-muted small mb-3">Send us an email and we'll respond ASAP.</p>
                      <Button variant="outline-primary" size="sm">Email Us</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="bg-light border-0 h-100">
                    <Card.Body className="text-center p-4">
                      <div className="order-summary-icon mx-auto mb-3">
                        <i className="bi bi-question-circle fs-4"></i>
                      </div>
                      <h5 className="fw-bold">FAQ</h5>
                      <p className="text-muted small mb-3">Find answers to common questions.</p>
                      <Button variant="outline-primary" size="sm">Visit FAQ</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section >
  )
}

export default Orders