import { Button, Card, Container, Dropdown, Image, Navbar, Offcanvas } from 'react-bootstrap'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

const DashboardLayout = () => {
   const navigate = useNavigate()

   const handleLogout = () => {
      localStorage.removeItem('token');
      navigate("/")
   }

   return (
      <>
         {/* {loading && <div>Loading...</div>} */}
         <Navbar expand={false} className="bg-body-tertiary mb-3">
            <Container fluid>
               <Navbar.Brand as={Link} to="/">
                  <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path> </svg>
                  <span className='fw-bold ms-1'>BookShelf</span>
               </Navbar.Brand>
               <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
               <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-false`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                  placement="end"
                  style={{ width: "250px" }}
               >
                  <Offcanvas.Header closeButton className='bg-body-tertiary'>
                     <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                        <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path> </svg>
                        <span className='fw-bold ms-1 fs-6'>BookShelf</span>
                     </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body className="d-flex flex-column">
                     {/* <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: "280px" }}> */}
                     {/* <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                           <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                           <span className="fs-4">Sidebar</span>
                        </a>
                        <hr /> */}
                     <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                           <a href="#" className="nav-link" aria-current="page">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder me-1" viewBox="0 0 16 16">
                                 <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z" />
                              </svg>
                              Folders
                           </a>
                        </li>
                        <li>
                           <NavLink to="/dashboard" className="nav-link link-body-emphasis">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart-fill me-1" viewBox="0 0 16 16">
                                 <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                              </svg>
                              Dashboard
                           </NavLink>
                        </li>
                        <li>
                           <NavLink to="/dashboard/add-new-book" className="nav-link link-body-emphasis">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-1 bi bi-journal-plus" viewBox="0 0 16 16">
                                 <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" />
                                 <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                                 <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                              </svg>
                              Add Book
                           </NavLink>
                        </li>
                        <li>
                           <NavLink to="/dashboard/manage-books" className="nav-link link-body-emphasis">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-files me-1" viewBox="0 0 16 16">
                                 <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1M3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
                              </svg>
                              Documents
                           </NavLink>
                        </li>
                     </ul>
                     <hr />
                     <Dropdown drop="up">
                        <Dropdown.Toggle as="button" className='w-100 px-0 text-start border-0 bg-transparent fw-bold' variant="success" id="dropdown-basic">
                           <Image fluid src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                           Admin
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='w-100 shadow-lg border-0'>
                           <Dropdown.Item as="button" onClick={handleLogout}><i className="bi bi-box-arrow-left me-1"></i>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>
                     {/* </div> */}
                  </Offcanvas.Body>
               </Navbar.Offcanvas>
            </Container>
         </Navbar>
         <Container fluid>
            <Card className='shadow-sm border-light-subtle'>
               <Card.Body className='d-flex gap-2 flex-wrap justify-content-between'>
                  <div>
                     <h3 className='mb-0'>Dashboard</h3>
                     <small>Book store inventory</small>
                  </div>
                  <div className='d-lg-flex  gap-2 align-items-start mt-2 mt-sm-0'>
                     {location.pathname !== "/dashboard/manage-books" ? <Button className='' as={Link} to="/dashboard/manage-books"><i className="bi bi-pencil me-1"></i>Manage Books</Button> : null}
                     {location.pathname !== "/dashboard/add-new-book" ? <Button className='mt-2 mt-sm-0' as={Link} to="/dashboard/add-new-book"><i className="bi bi-plus-lg me-1"></i>Add New Book</Button> : null}
                  </div>
               </Card.Body>
            </Card>
            <Outlet />
         </Container>
      </>
   )
}

export default DashboardLayout