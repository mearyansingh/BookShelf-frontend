import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import news1 from "../assets/news/news-1.png"
import news2 from "../assets/news/news-2.png"
import news3 from "../assets/news/news-3.png"
import news4 from "../assets/news/news-4.png"

const news = [
   {
      "id": 1,
      "title": "Global Climate Summit Calls for Urgent Action",
      "description": "World leaders gather at the Global Climate Summit to discuss urgent strategies to combat climate change, focusing on reducing carbon emissions and fostering renewable energy solutions.",
      "image": news1
   },
   {
      "id": 2,
      "title": "Breakthrough in AI Technology Announced",
      "description": "A major breakthrough in artificial intelligence has been announced by researchers, with new advancements promising to revolutionize industries from healthcare to finance.",
      "image": news2
   },
   {
      "id": 3,
      "title": "New Space Mission Aims to Explore Distant Galaxies",
      "description": "NASA has unveiled plans for a new space mission that will aim to explore distant galaxies, with hopes of uncovering insights into the origins of the universe.",
      "image": news3
   },
   {
      "id": 4,
      "title": "Stock Markets Reach Record Highs Amid Economic Recovery",
      "description": "Global stock markets have reached record highs as signs of economic recovery continue to emerge following the challenges posed by the global pandemic.",
      "image": news4
   },
   {
      "id": 5,
      "title": "Innovative New Smartphone Released by Leading Tech Company",
      "description": "A leading tech company has released its latest smartphone model, featuring cutting-edge technology, improved battery life, and a sleek new design.",
      "image": news2
   }
]

const News = () => {
   return (
      <section className="py-lg-16 py-5">
         <div className="container">
            <Row className="mb-4 align-items-center">
               <Col>
                  <div className="d-flex align-items-center">
                     <div className="bg-primary opacity-75" style={{ width: "5px", height: "24px", marginRight: "12px" }}></div>
                     <h2 className="mb-0 fw-bold">Latest News</h2>
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
                     slidesPerView: 1,
                     spaceBetween: 30,
                  },
                  768: {
                     slidesPerView: 2,
                     spaceBetween: 30,
                  },
                  1024: {
                     slidesPerView: 2,
                     spaceBetween: 30,
                  },
                  1080: {
                     slidesPerView: 3,
                     spaceBetween: 50,
                  },
               }}
               className="news-swiper"
            >
               {news.length > 0 && news.map((item) => (
                  <SwiperSlide key={item.id}>
                     <Card className="border-0 card-hover w-100 h-100">
                        <div className="row g-0">
                           <div className="col-12 col-lg-4 overflow-hidden ">
                              <Image
                                 src={item.image}
                                 alt={item.title}
                                 className="img-fluid h-100 object-fit-cover rounded-start"
                              // style={{ maxHeight: "240px" }}
                              />
                           </div>
                           <div className="col-12 col-lg-8">
                              <div className="card-body d-flex flex-column h-100 p-4">
                                 <div className="small text-muted mb-2">April 10, 2025</div>
                                 <h3 className="card-title h5 mb-3">
                                    <a href="#" className="text-decoration-none text-dark stretched-link">
                                       {item.title}
                                    </a>
                                 </h3>
                                 <p className="card-text text-muted mb-0 fs-6">{item.description}</p>
                              </div>
                           </div>
                        </div>
                     </Card>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </section>
   )
}

export default News