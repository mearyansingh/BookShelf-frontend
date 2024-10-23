import React from 'react'
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
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../Helpers';

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
            <h2>News</h2>
            <Swiper
               slidesPerView={1}
               spaceBetween={30}
               modules={[Navigation]}
               navigation={true}
               breakpoints={{
                  640: {
                     slidesPerView: 1,
                     spaceBetween: 20,
                  },
                  768: {
                     slidesPerView: 2,
                     spaceBetween: 40,
                  },
                  1024: {
                     slidesPerView: 2,
                     spaceBetween: 50,
                  },
                  // 1080: {
                  //    slidesPerView: 3,
                  //    spaceBetween: 50,
                  // },
               }}
               className="mySwiper"
            >
               {news.length > 0 && news.map((item) => (
                  <SwiperSlide key={item.id}>
                     {/* <Card as={Link} to={`/books/${item.id}`} className="text-decoration-none shadow-sm">
                        <Card.Img src={item.image} className="card-img-top" width="100%" height="225" />
                        <Card.Body className="">
                           <h5>{item.title}</h5>
                           <p className="card-text">{item.description}</p>
                        </Card.Body>
                     </Card> */}
                     <Card className="card card-hover w-100 h-100">
                        <div className="row w-100 h-100 g-0">
                           <a className="col-12 col-md-12 col-xl-3 col-lg-3 bg-cover rounded-start  " href="#">
                              <Image fluid src={item.image} alt={item.title} className='object-fit-cover w-100 h-100' />
                           </a>
                           <div className="col-lg-9 col-md-12 col-12">
                              <div className="card-body">
                                 <h3 className="mb-2 text-truncate-line-2"><a href="#" className="text-inherit">{item.title}</a></h3>
                                 <p className="card-text">{item.description}</p>
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