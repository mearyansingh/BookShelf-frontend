import { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { getImgUrl } from '../Helpers';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Store/cartSlice';
import { useFetchAllBooksQuery } from '../Store/bookApi';

const bookCategories = [
   "Choose a genre", "Business", "Fiction", "Horror", "Adventure"
]

const TopSellers = () => {
   const [selectedCategory, setSelectedCategory] = useState('Choose a genre')
   const dispatch = useDispatch()

   // for query use {} //get request
   // for mutation use [] //post request
   const { data: books = [] } = useFetchAllBooksQuery()

   const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLocaleLowerCase())

   const handleAddToCart = (e, product) => {
      e.preventDefault(); // Prevent the Link navigation
      e.stopPropagation();
      dispatch(addToCart(product));
   };

   return (
      <>
         <section className="py-lg-16 py-5">
            <div className="container">
               <h2>Top sellers</h2>
               <Form.Select aria-label="Default select example" className='bg-secondary-subtle' onChange={(e) => setSelectedCategory(e.target.value)}>
                  {bookCategories.map((category, index) => (
                     <option key={index} value={category}>{category}</option>
                  ))}
               </Form.Select>
               {/* {console.log(selectedCategory)} */}
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
                  {filteredBooks.length > 0 && filteredBooks.map((book) => (
                     <SwiperSlide key={book._id}>
                        <Card as={Link} to={`/books/${book._id}`} className="text-decoration-none shadow-sm">
                           <Card.Img src={getImgUrl(book.coverImage)} className="card-img-top" width="100%" height="225" />
                           <Card.Body className="">
                              <h5>{book.title}</h5>
                              <Badge>{book.category}</Badge>
                              {book.trending && <Badge>Trending</Badge>}
                              <p className="card-text">{book.description.length > 80 ? `${book.description.slice(0, 89)}...` : book.description}</p>
                              <p>${book.newPrice}<span className='ms-2 text-decoration-line-through'>${book.oldPrice}</span></p>
                              <Button onClick={(e) => handleAddToCart(e, book)}>Add to Cart</Button>
                           </Card.Body>
                        </Card>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </section >
      </>
   )
}

export default TopSellers