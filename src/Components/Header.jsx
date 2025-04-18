import { useState } from 'react';
import { Button, Container, Navbar, Dropdown, Offcanvas, ListGroup, Figure, Image, Badge, Form, Col, Row, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getImgUrl } from '../Helpers';
import { clearCart, removeFromCart } from '../Store/cartSlice';
import { useAuth } from '../Context/AuthContext';
import userAvatar from '../assets/avatar.png'

const profileMenu = [
  {
    name: 'Dashboard',
    url: '/dashboard'
  },
  {
    name: 'Orders',
    url: '/orders'
  }
]
const Header = () => {

  //CONTEXT
  const { currentUser, logoutUser } = useAuth()

  //STORE
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  //Initial state
  const [show, setShow] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0)
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.newPrice * item.quantity), 0).toFixed(2)
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product))
  }

  //Clear the cart
  const handleClearCart = () => {
    dispatch(clearCart())
  }

  //Logout
  const handleLogout = () => {
    logoutUser()
  }

  return (
    <header className='bg-light bg-opacity-50 bg-gradient py-1 sticky-top shadow-sm'>
      <Navbar className="sticky-top">
        <Container className=''>
          <Navbar.Brand as={Link} to="/" className='fw-bold'>
            <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path> </svg>
            <span className='ms-1 d-none d-sm-inline-block'>BookShelf</span>
          </Navbar.Brand>
          <div className='d-flex align-items-center flex-grow-1 justify-content-end'>
            {currentUser ? (
              <Dropdown align="end" className='me-2'>
                <Dropdown.Toggle as={Button} variant="link" id="dropdown-basic" className="d-inline-flex align-items-center justify-content-center text-light text-decoration-none">
                  <Image src={userAvatar} alt="user avatar " className='rounded-circle' width={45} height={45} />
                </Dropdown.Toggle>
                <Dropdown.Menu className='border-0 shadow'>
                  {profileMenu.map((menu) => (
                    <Dropdown.Item as={Link} key={menu?.url} to={menu?.url} >{menu?.name}</Dropdown.Item>
                  ))}
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className='hstack gap-3'>
                <NavLink
                  to='/login'
                  className={({ isActive, isPending }) => `text-decoration-none ${isPending ? "pending" : isActive ? "active fw-semibold" : ""}`}>
                  Login
                </NavLink>
                <NavLink
                  to='/register'
                  className={({ isActive, isPending }) => `text-decoration-none ${isPending ? "pending" : isActive ? "active fw-semibold" : ""}`}>
                  Register
                </NavLink>
              </div>

            )}
            {(cartItems?.length > 0) &&
              <Button Button variant="outline-dark fw-semibold" onClick={handleShow}>
                <i className='bi bi-cart' /><span className='ps-1 d-none d-sm-inline-block'>Cart</span>{cartItems?.length > 0 && <span className='ps-1'>{`${cartItems?.length > 0 ? cartItems?.length : '0'}`}</span>}
              </Button>
            }
            <Offcanvas
              show={show}
              onHide={handleClose}
              placement="end"
              className="shopping-cart-offcanvas"
              backdrop="static"
            >
              <Offcanvas.Header
                className="border-bottom bg-light border-light-subtle sticky-top"
              >
                <div className="d-flex justify-content-between align-items-center w-100 lh-1">
                  <Offcanvas.Title className="d-flex align-items-center">
                    <i className="bi bi-bag-check fs-4 me-2 text-primary"></i>
                    <span className="fw-bold">Your Cart</span>
                  </Offcanvas.Title>
                  <Button
                    variant="link"
                    className="p-0 fs-4 text-dark"
                    onClick={handleClose}
                    aria-label="Close"
                  >
                    <i className="bi bi-x-lg" />
                  </Button>
                </div>
              </Offcanvas.Header>
              <div className="position-relative" style={{ height: "calc(100% - 60px)" }}>
                <Offcanvas.Body className="p-0" style={{ overflow: "hidden", height: "100%" }}>
                  {cartItems?.length > 0 ? (
                    <div className="d-flex flex-column h-100">
                      <div className="border-bottom border-light-subtle bg-light py-2 px-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="view-toggle btn-group">
                            <Button
                              variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                              size="sm"
                              className="d-flex align-items-center"
                              onClick={() => setViewMode('list')}
                            >
                              <i className="bi bi-list-ul me-1" /> List
                            </Button>
                            <Button
                              variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                              size="sm"
                              className="d-flex align-items-center"
                              onClick={() => setViewMode('grid')}
                            >
                              <i className="bi bi-grid-3x3-gap me-1" /> Grid
                            </Button>
                          </div>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={handleClearCart}
                            className="d-flex align-items-center"
                          >
                            <i className="bi bi-trash3 me-1" />Clear All
                          </Button>
                        </div>
                      </div>
                      <div
                        className="cart-items-container flex-grow-1 overflow-auto p-3 overflow-y-auto"
                      >
                        {viewMode === 'list' ? (
                          // List View
                          <ListGroup variant="flush" className='gap-3'>
                            {cartItems?.map((product) => (
                              <ListGroup.Item key={product?._id} className="p-3 border border-light-subtle rounded bg-body-tertiary">
                                <div className="d-flex gap-3">
                                  <div className="flex-shrink-0">
                                    <div className="position-relative">
                                      <Image
                                        fluid
                                        width={90}
                                        height={90}
                                        alt={product.title}
                                        src={getImgUrl(product.coverImage)}
                                        className="object-fit-cover rounded"
                                        style={{ objectFit: 'cover' }}
                                      />
                                      <Badge
                                        bg="dark-subtle text-dark"
                                        pill
                                        className="position-absolute fw-semibold bottom-0 start-0 m-2"
                                      >
                                        {product.trending && 'Trending'}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-start">
                                      <h6 className="mb-1 fw-semibold text-wrap text-truncate pe-2 border-0">{product.title}</h6>
                                      <Button
                                        variant="link"
                                        className="p-0 text-danger lh-1"
                                        onClick={() => handleRemoveFromCart(product)}
                                        aria-label="Remove item"
                                      >
                                        <i className="bi bi-x fs-2" />
                                      </Button>
                                    </div>
                                    <p className="mb-2 text-capitalize">
                                      <span className="badge bg-white-subtle border border-dark-subtle text-dark-emphasis">{product.category}</span>
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                      <p className="fw-bold mb-0 ms-2 text-primary">
                                        ${(product.newPrice * product.quantity).toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        ) : (
                          // Grid View
                          <Row xs={1} md={2} className="g-3">
                            {cartItems?.map((product) => (
                              <Col key={product._id}>
                                <Card className="h-100 border-0 shadow-sm hover-effect">
                                  <div className="position-relative">
                                    <Card.Img
                                      variant="top"
                                      src={getImgUrl(product.coverImage)}
                                      style={{ height: '120px', objectFit: 'cover' }}
                                    />
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      className="position-absolute d-flex align-items-center justify-content-center top-0 end-0 m-2 rounded-circle p-1"
                                      onClick={() => handleRemoveFromCart(product)}
                                      style={{ width: '30px', height: '30px' }}
                                      aria-label="Remove item"
                                    >
                                      <i className="bi bi-x fs-3" />
                                    </Button>
                                  </div>
                                  <Card.Body className="p-3">
                                    <Card.Title className="fs-6 mb-1 fw-semibold text-truncate">{product.title}</Card.Title>
                                    <Card.Text className="mb-2">
                                      <span className="badge bg-light border border-light-subtle text-dark text-capitalize">{product.category}</span>
                                    </Card.Text>
                                    <div className="d-flex justify-content-between align-items-center">
                                      <span className="fw-bold text-primary">${(product.newPrice * product.quantity).toFixed(2)}</span>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        )}
                      </div>
                      <div className="cart-summary border-top border-light-subtle shadow-sm mt-auto bg-white p-3">
                        <div className="summary-rows mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted">Subtotal ({cartItems?.length} items)</span>
                            <span className="fw-semibold">${totalPrice}</span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted">Shipping</span>
                            <span className="text-success">Free</span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold">Total</span>
                            <span className="fw-bold fs-5 text-primary">${totalPrice}</span>
                          </div>
                        </div>
                        <div className="d-grid gap-2">
                          <Button
                            as={Link}
                            to="/checkout"
                            variant="primary"
                            className="d-flex align-items-center justify-content-center"
                            size="lg"
                            onClick={handleClose}
                          >
                            <i className="bi bi-credit-card me-2" />Checkout
                          </Button>
                          <Button
                            variant="outline-secondary"
                            className="d-flex align-items-center justify-content-center"
                            onClick={handleClose}
                            size="lg"
                          >
                            <i className="bi bi-arrow-left me-2" />Continue Shopping
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center text-center p-4 h-100">
                      <div className="empty-cart-icon mb-3">
                        <i className="bi bi-cart-x display-1 text-muted"></i>
                      </div>
                      <h4 className="fw-bold mb-2">Your cart is empty</h4>
                      <p className="text-muted mb-4">Looks like you haven't added anything to your cart yet.</p>
                      <Button
                        as={Link}
                        to="/"
                        variant="primary"
                        className="d-flex align-items-center"
                        onClick={handleClose}
                      >
                        <i className="bi bi-shop me-2" />
                        Browse Products
                      </Button>
                    </div>
                  )}
                </Offcanvas.Body>
              </div>
            </Offcanvas>
          </div>
        </Container>
      </Navbar >
    </header >
  )
}
export default Header