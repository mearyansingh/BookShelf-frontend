import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, InputGroup, Dropdown, Pagination, Toast, ToastContainer } from 'react-bootstrap';
// import './OrderList.css'; // Assuming we've created a matching CSS file

const OrderList = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date-desc');
    const [currentPage, setCurrentPage] = useState(1);

    // Sample orders data - in a real app this would come from an API
    const orders = [
        {
            orderId: "ORD-78542169",
            orderDate: "April 10, 2025",
            status: "Shipped",
            estimatedDelivery: "April 15, 2025",
            shippingProgress: 65,
            totalAmount: 57.27,
            items: [
                {
                    id: 1,
                    title: "The Midnight Library",
                    author: "Matt Haig",
                    cover: "/api/placeholder/80/120",
                    price: 14.99,
                    quantity: 1
                },
                {
                    id: 2,
                    title: "Project Hail Mary",
                    author: "Andy Weir",
                    cover: "/api/placeholder/80/120",
                    price: 12.99,
                    quantity: 1
                },
                {
                    id: 3,
                    title: "Dune",
                    author: "Frank Herbert",
                    cover: "/api/placeholder/80/120",
                    price: 9.99,
                    quantity: 2
                }
            ]
        },
        {
            orderId: "ORD-85632147",
            orderDate: "April 5, 2025",
            status: "Delivered",
            deliveryDate: "April 8, 2025",
            shippingProgress: 100,
            totalAmount: 42.38,
            items: [
                {
                    id: 4,
                    title: "Atomic Habits",
                    author: "James Clear",
                    cover: "/api/placeholder/80/120",
                    price: 18.99,
                    quantity: 1
                },
                {
                    id: 5,
                    title: "The Song of Achilles",
                    author: "Madeline Miller",
                    cover: "/api/placeholder/80/120",
                    price: 11.99,
                    quantity: 1
                }
            ]
        },
        {
            orderId: "ORD-96325874",
            orderDate: "March 28, 2025",
            status: "Delivered",
            deliveryDate: "April 3, 2025",
            shippingProgress: 100,
            totalAmount: 33.97,
            items: [
                {
                    id: 6,
                    title: "The Silent Patient",
                    author: "Alex Michaelides",
                    cover: "/api/placeholder/80/120",
                    price: 13.99,
                    quantity: 1
                },
                {
                    id: 7,
                    title: "The Alchemist",
                    author: "Paulo Coelho",
                    cover: "/api/placeholder/80/120",
                    price: 9.99,
                    quantity: 2
                }
            ]
        },
        {
            orderId: "ORD-74125896",
            orderDate: "March 20, 2025",
            status: "Processing",
            estimatedDelivery: "April 14, 2025",
            shippingProgress: 35,
            totalAmount: 65.49,
            items: [
                {
                    id: 8,
                    title: "Educated",
                    author: "Tara Westover",
                    cover: "/api/placeholder/80/120",
                    price: 16.99,
                    quantity: 1
                },
                {
                    id: 9,
                    title: "Where the Crawdads Sing",
                    author: "Delia Owens",
                    cover: "/api/placeholder/80/120",
                    price: 14.99,
                    quantity: 1
                },
                {
                    id: 10,
                    title: "Circe",
                    author: "Madeline Miller",
                    cover: "/api/placeholder/80/120",
                    price: 15.99,
                    quantity: 2
                }
            ]
        },
        {
            orderId: "ORD-36985214",
            orderDate: "March 12, 2025",
            status: "Cancelled",
            cancellationDate: "March 13, 2025",
            shippingProgress: 0,
            totalAmount: 27.98,
            items: [
                {
                    id: 11,
                    title: "The Hobbit",
                    author: "J.R.R. Tolkien",
                    cover: "/api/placeholder/80/120",
                    price: 13.99,
                    quantity: 2
                }
            ]
        }
    ];

    // Filter orders based on status and search query
    const filteredOrders = orders.filter(order => {
        const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
        const matchesSearch = order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesStatus && matchesSearch;
    });

    // Sort orders
    const sortedOrders = [...filteredOrders].sort((a, b) => {
        const dateA = new Date(a.orderDate);
        const dateB = new Date(b.orderDate);

        switch (sortBy) {
            case 'date-asc':
                return dateA - dateB;
            case 'date-desc':
                return dateB - dateA;
            case 'amount-asc':
                return a.totalAmount - b.totalAmount;
            case 'amount-desc':
                return b.totalAmount - a.totalAmount;
            default:
                return dateB - dateA;
        }
    });

    // Pagination logic
    const ordersPerPage = 3;
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

    useEffect(() => {
        // Set loaded state to trigger animations
        setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        // Show a toast notification after component mounts
        const timer = setTimeout(() => {
            setShowToast(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Render status badge with appropriate color
    const renderStatusBadge = (status) => {
        let color, icon;

        switch (status) {
            case 'Shipped':
                color = 'primary';
                icon = 'truck';
                break;
            case 'Delivered':
                color = 'success';
                icon = 'check-circle';
                break;
            case 'Processing':
                color = 'warning';
                icon = 'clock-history';
                break;
            case 'Cancelled':
                color = 'danger';
                icon = 'x-circle';
                break;
            default:
                color = 'secondary';
                icon = 'circle';
        }

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

    return (
        <Container className="py-5">
            {/* Toast notification */}
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
                    <Toast.Header closeButton={true}>
                        <div className="bg-primary rounded-circle p-1 me-2">
                            <i className="bi bi-bell text-white"></i>
                        </div>
                        <strong className="me-auto">New Update</strong>
                        <small>Just now</small>
                    </Toast.Header>
                    <Toast.Body>
                        <div className="d-flex align-items-center">
                            <div className="me-3">
                                <i className="bi bi-box-seam-fill text-primary fs-3"></i>
                            </div>
                            <div>
                                Your recent order <strong>#ORD-78542169</strong> has been shipped and is on its way!
                            </div>
                        </div>
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            {/* Header */}
            <div className={`text-center mb-5 ${isLoaded ? 'fade-in' : ''}`}>
                <h1 className="display-4 fw-bold mb-2">My Orders</h1>
                <p className="text-muted">Track and manage all your BookHaven purchases</p>
            </div>

            {/* Filter and Search Section */}
            <Card className={`order-card mb-4 ${isLoaded ? 'scale-in' : ''}`}>
                <Card.Body className="p-4">
                    <Row className="align-items-center">
                        <Col lg={4} md={6} className="mb-3 mb-md-0">
                            <InputGroup>
                                <InputGroup.Text className="bg-white border-end-0">
                                    <i className="bi bi-search text-muted"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by order # or book title"
                                    className="border-start-0"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                        <Col lg={3} md={6} className="mb-3 mb-md-0">
                            <Form.Select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="border-0 shadow-sm"
                            >
                                <option value="All">All Orders</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </Form.Select>
                        </Col>
                        <Col lg={3} className="mb-3 mb-lg-0">
                            <Form.Select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border-0 shadow-sm"
                            >
                                <option value="date-desc">Date (Newest First)</option>
                                <option value="date-asc">Date (Oldest First)</option>
                                <option value="amount-desc">Price (High to Low)</option>
                                <option value="amount-asc">Price (Low to High)</option>
                            </Form.Select>
                        </Col>
                        <Col lg={2}>
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
                <Card className={`order-card text-center p-5 ${isLoaded ? 'fade-in delay-1' : ''}`}>
                    <div className="py-5">
                        <i className="bi bi-inbox text-muted" style={{ fontSize: '4rem' }}></i>
                        <h3 className="mt-4">No orders found</h3>
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
                    {currentOrders.map((order, index) => (
                        <Card key={order.orderId} className={`order-card mb-4 ${isLoaded ? `slide-in delay-${index + 1}` : ''}`}>
                            <Card.Body className="p-0">
                                {/* Order Header */}
                                <div className="p-3 bg-light border-bottom d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="d-flex align-items-center mb-2 mb-md-0">
                                        <div className="me-3">
                                            <div className="text-muted small">Order #</div>
                                            <div className="fw-bold">{order.orderId}</div>
                                        </div>
                                        <div className="me-3 d-none d-md-block">
                                            <div className="text-muted small">Order Date</div>
                                            <div>{order.orderDate}</div>
                                        </div>
                                        <div>
                                            <div className="text-muted small">Total</div>
                                            <div className="fw-bold">${order.totalAmount.toFixed(2)}</div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        {renderStatusBadge(order.status)}
                                        <Dropdown className="ms-2">
                                            <Dropdown.Toggle variant="light" id={`dropdown-${order.orderId}`} className="btn-sm shadow-sm">
                                                <i className="bi bi-three-dots"></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu align="end">
                                                <Dropdown.Item href={`/order/${order.orderId}`}>
                                                    <i className="bi bi-eye me-2"></i> View Details
                                                </Dropdown.Item>
                                                {order.status === 'Shipped' && (
                                                    <Dropdown.Item href="#">
                                                        <i className="bi bi-geo-alt me-2"></i> Track Shipment
                                                    </Dropdown.Item>
                                                )}
                                                {(order.status === 'Processing' || order.status === 'Shipped') && (
                                                    <Dropdown.Item href="#">
                                                        <i className="bi bi-x-circle me-2"></i> Cancel Order
                                                    </Dropdown.Item>
                                                )}
                                                {order.status === 'Delivered' && (
                                                    <Dropdown.Item href="#">
                                                        <i className="bi bi-arrow-return-left me-2"></i> Return Items
                                                    </Dropdown.Item>
                                                )}
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
                                                {order.items.slice(0, 3).map((item, idx) => (
                                                    <div key={item.id} className="book-thumbnail me-3 mb-3">
                                                        <img
                                                            src={item.cover}
                                                            alt={item.title}
                                                            className="book-cover"
                                                            style={{ width: "80px", aspectRatio: "2/3", objectFit: "cover" }}
                                                        />
                                                        {idx === 2 && order.items.length > 3 && (
                                                            <div className="more-items">+{order.items.length - 3}</div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                <div className="mb-1">
                                                    <span className="fw-bold">{order.items.reduce((sum, item) => sum + item.quantity, 0)} items: </span>
                                                    <span className="text-muted">
                                                        {order.items.map((item, idx) => (
                                                            <span key={item.id}>
                                                                {item.title}{idx < order.items.length - 1 ? ', ' : ''}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                                {order.status === 'Shipped' && (
                                                    <div className="text-muted small">
                                                        <i className="bi bi-calendar-event me-1"></i>
                                                        Estimated delivery: {order.estimatedDelivery}
                                                    </div>
                                                )}
                                                {order.status === 'Delivered' && (
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
                                                )}
                                            </div>
                                        </Col>
                                        <Col lg={4} className="mt-3 mt-lg-0 d-flex flex-column justify-content-center align-items-lg-end">
                                            {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                                                <div className="progress w-100 mb-2" style={{ height: "8px" }}>
                                                    <div
                                                        className="progress-bar"
                                                        role="progressbar"
                                                        style={{ width: `${order.shippingProgress}%` }}
                                                        aria-valuenow={order.shippingProgress}
                                                        aria-valuemin="0"
                                                        aria-valuemax="100">
                                                    </div>
                                                </div>
                                            )}
                                            <div className="d-grid gap-2 d-md-block text-center text-lg-end">
                                                <Button
                                                    variant="primary"
                                                    href={`/order/${order.orderId}`}
                                                    className="me-md-2 mb-2 mb-md-0"
                                                >
                                                    View Details
                                                </Button>
                                                {order.status === 'Delivered' && (
                                                    <Button variant="outline-primary">
                                                        <i className="bi bi-star me-1"></i> Write Review
                                                    </Button>
                                                )}
                                                {order.status === 'Shipped' && (
                                                    <Button variant="outline-primary">
                                                        <i className="bi bi-geo-alt me-1"></i> Track Order
                                                    </Button>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className={`d-flex justify-content-center mt-4 ${isLoaded ? 'fade-in delay-6' : ''}`}>
                            <Pagination>
                                <Pagination.First
                                    onClick={() => handlePageChange(1)}
                                    disabled={currentPage === 1}
                                />
                                <Pagination.Prev
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                />

                                {[...Array(totalPages)].map((_, idx) => (
                                    <Pagination.Item
                                        key={idx + 1}
                                        active={idx + 1 === currentPage}
                                        onClick={() => handlePageChange(idx + 1)}
                                    >
                                        {idx + 1}
                                    </Pagination.Item>
                                ))}

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
            <Card className={`order-card mt-5 ${isLoaded ? 'slide-in delay-6' : ''}`}>
                <Card.Body className="p-4">
                    <div className="text-center">
                        <h4 className="fw-bold mb-3">Need help with your order?</h4>
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
    );
};

export default OrderList;