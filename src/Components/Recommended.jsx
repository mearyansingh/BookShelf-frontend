import { useEffect, useState } from "react"
import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { getImgUrl } from '../Helpers';
import { useFetchAllBooksQuery } from "../Store/bookApi";

const Recommended = () => {

   const { data: books = [] } = useFetchAllBooksQuery()

   return (
      <section className="py-5">
         <div className="container">
            <h2>Recommended for you</h2>
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
                  1080: {
                     slidesPerView: 3,
                     spaceBetween: 50,
                  },
               }}
               className="mySwiper"
            >
               {books.length > 0 && books.slice(8, 18).map((book) => (
                  <SwiperSlide key={book._id}>
                     <Card as={Link} to={`/books/${book._id}`} className="text-decoration-none shadow-sm">
                        <Card.Img src={getImgUrl(book.coverImage)} className="card-img-top" width="100%" height="225" />
                        <Card.Body className="">
                           <h5>{book.title}</h5>
                           <Badge>{book.category}</Badge>
                           {book.trending && <Badge>Trending</Badge>}
                           <p className="card-text">{book.description.length > 80 ? `${book.description.slice(0, 89)}...` : book.description}</p>
                           <p>${book.newPrice}<span className='ms-2 text-decoration-line-through'>${book.oldPrice}</span></p>
                           <Button>Add to Cart</Button>
                        </Card.Body>
                     </Card>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </section>
   )
}

export default Recommended