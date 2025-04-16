import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Badge, Button, Card, Container, Row, Col, Tabs, Tab, ListGroup, Form, InputGroup, Image, ProgressBar } from 'react-bootstrap'
import { getImgUrl } from '../Helpers'
import { useFetchBookByIdQuery } from '../Store/bookApi'
import { addToCart } from '../Store/cartSlice'
import Loader from '../Components/Loader'
//Review Data
const reviews = [
  { id: 1, user: "Emma W.", rating: 5, comment: "This story broke my heart and put it back together. Absolutely brilliant.", date: "March 12, 2025" },
  { id: 2, user: "Michael T.", rating: 4, comment: "A beautiful, poignant story that stays with you.", date: "February 28, 2025" }
];
const Book = () => {
  const { id } = useParams()
  //RTK QUERY
  const { data: book, isLoading, isError, refetch } = useFetchBookByIdQuery(id, {
    skip: !id,
  })

  //HOOKS
  const dispatch = useDispatch()

  //Initial state
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  //Add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  //Stateless variables
  const BOOK_RATING = 4.7
  const REVIEW_COUNT = 1842

  const discountPercentage = Math.round(((book?.oldPrice - book?.newPrice) / book?.oldPrice) * 100);

  //Lifecycle method
  useEffect(() => {
    // Fade in animation when component mounts
    const element = document.querySelector('.book-detail-container');
    if (element) {
      element.classList.add('fade-in');
    }
  }, []);

  isLoading && <Loader />
  isError && <p>Something went wrong. <Button onClick={refetch} type='button'>Try Again</Button></p>;

  return (
    <section className="py-lg-16 py-5">
      <Container className="book-detail-container">
        {(!isLoading && !isError && !book) ? (
          <Card className='order-card text-center border-light-subtle p-5'>
            <div className="py-5">
              <i className="bi bi-book text-muted empty-cart-icon" style={{ fontSize: '4rem' }}></i>
              <h3 className="mt-3">No orders found</h3>
              <p className="text-muted">Please try again later.</p>
            </div>
          </Card>
        ) : (
          <>
            <Row className="mb-4">
              <Col>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" className='text-decoration-none fw-semibold'>Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{book?.title}</li>
                  </ol>
                </nav>
              </Col>
            </Row>
            <Row className="main-content">
              <Col lg={5} className="book-image-section position-relative mb-4">
                <div className="image-container position-relative overflow-hidden rounded-3">
                  <Image
                    fluid
                    src={getImgUrl(book?.coverImage)}
                    alt={book?.title}
                    loading='lazy'
                    className="book-cover hover-zoom overflow-hidden w-100 object-fit-cover"
                  />
                  {book?.trending && (
                    <Badge bg="danger" className="trending-badge pulse">
                      Trending
                    </Badge>
                  )}
                </div>
              </Col>
              <Col lg={7}>
                <div className="book-info">
                  <h1 className="book-title fw-bold">{book?.title}</h1>
                  <div className="author-section mb-3">
                    <span className="text-muted">by </span>
                    <a href="#" className="author-link text-decoration-none fw-semibold">N/A</a>
                  </div>
                  <div className="rating-section d-flex align-items-center gap-2 mb-3">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        i < Math.floor(BOOK_RATING) ?
                          <i key={i} className="bi bi-star-fill text-warning" /> :
                          <i key={i} className="bi bi-star text-warning" />
                      ))}
                    </div>
                    <span className="rating-value fw-semibold">{BOOK_RATING}</span>
                    <span className="review-count text-secondary">({REVIEW_COUNT} reviews)</span>
                  </div>
                  <div className="price-section mb-4">
                    <span className="new-price h3 fw-bold">${book?.newPrice.toFixed(2)}</span>
                    <span className="old-price text-secondary fs-5 text-decoration-line-through">${book?.oldPrice.toFixed(2)}</span>
                    <Badge bg="success" className="discount-badge ms-2 align-middle">
                      {discountPercentage}% OFF
                    </Badge>
                  </div>
                  <p className="book-description lead mb-4">{book?.description}</p>
                  <Card className=" mb-4 bg-light shadow-sm border-0">
                    <Card.Body className='info-grid'>
                      <div className="info-item d-flex flex-column">
                        <span className="info-label text-secondary small">Publisher:</span>
                        <span className="info-value fw-semibold">N/A</span>
                      </div>
                      <div className="info-item d-flex flex-column">
                        <span className="info-label text-secondary small">Publication Date:</span>
                        <span className="info-value fw-semibold">N/A</span>
                      </div>
                      <div className="info-item d-flex flex-column">
                        <span className="info-label text-secondary small">Pages:</span>
                        <span className="info-value fw-semibold">N/A</span>
                      </div>
                      <div className="info-item d-flex flex-column">
                        <span className="info-label text-secondary small">Language:</span>
                        <span className="info-value fw-semibold">English</span>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card className="delivery-info bg-success-subtle border-0 mb-4">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-2">
                        <i className="text-success fs-5 me-2 bi bi-truck" />
                        <span className='text-success-emphasis'>Free delivery on orders over $35</span>
                      </div>
                      <div className="stock-status fw-semibold gap-2 d-flex align-items-center in-stock">
                        <div className="status-dot bg-success rounded-circle"></div>
                        <span className='text-success-emphasis'>In Stock - Ships within 24 hours</span>
                      </div>
                    </Card.Body>
                  </Card>
                  <div className="action-section d-flex align-items-center mb-4">
                    <Button
                      variant="primary"
                      size="lg"
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(book)}
                    >
                      <i className="me-2 bi bi-cart" />
                      Add to Cart
                    </Button>
                  </div>
                  <div className="share-section">
                    <Button variant="outline-secondary" size="sm" className="me-2">
                      <i className="me-1 bi bi-share" /> Share
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <i className="me-1 bi bi-bookmark-plus" /> Save for Later
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="detail-tabs mb-4 border-light-subtle"
                >
                  <Tab eventKey="description" title="Description">
                    <Card className="tab-content-card border-light-subtle">
                      <Card.Body>
                        <p className="mb-4 text-secondary">
                          {book?.description}
                        </p>
                      </Card.Body>
                    </Card>
                  </Tab>
                  <Tab eventKey="details" title="Book Details">
                    <Card className="tab-content-card border-light-subtle">
                      <Card.Body className=''>
                        <ListGroup variant="flush" className="book-details-list">
                          <ListGroup.Item className='border-light-subtle py-3 d-flex align-items-center justify-content-between'>
                            <span className="detail-label fw-semibold">Title:</span>
                            <span className="detail-value text-secondary">{book?.title}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className='border-light-subtle py-3 d-flex align-items-center justify-content-between'>
                            <span className="detail-label fw-semibold">Author:</span>
                            <span className="detail-value text-secondary">N/A</span>
                          </ListGroup.Item>
                          <ListGroup.Item className='border-light-subtle py-3 d-flex align-items-center justify-content-between'>
                            <span className="detail-label fw-semibold">Publisher:</span>
                            <span className="detail-value text-secondary">N/A</span>
                          </ListGroup.Item>
                          <ListGroup.Item className='border-light-subtle py-3 d-flex align-items-center justify-content-between'>
                            <span className="detail-label fw-semibold">Publication Date:</span>
                            <span className="detail-value text-secondary">N/A</span>
                          </ListGroup.Item>
                          <ListGroup.Item className='border-light-subtle py-3 d-flex align-items-center justify-content-between'>
                            <span className="detail-label fw-semibold">Pages:</span>
                            <span className="detail-value text-secondary">500</span>
                          </ListGroup.Item>
                          <ListGroup.Item className='border-light-subtle py-3 d-flex align-items-center justify-content-between'>
                            <span className="detail-label fw-semibold">Language:</span>
                            <span className="detail-value text-secondary">English</span>
                          </ListGroup.Item>
                          <ListGroup.Item className='border-light-subtle py-3 d-flex align-items-center justify-content-between'>
                            <span className="detail-label fw-semibold">Genre:</span>
                            <span className="detail-value text-secondary">Young Adult Fiction, Romance</span>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Tab>
                  <Tab eventKey="reviews" title={`Reviews (${reviews.length})`}>
                    <Card className="tab-content-card border-light-subtle">
                      <Card.Body className='p-4'>
                        <div className="reviews-summary mb-4">
                          <div className="overall-rating">
                            <h3>{BOOK_RATING}/5</h3>
                            <div className="stars">
                              {[...Array(5)].map((_, i) => (
                                i < Math.floor(BOOK_RATING) ?
                                  (<i key={i} className="text-warning bi bi-star-fill" />)
                                  :
                                  (<i key={i} className="text-warning bi bi-star" />)
                              ))}
                            </div>
                            <p className="text-muted">{REVIEW_COUNT} reviews</p>
                          </div>
                          <div className="rating-bars">
                            {[5, 4, 3, 2, 1].map(star => (
                              <div key={star} className="rating-bar-item">
                                <span className='fw-semibold'>{star} stars</span>
                                <ProgressBar
                                  animated
                                  variant="warning"
                                  now={star === 5 ? 75 : star === 4 ? 20 : 5}
                                />
                                <span className="percentage">{star === 5 ? '75%' : star === 4 ? '20%' : '5%'}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="reviews-list">
                          {reviews.map(review => (
                            <div key={review.id} className="review-item">
                              <div className="reviewer-info">
                                <div className="avatar">{review.user.charAt(0)}</div>
                                <div>
                                  <h5>{review.user}</h5>
                                  <div className="review-rating">
                                    {[...Array(5)].map((_, i) => (
                                      i < review.rating ?
                                        <i key={i} className="text-warning small-star bi bi-star-fill" /> :
                                        <i key={i} className="text-warning small-star bi bi-star" />
                                    ))}
                                    <span className="review-date ms-2">{review.date}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="review-text">{review.comment}</p>
                              <hr className='border-dark-subtle' />
                            </div>
                          ))}
                        </div>
                        <div className="write-review mt-4">
                          <h5>Write a Review</h5>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>Your Rating</Form.Label>
                              <div className="rating-input">
                                {[...Array(5)].map((_, i) => (
                                  <i key={i} className="bi bi-star rating-star text-warning" />
                                ))}
                              </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Your Review</Form.Label>
                              <Form.Control as="textarea" rows={3} placeholder="Share your thoughts about this book..." />
                            </Form.Group>
                            <Button variant="primary">Submit Review</Button>
                          </Form>
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <Card className="newsletter-card border-0 text-light mb-4">
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <h4>Subscribe for Updates</h4>
                        <p className="text-light text-opacity-75">
                          Get notified about new releases, author events, and exclusive promotions
                        </p>
                      </Col>
                      <Col md={4}>
                        <InputGroup>
                          <Form.Control
                            placeholder="Your email"
                            aria-label="Email address"
                          />
                          <Button variant="primary">
                            Subscribe
                          </Button>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </section >
  )
}

export default Book