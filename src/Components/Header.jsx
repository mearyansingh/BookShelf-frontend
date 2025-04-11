import { useState } from 'react';
import { Button, Container, Navbar, Dropdown, Offcanvas, ListGroup, Figure, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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

  const { currentUser, logoutUser } = useAuth()

  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

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
    <header className='bg-secondary bg-opacity-50 bg-gradient py-1 sticky-top shadow-sm'>
      <Navbar className="sticky-top ">
        <Container className=''>
          <Navbar.Brand as={Link} to="/" className='fw-bold'>
            <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path> </svg>
            <span className='ms-1'>BookShelf</span>
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
              <Link to="/login" className='me-3' >
                <Image src={userAvatar} alt="user avatar " className='rounded-circle' width={45} height={45} />
              </Link>
            )}
            <Button variant="outline-dark fw-semibold" onClick={handleShow}>
              <i className='bi bi-cart pe-1' /><span className='d-none d-sm-inline-block'>Cart</span>{cartItems?.length > 0 && <span className='ps-1'>{`${cartItems?.length > 0 ? cartItems?.length : '0'}`}</span>}
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping cart</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {cartItems?.length > 0 ?
                  <ListGroup variant="flush">
                    {cartItems.map((product) => (
                      <ListGroup.Item key={product._id} className='px-0'>
                        <Figure className='mb-0 d-flex gap-2'>
                          <div className="flex-shrink-0">
                            <Figure.Image
                              width={100}
                              height={100}
                              alt={product.title}
                              src={getImgUrl(product.coverImage)}
                              className='mb-0 flex-shrink-0 img-fluid object-fit-cover'
                            />
                          </div>
                          <div className='flex-grow-1'>
                            <p className='fw-semibold mb-0'>{product.title}</p>
                            <p className='mb-0 text-capitalize'><small className='fw-semibold'>Category:</small> {product.category}</p>
                            <div className='d-flex justify-content-between'>
                              <p className='mb-0'><small className='fw-semibold'>Qty:</small> {product.quantity}</p>
                              <p className='fw-semibold mb-0'>${product.newPrice * product.quantity}</p>
                            </div>
                            <Button size='sm' variant='danger' className='mt-2' onClick={() => handleRemoveFromCart(product)}>Remove</Button>
                          </div>
                        </Figure>
                      </ListGroup.Item>
                    ))}
                    <div className='d-flex gap-2'>
                      <div>
                        <p className='fw-semibold mb-0'>Subtotal</p>
                        <small className='text-muted'>Shipping and taxes calculated at checkout</small>
                      </div>
                      <p>
                        <span className='fs-6 text-muted fw-semibold'>${totalPrice}</span>
                      </p>
                    </div>
                    <div className='d-flex gap-2'>
                      <Button className='w-100' onClick={() => handleClearCart()}>
                        Clear Cart
                      </Button>
                      <Button as={Link} type='button' to="/checkout" className='w-100'>
                        Checkout
                      </Button>
                    </div>
                  </ListGroup>
                  :
                  <p>Currently! there is no item in the cart.</p>
                }
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </Container>
      </Navbar>
    </header >
  )
}
export default Header