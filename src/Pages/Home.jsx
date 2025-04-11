import { Col, Container, InputGroup, Row, Form, Button } from 'react-bootstrap'
import bannerImg from '../assets/banner.png'
import News from '../Components/News'
import Recommended from '../Components/Recommended'
import TopSellers from '../Components/TopSellers'

const Home = () => {

  return (
    <>
      <section className="hero-section py-5"
        style={{
          backgroundColor: '#f8f9fa',
          backgroundImage: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderBottom: '1px solid #dee2e6'
        }}
      >
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
                  <i className='bi bi-search fs-5 pe-2' size={20} /> Search
                </Button>
              </InputGroup>
              <div className="d-flex gap-3">
                <Button variant="primary" size="lg" className="px-4">
                  Browse Books
                </Button>
                <Button variant="outline-dark" size="lg" className="px-4">
                  Join Now
                </Button>
              </div>

              <div className="d-flex mt-4 text-muted">
                <div className="me-4 d-flex align-items-center">
                  <i className="bi bi-book me-2" /> <span>50,000+ Books</span>
                </div>
                <div className="me-4 d-flex align-items-center">
                  <i className="bi bi-bag me-2" /> <span>Free Delivery</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-star me-2" /> <span>Exclusive Content</span>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="position-relative">
                <div className="hero-image-container shadow-lg" style={{
                  height: '500px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transform: 'perspective(1000px) rotateY(-10deg)',
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
                    alt="Bookstore Hero Image"
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2rem'
                  }}>
                    <h3 className="text-white mb-2">Spring Reading Collection</h3>
                    <p className="text-white text-opacity-75 mb-3">Curated picks to inspire your next reading adventure</p>
                    <Button variant="light" className="align-self-start">
                      Explore Collection
                    </Button>
                  </div>
                </div>
                <div className="position-absolute" style={{
                  bottom: '-20px',
                  right: '-20px',
                  width: '150px',
                  height: '150px',
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  zIndex: 2
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
      {/* <section className="py-lg-16 py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-6 mb-lg-0">
              <div className="">
                <h5 className="text-dark mb-4">
                  <i className="bi bi-check bg-success text-white rounded-circle me-2" />
                  Most trusted education platform
                </h5>
                <h1 className="display-3 fw-bold mb-3">New release this week</h1>
                <p className="pe-lg-10 mb-5">It&apos;s time to upgrade your list with some of the latest and greatest releases in the literary world. From heart pumping thrillers to captivating memoirs, this week&apos;s new releases offer something for everyone.</p>
                <a href="#" className="btn btn-primary">Subscribe</a>
              </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-center">
              <img src={bannerImg} alt="" className="img-fluid " />
            </div>
          </div>
        </div>
      </section> */}
      <TopSellers />
      <Recommended />
      <News />
    </>
  )
}

export default Home