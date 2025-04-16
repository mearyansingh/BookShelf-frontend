import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const Footer = () => {

   return (
      <footer className="bg-dark text-white-50 bg-gradient">
         <Container className="d-flex flex-wrap justify-content-between align-items-center py-3 bg border-top">
            <p className="col-md-4 mb-0 text-white-50">© 2025 Company, Inc</p>
            <Link to="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
               <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path> </svg>
            </Link>
            <p className="mb-0">Made with ❤️ by <a className="fw-semibold" href='https://devaryan.me'>devaryan</a></p>
         </Container>
      </footer>
   )
}

export default Footer