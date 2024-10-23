import bannerImg from '../assets/banner.png'
import News from '../Components/News'
import Recommended from '../Components/Recommended'
import TopSellers from '../Components/TopSellers'

const Home = () => {

   return (
      <>
         <section className="bg-light py-5">
            <div className="container">
               <div className="row py-8 align-items-center">
                  <div className="col-xl-5 col-lg-5">
                     <div>
                        <span className="text-primary fw-semibold">Welcome to the Geeks Abroad Study</span>
                        <h1 className="display-3 my-3">New release this week</h1>
                        <p className="mb-5 fs-3">It&apos;s time to upgrade your list with some of the latest and greatest releases in the literary world. From heart pumping thrillers to captivating memoirs, this week&apos;s new releases offer something for everyone.</p>
                        <a href="#" className="btn btn-primary btn-lg">Subscribe</a>
                     </div>
                  </div>
                  <div className="offset-xl-1 col-xl-6 col-lg-7 d-flex justify-content-center">
                     <img src={bannerImg} alt="" className="img-fluid" />
                  </div>
               </div>
            </div>
         </section >
         <section className="py-lg-16 py-5">
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
         </section>
         <TopSellers />
         <Recommended />
         <News />
      </>
   )
}

export default Home