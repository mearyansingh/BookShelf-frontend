import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Col, Container, Image, Row, Badge } from 'react-bootstrap'
import { getBaseUrl } from '../Helpers'
import RevenueChart from '../Components/RevenueChart'
import Loader from '../Components/Loader'

const Dashboard = () => {
  //Initial state
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  //Lifecycle method
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
        })
        setData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  //Show loader
  if (loading) return <Loader />

  return (
    <Container fluid className="px-0 bg-light">
      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col xs={12} md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="flex-shrink-0 rounded-circle bg-primary bg-opacity-10 p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-box-seam fs-4 text-primary"></i>
              </div>
              <div className="flex-grow-1">
                <h3 className="mb-0 fw-bold">{data?.totalBooks || 0}</h3>
                <p className="text-muted mb-0">Products</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="flex-shrink-0 rounded-circle bg-success bg-opacity-10 p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-currency-dollar fs-4 text-success"></i>
              </div>
              <div className="flex-grow-1">
                <h3 className="mb-0 fw-bold">${data?.totalSales || 0}</h3>
                <p className="text-muted mb-0">Total Sales</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="flex-shrink-0 rounded-circle bg-info bg-opacity-10 p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-graph-up-arrow fs-4 text-info"></i>
              </div>
              <div className="flex-grow-1">
                <h3 className="mb-0 fw-bold">
                  {data?.trendingBooks || 0}
                  {data?.trendingBooks && <small className="text-success ms-2">(13%)</small>}
                </h3>
                <p className="text-muted mb-0">Trending Books</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="flex-shrink-0 rounded-circle bg-warning bg-opacity-10 p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-bag-check fs-4 text-warning"></i>
              </div>
              <div className="flex-grow-1">
                <h3 className="mb-0 fw-bold">{data?.totalOrders || 0}</h3>
                <p className="text-muted mb-0">Total Orders</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Charts and Lists */}
      <Row className="g-4">
        {/* Chart Section */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Monthly Orders</h5>
            </Card.Header>
            <Card.Body>
              <RevenueChart />
            </Card.Body>
          </Card>

          {/* Small Stats Cards */}
          <Row className="g-4">
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="d-flex align-items-center">
                  <div className="rounded-circle bg-danger bg-opacity-10 p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-hourglass-split fs-4 text-danger"></i>
                  </div>
                  <div>
                    <h3 className="mb-0 fw-bold">02</h3>
                    <p className="text-muted mb-0">Orders Pending</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="d-flex align-items-center">
                  <div className="flex-shrink-0 rounded-circle bg-secondary bg-opacity-10 p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-eye fs-4 text-secondary"></i>
                  </div>
                  <div className="flex-grow-1" >
                    <h3 className="mb-0 fw-bold">139</h3>
                    <p className="text-muted mb-0">Website Visits (24h)</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        {/* Top Users List */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3 border-0">
              <h5 className="mb-0 fw-bold">Top Customers</h5>
              <Badge bg="light" text="dark" className="d-flex align-items-center">
                <i className="bi bi-sort-down me-1"></i> Highest Orders
              </Badge>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
                <ul className="list-group list-group-flush">
                  {[
                    { name: "Annette Watson", image: "https://randomuser.me/api/portraits/women/82.jpg", value: 9.3 },
                    { name: "Calvin Steward", image: "https://randomuser.me/api/portraits/men/81.jpg", value: 8.9 },
                    { name: "Ralph Richards", image: "https://randomuser.me/api/portraits/men/80.jpg", value: 8.7 },
                    { name: "Bernard Murphy", image: "https://randomuser.me/api/portraits/men/79.jpg", value: 8.2 },
                    { name: "Arlene Robertson", image: "https://randomuser.me/api/portraits/women/78.jpg", value: 8.2 },
                    { name: "Jane Lane", image: "https://randomuser.me/api/portraits/women/77.jpg", value: 8.1 },
                    { name: "Pat Mckinney", image: "https://randomuser.me/api/portraits/men/76.jpg", value: 7.9 },
                    { name: "Norman Walters", image: "https://randomuser.me/api/portraits/men/75.jpg", value: 7.7 },
                  ].map((user, index) => (
                    <li key={index} className="list-group-item border-0 py-3">
                      <div className="d-flex align-items-center">
                        <Image
                          src={user.image}
                          width={45}
                          height={45}
                          roundedCircle
                          className="me-3 border"
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-0">{user.name}</h6>
                          <small className="text-muted">Customer</small>
                        </div>
                        <Badge bg="success" pill className="px-2 py-1">
                          {user.value}
                        </Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* Student Types Section */}
        <Col md={12} lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Student Types</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-column gap-3">
                {[
                  { type: "Full-time", count: 64, color: "primary" },
                  { type: "Part-time", count: 28, color: "info" },
                  { type: "Distance", count: 8, color: "success" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="d-flex justify-content-between mb-1">
                      <span>{item.type}</span>
                      <span>{item.count}%</span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className={`progress-bar bg-${item.color}`}
                        role="progressbar"
                        style={{ width: `${item.count}%` }}
                        aria-valuenow={item.count}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard