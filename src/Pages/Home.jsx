import { Col, Container, InputGroup, Row, Form, Button } from 'react-bootstrap'
import News from '../Components/News'
import Recommended from '../Components/Recommended'
import TopSellers from '../Components/TopSellers'

const Home = () => {

  return (
    <>
      <section className="hero-section py-5 overflow-hidden">
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">Discover Your Next Favorite Book</h1>
              <p className="lead text-muted mb-4">
                Explore thousands of titles across all genres. From bestsellers to rare finds,
                your literary journey begins here.
              </p>
              <InputGroup className="mb-4 shadow-sm">
                <Form.Control
                  placeholder="Search by title, author or genre"
                  aria-label="Search books"
                  className="py-3"
                />
                <Button variant="primary" className="px-4 d-inline-flex align-items-center">
                  <i className='bi bi-search fs-5' size={20} /> <span className='ps-2 d-none d-sm-block'> Search</span>
                </Button>
              </InputGroup>
              <div className="d-flex flex-wrap gap-3">
                <Button variant="primary" size="lg" className="px-4">
                  Browse Books
                </Button>
                <Button variant="outline-dark" size="lg" className="px-4">
                  Join Now
                </Button>
              </div>
              <div className="d-flex mt-4 text-muted">
                <div className="me-4 d-flex flex-column flex-sm-row align-items-center text-center">
                  <i className="bi bi-book me-2" /><span>50,000+ Books</span>
                </div>
                <div className="me-4 d-flex flex-column flex-sm-row align-items-center text-center">
                  <i className="bi bi-bag me-2" /><span>Free Delivery</span>
                </div>
                <div className="d-flex flex-column flex-sm-row align-items-center text-center">
                  <i className="bi bi-star me-2" /><span>Exclusive Content</span>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="position-relative">
                <div className="hero-image-container shadow-lg"
                  style={{
                    height: '500px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transform: 'perspective(1000px) rotateY(-10deg)',
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
                  }}>
                  <img
                    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
                    alt="BookShelf Hero Image"
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    className='d-flex flex-column justify-content-end position-absolute top-0 left-0 w-100 h-100'
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
                      padding: '2rem'
                    }}>
                    <h3 className="text-white mb-2">Spring Reading Collection</h3>
                    <p className="text-white text-opacity-75 mb-3">Curated picks to inspire your next reading adventure</p>
                    <Button variant="light" className="align-self-start">
                      Explore Collection
                    </Button>
                  </div>
                </div>
                <div
                  className="position-absolute bg-white d-flex flex-column justify-content-center align-items-center z-2"
                  style={{
                    bottom: '-40px',
                    right: '-20px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  }}>
                  <span className="display-4 fw-bold text-primary mb-0">25%</span>
                  <span className="text-muted">Discount</span>
                  <span className="small text-muted">For New Members</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section >
      <TopSellers />
      <Recommended />
      <News />
    </>
  )
}

export default Home