import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Button, Container, Spinner, Card, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../Store/bookApi';
import { bookCategories, getBaseUrl } from '../Helpers';

const UpdateBook = () => {
  //RTK QUERY
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();

  //REACT-HOOK-FORM
  const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm();

  //INITIAL STATE
  const [previewImage, setPreviewImage] = useState('');
  const navigate = useNavigate()

  //Lifecycle method
  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData?.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      setValue('coverImage', bookData.coverImage)
      setPreviewImage(bookData.coverImage);
    }
  }, [bookData, setValue])

  //function to submit the form
  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || bookData.coverImage,
    };
    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      await refetch()
      navigate("/dashboard/manage-books")
      toast.success('Book updated successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || error?.data?.message || "Failed to update book.");
      console.log("Failed to update book.", error);
    }
  }

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setValue('coverImage', url);
    setPreviewImage(url);
  };

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Loading book details...</span>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Error fetching book data. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Container className="py-5">
        <Card className="shadow-sm border-0">
          <Card.Header className="bg-white border-0 pt-4 px-4">
            <h2 className="fs-4 fw-bold text-primary mb-0">
              <i className="bi bi-pencil-square me-2"></i>
              Update Book
            </h2>
          </Card.Header>
          <Card.Body className="px-4 pb-4">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-secondary">Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter book title"
                      {...register("title", { required: "Title is required" })}
                      isInvalid={!!errors.title}
                    />
                    {errors.title && <Form.Control.Feedback type="invalid">{errors.title.message}</Form.Control.Feedback>}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-secondary">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Enter book description"
                      {...register("description", { required: "Description is required" })}
                      isInvalid={!!errors.description}
                    />
                    {errors.description && <Form.Control.Feedback type="invalid">{errors.description.message}</Form.Control.Feedback>}
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-secondary">Category</Form.Label>
                        <Form.Select
                          {...register("category", { required: "Please select a category" })}
                          isInvalid={!!errors.category}
                        >
                          {bookCategories.map((category) => (
                            <option key={category?.value} value={category.value}>{category.label}</option>
                          ))}
                        </Form.Select>
                        {errors.category && <Form.Control.Feedback type="invalid">{errors.category.message}</Form.Control.Feedback>}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3 mt-md-4 d-flex align-items-center">
                        <Form.Check
                          type="switch"
                          id="trending-switch"
                          label="Mark as Trending"
                          {...register('trending')}
                          className="mt-2 user-select-none"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-secondary">Original Price</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Original price"
                          step="0.01"
                          {...register("oldPrice", {
                            required: "Original price is required",
                            min: { value: 0, message: "Price cannot be negative" }
                          })}
                          isInvalid={!!errors.oldPrice}
                        />
                        {errors.oldPrice && <Form.Control.Feedback type="invalid">{errors.oldPrice.message}</Form.Control.Feedback>}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-secondary">Sale Price</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Sale price"
                          step="0.01"
                          {...register("newPrice", {
                            required: "Sale price is required",
                            min: { value: 0, message: "Price cannot be negative" }
                          })}
                          isInvalid={!!errors.newPrice}
                        />
                        {errors.newPrice && <Form.Control.Feedback type="invalid">{errors.newPrice.message}</Form.Control.Feedback>}
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-secondary">Cover Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter image URL"
                      {...register("coverImage", { required: "Cover image URL is required" })}
                      onChange={handleImageUrlChange}
                      isInvalid={!!errors.coverImage}
                    />
                    {errors.coverImage && <Form.Control.Feedback type="invalid">{errors.coverImage.message}</Form.Control.Feedback>}
                  </Form.Group>

                  <div className="mt-3 mb-4">
                    <p className="fw-semibold text-secondary mb-2">Image Preview</p>
                    <div className="border rounded bg-light d-flex justify-content-center align-items-center p-2" style={{ height: '250px' }}>
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Book cover preview"
                          className="img-fluid rounded shadow-sm"
                          style={{ maxHeight: '230px', objectFit: 'contain' }}
                        />
                      ) : (
                        <div className="text-center text-muted">
                          <i className="bi bi-image fs-1"></i>
                          <p className="mt-2">No image preview available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate("/dashboard/manage-books")}
                  disabled={isSubmitting}
                >
                  <i className="bi bi-x-lg me-1"></i> Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check2-circle me-1"></i> Update Book
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default UpdateBook

{/* <div className="mb-4">
               <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
               <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
               {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
            </div> */}