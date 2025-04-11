import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Card, Col, Image, Row } from 'react-bootstrap'
import { getBaseUrl } from '../Helpers'
import RevenueChart from '../Components/RevenueChart'

const Dashboard = () => {
   const [loading, setLoading] = useState(true)
   const [data, setData] = useState({})
   console.log(data, "stats/data")

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
            console.log('Error:', error)
            setLoading(false)
         }
      }
      fetchData()
   }, [])

   return (
      <>
         {loading && <div>Loading...</div>}
         <Row className='mt-4'>
            <Col>
               <Card className="shadow-sm border-light-subtle card-hover">
                  <div className="d-flex justify-content-between align-items-center p-4">
                     <div className="d-flex">
                        <i className='bi bi-stack' />
                        <div className="ms-3">
                           <h4 className="mb-1">
                              {data?.totalBooks}
                           </h4>
                           <small>Products</small>
                        </div>
                     </div>
                  </div>
               </Card>
            </Col>
            <Col>
               <Card className="shadow-sm border-light-subtle card-hover">
                  <div className="d-flex justify-content-between align-items-center p-4">
                     <div className="d-flex">
                        <i />
                        <div className="ms-3">
                           <h4 className="mb-1">
                              ${data?.totalSales}
                           </h4>
                           <small>Total Sales</small>
                        </div>
                     </div>
                  </div>
               </Card>
            </Col>
            <Col>
               <Card className="shadow-sm border-light-subtle card-hover">
                  <div className="d-flex justify-content-between align-items-center p-4">
                     <div className="d-flex">
                        <i />
                        <div className="ms-3">
                           <h4 className="mb-1">
                              {data?.trendingBooks}
                              <small>(13%)</small>
                           </h4>
                           <small>Trending Books in this month</small>
                        </div>
                     </div>
                  </div>
               </Card>
            </Col>
            <Col>
               <Card className="shadow-sm border-light-subtle card-hover">
                  <div className="d-flex justify-content-between align-items-center p-4">
                     <div className="d-flex">
                        <i />
                        <div className="ms-3">
                           <h4 className="mb-1">
                              {data?.totalOrders}
                           </h4>
                           <small>Total Orders</small>
                        </div>
                     </div>
                  </div>
               </Card>
            </Col>
         </Row>
         <Row className='mt-4'>
            <Col>
               <Card className="shadow-sm border-light-subtle card-hover">
                  <Card.Header>The number of orders per month</Card.Header>
                  <Card.Body>
                     <RevenueChart />
                  </Card.Body>
               </Card>
               <Row className='mt-4'>
                  <Col>
                     <Card className="shadow-sm border-light-subtle card-hover">
                        <div className="d-flex justify-content-between align-items-center p-4">
                           <div className="d-flex">
                              <i />
                              <div className="ms-3">
                                 <h4 className="mb-1">
                                    02
                                 </h4>
                                 <small>Orders left</small>
                              </div>
                           </div>
                        </div>
                     </Card>
                  </Col>
                  <Col >
                     <Card className="shadow-sm border-light-subtle card-hover">
                        <div className="d-flex justify-content-between align-items-center p-4">
                           <div className="d-flex">
                              <i />
                              <div className="ms-3">
                                 <h4 className="mb-1">
                                    139
                                 </h4>
                                 <small>Website visits (last day)</small>
                              </div>
                           </div>
                        </div>
                     </Card>
                  </Col>
               </Row>
            </Col>
            <Col lg={3}>
               <Card className="shadow-sm border-light-subtle card-hover">
                  <Card.Header>
                     Users by average order
                     <Button variant='link' >
                        Descending
                     </Button>
                  </Card.Header>
                  <Card.Body className='p-0'>
                     <div className="overflow-y-auto" style={{ maxHeight: '24rem' }}>
                        <ul className="p-3 list-unstyled">
                           <li className="d-flex align-items-center mb-2">
                              <div className="me-2 rounded-circle overflow-hidden">
                                 <Image fluid src="https://randomuser.me/api/portraits/women/82.jpg" width={50} height={50} alt="Annette Watson profile picture" />
                              </div>
                              <span className="text-gray-600">Annette Watson</span>
                              <span className="ms-auto fw-semibold">9.3</span>
                           </li>
                           <li className="d-flex align-items-center mb-2">
                              <div className="me-2 rounded-circle overflow-hidden">
                                 <Image fluid src="https://randomuser.me/api/portraits/men/81.jpg" width={50} height={50} alt="Calvin Steward profile picture" />
                              </div>
                              <span className="text-gray-600">Calvin Steward</span>
                              <span className="ms-auto fw-semibold">8.9</span>
                           </li>
                           <li className="d-flex align-items-center mb-2">
                              <div className="me-2 rounded-circle overflow-hidden">
                                 <Image fluid src="https://randomuser.me/api/portraits/men/80.jpg" width={50} height={50} alt="Ralph Richards profile picture" />
                              </div>
                              <span className="text-gray-600">Ralph Richards</span>
                              <span className="ms-auto fw-semibold">8.7</span>
                           </li>
                           <li className="d-flex align-items-center mb-2">
                              <div className="me-2 rounded-circle overflow-hidden">
                                 <Image fluid src="https://randomuser.me/api/portraits/men/79.jpg" width={50} height={50} alt="Bernard Murphy profile picture" />
                              </div>
                              <span className="text-gray-600">Bernard Murphy</span>
                              <span className="ms-auto fw-semibold">8.2</span>
                           </li>
                           <li className="d-flex align-items-center mb-2">
                              <div className="me-2 rounded-circle overflow-hidden">
                                 <Image fluid src="https://randomuser.me/api/portraits/women/78.jpg" width={50} height={50} alt="Arlene Robertson profile picture" />
                              </div>
                              <span className="text-gray-600">Arlene Robertson</span>
                              <span className="ms-auto fw-semibold">8.2</span>
                           </li>
                           <li className="d-flex align-items-center mb-2">
                              <div className="me-2 rounded-circle overflow-hidden">
                                 <Image fluid src="https://randomuser.me/api/portraits/women/77.jpg" width={50} height={50} alt="Jane Lane profile picture" />
                              </div>
                              <span className="text-gray-600">Jane Lane</span>
                              <span className="ms-auto fw-semibold">8.1</span>
                           </li>
                           <li className="d-flex align-items-center mb-2">
                              <div className="me-2 rounded-circle overflow-hidden">
                                 <Image fluid src="https://randomuser.me/api/portraits/men/76.jpg" width={50} height={50} alt="Pat Mckinney profile picture" />
                              </div>
                              <span className="text-gray-600">Pat Mckinney</span>
                              <span className="ms-auto fw-semibold">7.9</span>
                           </li>
                           <li className="d-flex align-items-center mb-2">
                              <div className="me-2 rounded-circle overflow-hidden">
                                 <Image fluid src="https://randomuser.me/api/portraits/men/75.jpg" width={50} height={50} alt="Norman Walters profile picture" />
                              </div>
                              <span className="text-gray-600">Norman Walters</span>
                              <span className="ms-auto fw-semibold">7.7</span>
                           </li>
                        </ul>
                     </div>
                  </Card.Body>
               </Card>
            </Col>
            <Col lg={3}>
               <Card className="shadow-sm border-light-subtle card-hover">
                  <Card.Header>Students by type of studying </Card.Header>
                  <Card.Body>

                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </>
   )
}

export default Dashboard