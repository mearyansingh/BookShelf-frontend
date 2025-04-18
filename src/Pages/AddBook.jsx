import { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form, InputGroup, Row, Spinner, Nav } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAddBookMutation } from '../Store/bookApi';
import { bookCategories } from '../Helpers';

const AddBook = () => {
  // RTK Query hook
  const [addBook, { isLoading }] = useAddBookMutation();

  // React Hook Form
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    defaultValues: {
      imageSource: 'file', // Default to file upload
      coverImageUrl: ''
    }
  });

  // Watch for form values
  const selectedImageSource = watch('imageSource');
  const coverImageUrl = watch('coverImageUrl');

  // State management
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Effect to update preview when URL changes
  useEffect(() => {
    if (selectedImageSource === 'url' && coverImageUrl) {
      setImagePreview(coverImageUrl);
      setImageFileName('URL Image');
    } else if (selectedImageSource === 'url' && !coverImageUrl) {
      setImagePreview(null);
      setImageFileName('');
    }
  }, [coverImageUrl, selectedImageSource]);

  // Switch between image source types
  const handleImageSourceChange = useCallback((source) => {
    setValue('imageSource', source);

    // Reset image preview when switching tabs
    if (source === 'file') {
      if (!imageFile) {
        // If no file is uploaded, reset preview
        setImagePreview(null);
        setImageFileName('');
      }
      // If a file is uploaded, keep that preview
      // The preview is already set from handleFile
    } else if (source === 'url') {
      const url = watch('coverImageUrl');
      if (url && url.trim() !== '') {
        // If URL exists, show preview
        setImagePreview(url);
        setImageFileName('URL Image');
      } else {
        // If no URL, reset preview
        setImagePreview(null);
        setImageFileName('');
      }

      // Reset file input when switching to URL tab
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [imageFile, setValue, watch, fileInputRef]
  );

  const handleFile = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImageFileName(file.name);

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Clear URL when file is uploaded
      setValue('coverImageUrl', '');
    } else if (file) {
      // Show error if not an image
      toast.error("Please select an image file (JPG, PNG, WebP, etc.)");
    }
  }, [setValue])

  // Handle file upload
  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    handleFile(file);
  }, [handleFile])

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, [handleFile])

  // Remove the preview image
  const handleRemoveImage = useCallback(() => {
    setImageFile(null);
    setImageFileName('');
    setImagePreview(null);
    setValue('coverImageUrl', '');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [setValue, fileInputRef])

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Determine which image source to use
      let coverImageValue;

      if (data.imageSource === 'file') {
        if (!imageFile) {
          toast.error("Please upload a cover image");
          return;
        }
        coverImageValue = imageFileName;
      } else { // URL
        if (!data.coverImageUrl || data.coverImageUrl.trim() === '') {
          toast.error("Please enter a valid image URL");
          return;
        }
        coverImageValue = data.coverImageUrl;
      }

      const newBookData = {
        title: data.title,
        description: data.description,
        category: data.category,
        oldPrice: Number(data.oldPrice),
        newPrice: Number(data.newPrice),
        trending: data.trending || false,
        coverImage: coverImageValue
      };

      await addBook(newBookData).unwrap();
      toast.success("Book added successfully!");

      // Reset form and state
      reset();
      handleRemoveImage();
      navigate("/dashboard/manage-books");

    } catch (error) {
      toast.error(error.response?.data?.message || error?.data?.message || "Failed to add book. Please make sure all fields are correctly filled.");
      console.error("Failed to add book", error);
    }
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Loading...</span>
      </Container>
    );
  }

  return (
    <Container className="py-3">
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4 p-md-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Add New Book</h2>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate("/dashboard/manage-books")}
            >
              <i className="bi bi-arrow-left me-2"></i>Back
            </Button>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium">Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter book title"
                    isInvalid={!!errors.title}
                    {...register("title", { required: "Title is required" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium">Category</Form.Label>
                  <Form.Select
                    aria-label="Book category selection"
                    isInvalid={!!errors.category}
                    {...register("category", { required: "Please select a category" })}
                  >
                    {bookCategories.map((category) => (
                      <option key={category?.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.category?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter detailed book description"
                isInvalid={!!errors.description}
                {...register("description", { required: "Description is required" })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-medium">Original Price</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text><i className="bi bi-currency-dollar"></i></InputGroup.Text>
                    <Form.Control
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      isInvalid={!!errors.oldPrice}
                      {...register("oldPrice", {
                        required: "Original price is required",
                        min: { value: 0, message: "Price must be positive" }
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.oldPrice?.message}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-medium">Sale Price</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text><i className="bi bi-currency-dollar"></i></InputGroup.Text>
                    <Form.Control
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      isInvalid={!!errors.newPrice}
                      {...register("newPrice", {
                        required: "Sale price is required",
                        min: { value: 0, message: "Price must be positive" }
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.newPrice?.message}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <Form.Label className="fw-medium">Cover Image</Form.Label>

                {/* Image source selection tabs */}
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link
                      active={selectedImageSource === 'file'}
                      onClick={() => handleImageSourceChange('file')}
                    >
                      <i className="bi bi-file-earmark-image me-2"></i>Upload File
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      active={selectedImageSource === 'url'}
                      onClick={() => handleImageSourceChange('url')}
                    >
                      <i className="bi bi-link-45deg me-2"></i>Image URL
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                {/* Hidden radio buttons for form state */}
                <div className="d-none">
                  <Form.Check
                    type="radio"
                    id="image-source-file"
                    value="file"
                    {...register("imageSource")}
                    checked={selectedImageSource === 'file'}
                  />
                  <Form.Check
                    type="radio"
                    id="image-source-url"
                    value="url"
                    {...register("imageSource")}
                    checked={selectedImageSource === 'url'}
                  />
                </div>

                {/* File Upload Tab */}
                {selectedImageSource === 'file' && (
                  <div className="custom-file-upload">
                    <div
                      className={`upload-area p-4 rounded border border-dashed ${dragActive ? 'bg-light border-primary' : 'bg-light'} text-center`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      style={{ cursor: 'pointer', minHeight: '160px' }}
                    >
                      {!imagePreview ? (
                        <>
                          <i className="bi bi-cloud-arrow-up fs-1 text-secondary mb-2"></i>
                          <p className="mb-1">Drag and drop image here or click to upload</p>
                          <small className="text-muted">Supported formats: JPG, PNG, WebP</small>
                        </>
                      ) : (
                        <div className="position-relative">
                          <div className="mb-2">
                            <img
                              src={imagePreview}
                              alt="Book cover preview"
                              className="img-thumbnail"
                              style={{ maxHeight: '150px' }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/150?text=Image+Error';
                              }}
                            />
                          </div>
                          <p className="mb-1 text-truncate">{imageFileName}</p>
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ width: '32px', height: '32px' }}
                            className="position-absolute fs-3 top-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage();
                            }}
                          >
                            <i className="bi bi-x"></i>
                          </Button>
                        </div>
                      )}
                    </div>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="d-none"
                      ref={fileInputRef}
                    />
                  </div>
                )}

                {/* URL Input Tab */}
                {selectedImageSource === 'url' && (
                  <div>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <i className="bi bi-link"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="url"
                        placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                        {...register("coverImageUrl")}
                      />
                      {coverImageUrl && (
                        <Button
                          variant="outline-secondary"
                          onClick={handleRemoveImage}
                        >
                          <i className="bi bi-x-lg"></i>
                        </Button>
                      )}
                    </InputGroup>

                    {/* URL Image Preview */}
                    {imagePreview && selectedImageSource === 'url' && (
                      <div className="text-center p-3 bg-light rounded border">
                        <div className="position-relative d-inline-block">
                          <img
                            src={imagePreview}
                            alt="Book cover image"
                            className="img-thumbnail"
                            style={{ maxHeight: '150px' }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                              toast.warning("Could not load image from this URL. Please check the URL is correct.");
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Col>
            </Row>

            <div className="mb-4">
              <Form.Check
                type="switch"
                id="trendingSwitch"
                label="Mark as trending book"
                className="user-select-none"
                {...register('trending')}
              />
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button
                variant="outline-secondary"
                className="px-4"
                onClick={() => {
                  reset({
                    imageSource: 'file',
                    coverImageUrl: '',
                    trending: false
                  });
                  handleRemoveImage();
                }}
                disabled={isLoading}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Reset
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="px-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Adding...
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-circle me-2"></i>Add Book
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddBook;