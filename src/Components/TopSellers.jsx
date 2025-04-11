import { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useDispatch } from 'react-redux';
import { getImgUrl } from '../Helpers';
import { addToCart } from '../Store/cartSlice';
import { useFetchAllBooksQuery } from '../Store/bookApi';

const bookCategories = [
	"Choose a genre", "Business", "Fiction", "Horror", "Adventure"
]
const TopSellers = () => {
	//initial state
	const [selectedCategory, setSelectedCategory] = useState('Choose a genre')
	const [favorites, setFavorites] = useState({});
	const dispatch = useDispatch()

	// for query use {} //get request
	// for mutation use [] //post request
	const { data: books = [] } = useFetchAllBooksQuery()

	// Toggle favorite for a book
	const toggleFavorite = (bookId) => {
		setFavorites(prev => ({
			...prev,
			[bookId]: !prev[bookId]
		}));
	};

	// Calculate discount percentage
	const calculateDiscount = (original, discounted) => {
		if (!discounted) return 0;
		return Math.round(((original - discounted) / original) * 100);
	};

	// Render stars for ratings
	const renderStars = (rating) => {
		const stars = [];
		for (let i = 0; i < 5; i++) {
			if (i < Math.floor(rating)) {
				stars.push(<i key={i} className="text-warning bi bi-star-fill" />);
			} else if (i === Math.floor(rating) && !Number.isInteger(rating)) {
				stars.push(<i key={i} className="text-warning-50 bi bi-star-fill" />);
			} else {
				stars.push(<i key={i} className="text-muted opacity-25 bi bi-star-fill" />);
			}
		}
		return stars;
	};

	const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLocaleLowerCase())

	//Add to cart
	const handleAddToCart = (e, product) => {
		e.preventDefault(); // Prevent the Link navigation
		e.stopPropagation();
		dispatch(addToCart(product));
	};

	function getRandomNumber1to5() {
		// return Math.floor(Math.random() * 5) + 1;
		return Math.floor(Math.random() * (5 - 3 + 1)) + 3;
	}
	const randomNum = getRandomNumber1to5();

	return (
		<>
			<section className="top-sellers-section py-5" style={{ backgroundColor: "#fff" }}>
				<Container>
					{/* Section Header */}
					<Row className="mb-4 align-items-center">
						<Col>
							<div className="d-flex align-items-center">
								<div className="bg-primary opacity-75" style={{ width: "5px", height: "24px", marginRight: "12px" }}></div>
								<h2 className="mb-0 fw-bold">Top Sellers</h2>
							</div>
							<p className="text-muted mt-2">Discover the books everyone's talking about</p>
						</Col>
						<Col xs="auto">
							<Form.Select
								aria-label="Default select example"
								className='bg-secondary-subtle'
								onChange={(e) => setSelectedCategory(e.target.value)}
							>
								{bookCategories.map((category, index) => (
									<option key={index} value={category}>{category}</option>
								))}
							</Form.Select>
						</Col>
					</Row>
					{/* Swiper Carousel */}
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={20}
						slidesPerView={1}
						navigation
						pagination={{ clickable: true }}
						breakpoints={{
							// 640: {
							// 	slidesPerView: 2,
							// },
							// 768: {
							// 	slidesPerView: 2,
							// },
							// 1024: {
							// 	slidesPerView: 3,
							// },
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
						className="pb-5"
					>
						{filteredBooks.length > 0 && filteredBooks.map((book) => (
							<SwiperSlide key={book._id}>
								<Card as={Link} to={`/books/${book._id}`} className="text-decoration-none h-100 border-0 shadow-sm book-card overflow-hidden">
									<div className="position-relative overflow-hidden border-0">
										<Card.Img
											variant="top"
											src={getImgUrl(book.coverImage)}
											className='overflow-hidden border-0 object-fit-cover'
											width="100%"
											style={{
												height: "280px",
												borderRadius: "8px 8px 0 0"
											}}
										/>
										{/* Favorite Button */}
										<Button
											variant="link"
											className="align-middle position-absolute bg-light lh-1 rounded-circle shadow-sm d-flex align-items-center justify-content-center p-2"
											style={{
												top: "15px",
												right: "15px",
												width: "40px",
												height: "40px"
											}}
											onClick={() => toggleFavorite(book._id)}
										>
											{favorites[book._id] ? (
												<i className="bi bi-heart-fill text-danger lh-1" />
											) : (
												<i className="bi bi-heart text-danger lh-1" />
											)}
										</Button>
										{/* Category Badge */}
										<Badge
											bg="light"
											text="dark"
											className="position-absolute text-capitalize"
											style={{ bottom: "15px", left: "15px" }}
										>
											{book.category}
										</Badge>
										{/* New Badge */}
										{book.trending && (
											<Badge
												bg="primary"
												className="position-absolute"
												style={{ top: "15px", left: "15px" }}
											>
												Trending
											</Badge>
										)}
										{/* Discount Badge */}
										<Badge
											bg="danger"
											className="position-absolute"
											style={{ bottom: "15px", right: "15px" }}
										>
											{calculateDiscount(book.newPrice, book.oldPrice)}% OFF
										</Badge>
									</div>
									<Card.Body>
										<Card.Title className="fw-bold mb-2">{book.title}</Card.Title>
										<small className="text-muted">
											{book.description.length > 80 ? `${book.description.slice(0, 89)}...` : book.description}
										</small>
										{/* Rating */}
										<div className="mb-2 d-flex align-items-center">
											<div className="me-2">
												{renderStars(randomNum)}
											</div>
											<small className="text-muted">(899)</small>
										</div>
										{/* Price */}
										<div className="d-flex align-items-center mb-3">
											{book.oldPrice ? (
												<>
													<span className="fw-bold text-primary me-2">${book.newPrice}</span>
													<span className="text-muted text-decoration-line-through">${book.oldPrice}</span>
												</>
											) : (
												<span className="fw-bold text-primary">${book.newPrice}</span>
											)}
											<small className="ms-auto text-muted">
												In Stock
											</small>
										</div>
										{/* Add to Cart Button */}
										<Button
											variant="primary"
											className="w-100 d-flex align-items-center justify-content-center"
											disabled={book.stock === 0}
											onClick={(e) => handleAddToCart(e, book)}
										>
											<i className="bi bi-cart me-2" /> Add to Cart
										</Button>
									</Card.Body>
								</Card>
							</SwiperSlide>
						))}
					</Swiper>
				</Container>
			</section>
		</>
	)
}

export default TopSellers