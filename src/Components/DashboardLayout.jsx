import { useEffect, useState } from 'react';
import { Badge, Button, Card, Container, Dropdown, Image, Navbar, Offcanvas } from 'react-bootstrap'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const DashboardLayout = () => {
   const navigate = useNavigate()
   const location = useLocation();

   //Initial state
   const [pageTitle, setPageTitle] = useState('Dashboard');

   // Update page title based on current route
   useEffect(() => {
      const path = location.pathname;
      if (path === '/dashboard') setPageTitle('Dashboard');
      else if (path.includes('add-new-book')) setPageTitle('Add New Book');
      else if (path.includes('manage-books')) setPageTitle('Manage Books');
   }, [location.pathname]);

   //Function to handle logout
   const handleLogout = () => {
      localStorage.removeItem('token');
      navigate("/")
      toast.success('Admin logout successfully!')
   }

   return (
      <>
         <section className="dashboard-wrapper bg-light min-vh-100 d-flex flex-column">
            {/* Top Navigation */}
            <Navbar expand={false} variant="dark" className="bg-primary shadow-sm" sticky="top">
               <Container fluid className="px-3 px-md-4">
                  <Navbar.Brand as={Link} to="/dashboard" className="d-flex align-items-center">
                     <svg id="logo-35" width="40" height="32" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#ffffff"></path>
                        <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#f0f0f0"></path>
                     </svg>
                     <span className="fw-bold ms-2 fs-5 text-white">BookShelf</span>
                  </Navbar.Brand>

                  {/* Mobile Menu Toggle */}
                  <div className="d-flex align-items-center">
                     <Badge bg="light" text="primary" className="d-none d-md-block me-3 py-2 px-3">
                        <i className="bi bi-person-fill me-1"></i>Admin
                     </Badge>
                     <Navbar.Toggle
                        className="border-0 shadow-none"
                        aria-controls="dashboardOffcanvasNav"
                     >
                        <i className="bi bi-list fs-4 text-white"></i>
                     </Navbar.Toggle>
                  </div>
                  {/* Sidebar Navigation */}
                  <Navbar.Offcanvas
                     id="dashboardOffcanvasNav"
                     aria-labelledby="dashboardOffcanvasNavLabel"
                     placement="end"
                     className="dashboard-sidebar"
                     style={{ maxWidth: "280px" }}
                  >
                     <Offcanvas.Header closeButton className="bg-primary text-white">
                        <Offcanvas.Title id="dashboardOffcanvasNavLabel" className="d-flex align-items-center">
                           <svg id="logo-sidebar" width="30" height="24" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#ffffff"></path>
                              <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#f0f0f0"></path>
                           </svg>
                           <span className="fw-bold fs-6 ms-2">BookShelf Admin</span>
                        </Offcanvas.Title>
                     </Offcanvas.Header>
                     <Offcanvas.Body className="d-flex flex-column p-0">
                        {/* Admin Profile Card */}
                        <div className="admin-profile p-3 bg-light border-bottom">
                           <div className="d-flex align-items-center mb-3">
                              <Image
                                 src="https://github.com/mdo.png"
                                 alt="Admin"
                                 width="50"
                                 height="50"
                                 className="rounded-circle border border-2 border-white shadow-sm"
                              />
                              <div className="ms-3">
                                 <h6 className="mb-0 fw-bold">Admin User</h6>
                                 <span className="text-muted small">Administrator</span>
                              </div>
                           </div>
                           <Button
                              variant="outline-primary"
                              size="sm"
                              className="w-100"
                              onClick={handleLogout}
                           >
                              <i className="bi bi-box-arrow-right me-2"></i>Logout
                           </Button>
                        </div>
                        {/* Navigation Menu */}
                        <div className="sidebar-menu p-2">
                           <span className="text-uppercase small fw-bold text-muted px-3 mb-2 d-block">
                              Main Menu
                           </span>
                           <ul className="nav nav-pills flex-column mb-auto">
                              <li className="nav-item mb-1">
                                 <NavLink
                                    to="/dashboard"
                                    end
                                    className={({ isActive }) =>
                                       `nav-link rounded-3 d-flex align-items-center ${isActive ? 'active' : 'text-dark'}`
                                    }
                                 >
                                    <i className="bi bi-grid-1x2-fill me-2"></i>
                                    Dashboard
                                 </NavLink>
                              </li>
                              <li className="nav-item mb-1">
                                 <NavLink
                                    to="/dashboard/add-new-book"
                                    className={({ isActive }) =>
                                       `nav-link rounded-3 d-flex align-items-center ${isActive ? 'active' : 'text-dark'}`
                                    }
                                 >
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Add Book
                                 </NavLink>
                              </li>
                              <li className="nav-item mb-1">
                                 <NavLink
                                    to="/dashboard/manage-books"
                                    className={({ isActive }) =>
                                       `nav-link rounded-3 d-flex align-items-center ${isActive ? 'active' : 'text-dark'}`
                                    }
                                 >
                                    <i className="bi bi-collection me-2"></i>
                                    Manage Books
                                 </NavLink>
                              </li>
                              <li className="nav-item mb-1">
                                 <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                       `nav-link rounded-3 d-flex align-items-center ${isActive ? 'active' : 'text-dark'}`
                                    }
                                 >
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Back to BookShelf
                                 </NavLink>
                              </li>
                           </ul>
                           <hr className="my-3" />
                           <span className="text-uppercase small fw-bold text-muted px-3 mb-2 d-block">
                              Help & Settings
                           </span>
                           <ul className="nav nav-pills flex-column">
                              <li className="nav-item">
                                 <Link to="#" className="nav-link text-dark rounded-3 d-flex align-items-center">
                                    <i className="bi bi-gear me-2"></i>
                                    Settings
                                 </Link>
                              </li>
                              <li className="nav-item">
                                 <Link to="#" className="nav-link text-dark rounded-3 d-flex align-items-center">
                                    <i className="bi bi-question-circle me-2"></i>
                                    Help Center
                                 </Link>
                              </li>
                           </ul>
                        </div>
                        {/* Footer */}
                        <div className="sidebar-footer mt-auto p-3 border-top">
                           <div className="d-flex justify-content-between align-items-center">
                              <span className="text-muted small">BookShelf v1.0</span>
                              <a href="#" className="text-decoration-none small text-primary">Feedback</a>
                           </div>
                        </div>
                     </Offcanvas.Body>
                  </Navbar.Offcanvas>
               </Container>
            </Navbar>
            {/* Main Content Area */}
            <div className="dashboard-content flex-grow-1 py-4">
               <Container fluid className="px-3 px-md-4">
                  {/* Page Header */}
                  <Card className="border-0 bg-white shadow-sm mb-4">
                     <Card.Body className="d-flex flex-wrap gap-3 justify-content-between align-items-center py-3">
                        <div>
                           <h4 className="mb-0 fw-bold text-primary">{pageTitle}</h4>
                           <div className="text-muted small">
                              <i className="bi bi-calendar3 me-2"></i>
                              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                           </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                           {location.pathname !== "/dashboard/manage-books" && (
                              <Button
                                 variant="outline-primary"
                                 size="sm"
                                 as={Link}
                                 to="/dashboard/manage-books"
                                 className="d-flex align-items-center"
                              >
                                 <i className="bi bi-table me-2"></i>Manage Books
                              </Button>
                           )}
                           {location.pathname !== "/dashboard/add-new-book" && (
                              <Button
                                 variant="primary"
                                 size="sm"
                                 as={Link}
                                 to="/dashboard/add-new-book"
                                 className="d-flex align-items-center"
                              >
                                 <i className="bi bi-plus-lg me-2"></i>Add Book
                              </Button>
                           )}
                        </div>
                     </Card.Body>
                  </Card>
                  {/* Dynamic Content */}
                  <Outlet />
               </Container>
            </div>
         </section>
      </>
   )
}

export default DashboardLayout