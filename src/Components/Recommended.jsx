import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { getImgUrl } from '../Helpers';
import { useFetchAllBooksQuery } from "../Store/bookApi";

const Recommended = () => {

  const { data: books = [] } = useFetchAllBooksQuery()

  return (
    <section>
      <Container>
        {/* Section Header */}
        <Row className="mb-4 align-items-center">
          <Col>
            <div className="d-flex align-items-center">
              <div className="bg-primary opacity-75" style={{ width: "5px", height: "24px", marginRight: "12px" }}></div>
              <h2 className="mb-0 fw-bold">Recommended for you</h2>
            </div>
            <p className="text-muted mt-2">Discover the books everyone's talking about</p>
          </Col>
        </Row>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          modules={[Navigation]}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            }
          }}
          className="recommended-swiper"
        >
          {books.length > 0 && books.slice(8, 18).map((book) => (
            <SwiperSlide key={book._id}>
              <Card as={Link} to={`/books/${book._id}`} className="text-decoration-none h-100 border-0 shadow-sm book-card overflow-hidden">
                <div className="position-relative overflow-hidden border-0">
                  <Card.Img
                    variant="top"
                    src={getImgUrl(book.coverImage)}
                    className='overflow-hidden border-0 object-fit-cover'
                    width="100%"
                    style={{
                      height: "280px",
                      borderRadius: "8px 8px 0 0"
                    }}
                  />
                  {/* Category Badge */}
                  <Badge
                    bg="light"
                    text="dark"
                    className="position-absolute text-capitalize"
                    style={{ bottom: "15px", left: "15px" }}
                  >
                    {book.category}
                  </Badge>
                  {/* New Badge */}
                  {book.trending && (
                    <Badge
                      bg="primary"
                      className="position-absolute"
                      style={{ top: "15px", left: "15px" }}
                    >
                      Trending
                    </Badge>
                  )}
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold mb-2">{book.title}</Card.Title>
                  <small className="text-muted">
                    {book.description.length > 80 ? `${book.description.slice(0, 89)}...` : book.description}
                  </small>
                  <div className="d-flex align-items-center mb-3">
                    {book.oldPrice ? (
                      <>
                        <span className="fw-bold text-primary me-2">${book.newPrice}</span>
                        <span className="text-muted text-decoration-line-through">${book.oldPrice}</span>
                      </>
                    ) : (
                      <span className="fw-bold text-primary">${book.newPrice}</span>
                    )}
                    <small className="ms-auto text-muted">
                      In Stock
                    </small>
                  </div>
                  {/* Add to Cart Button */}
                  <Button
                    variant="primary"
                    className="w-100 d-flex align-items-center justify-content-center"
                    disabled={book.stock === 0}
                    onClick={(e) => handleAddToCart(e, book)}
                  >
                    <i className="bi bi-cart me-2" /> Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  )
}

export default Recommended