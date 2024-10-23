import React from 'react'
import { Badge, Button, Card, Container } from 'react-bootstrap'
import { getImgUrl } from '../Helpers'
import { useFetchBookByIdQuery } from '../Store/bookApi'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../Store/cartSlice'

const Book = () => {
   const { id } = useParams()
   const { data: book, isLoading, isError } = useFetchBookByIdQuery(id)
   console.log(book)
   const dispatch = useDispatch()

   const handleAddToCart = (product) => {
      dispatch(addToCart(product));
   };

   return (
      <section className="py-lg-16 py-5">
         <Container>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error happening to load book info</p>}
            <Card className="card shadow-sm">
               <Card.Img src={getImgUrl(book?.coverImage)} className="card-img-top" width="100%" height="225" />
               <Card.Body className="">
                  <h5>{book?.title}</h5>
                  <Badge>{book?.category}</Badge>
                  {book?.trending && <Badge>Trending</Badge>}
                  <p className="card-text">{book?.description && book.description.length > 80 ? `${book.description.slice(0, 89)}...` : book?.description}</p>
                  <p>${book?.newPrice}<span className='ms-2 text-decoration-line-through'>${book?.oldPrice}</span></p>
                  <Button onClick={() => handleAddToCart(book)}>Add to Cart</Button>
               </Card.Body>
            </Card>
         </Container>
      </section >
   )
}

export default Book