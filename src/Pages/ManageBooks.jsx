import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, Table, Button, Badge, Modal, Spinner } from 'react-bootstrap';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../Store/bookApi';

const ITEMS_PER_PAGE = 10;

const ManageBooks = () => {

  //RTK QUERY
  const { data: books, refetch, isLoading } = useFetchAllBooksQuery()
  const [deleteBook] = useDeleteBookMutation()

  //Initial state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(books?.length / ITEMS_PER_PAGE);

  // Responsive view toggle
  const handleResize = useCallback(() => {
    setViewMode(window.innerWidth < 768 ? 'cards' : 'table');
  }, []);

  // Detect screen size and set view mode
  useEffect(() => {
    // Set initial view mode
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Refetch the books data when the component mounts
    refetch();
  }, [refetch]);

  //Confirmation to delete the book
  const confirmDelete = (bookId) => {
    setBookToDelete(bookId);
    setShowDeleteModal(true);
  };

  // Handle deleting a book
  const handleDeleteBook = async () => {
    try {
      await deleteBook(bookToDelete).unwrap();
      setShowDeleteModal(false);
      await refetch();
      toast.success('Book deleted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || error?.data?.message || 'Failed to delete book. Please try again.');
      console.error('Failed to delete book:', error);
    }
  };

  //Pagination logic
  const paginatedBooks = books?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Function to get category badge color
  // const getCategoryColor = (category) => {
  //   const categories = {
  //     'Fiction': 'primary',
  //     'Non-fiction': 'success',
  //     'Science': 'info',
  //     'History': 'warning',
  //     'Biography': 'secondary',
  //     'Self-help': 'danger'
  //   };

  //   return categories[category] || 'dark';
  // };

  // Card view rendering (for mobile)
  const renderBookCards = () => {
    return paginatedBooks.map((book) => (
      <Card key={book._id} className="mb-3 border-0 shadow-sm">
        <Card.Body>
          <div className="d-flex gap-3 justify-content-between align-items-start mb-3">
            <div className="d-flex flex-grow-1">
              <div className="bg-light rounded-circle" style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="bi bi-file-earmark-text text-secondary"></i>
              </div>
              <div className="ms-2">
                <h6 className="mb-0 fw-bold">{book.title}</h6>
                <small className="text-muted">ID: {book._id.slice(-6)}</small>
              </div>
            </div>
            <div className='flex-shrink-0 d-inline-flex flex-column flex-sm-row flex-wrap gap-2'>
              <Badge bg='warning-subtle text-warning' className="fw-semibold text-capitalize">
                {book.category}
              </Badge>
              {book.trending &&
                <Badge bg='success-subtle text-success' className=" fw-semibold text-capitalize">
                  <i className='bi bi-graph-up-arrow pe-2' />trending
                </Badge>
              }
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="mb-0 fw-bold text-dark">${book.newPrice}
                {book.oldPrice && (
                  <small className="text-muted text-decoration-line-through ms-2">
                    ${book.oldPrice}
                  </small>
                )}
              </p>
            </div>
            <div className="d-flex gap-2">
              <Button as={Link} type='button' variant="outline-primary" size="sm" to={`/dashboard/edit-book/${book._id}`} aria-label='Edit'>
                <i className="bi bi-pencil-square"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => confirmDelete(book._id)}
                aria-label='Delete'
              >
                <i className="bi bi-trash"></i>
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    ));
  };

  // Table view rendering (for desktop)
  const renderBookTable = () => {
    return (
      <div className="table-responsive">
        <Table hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="fw-bold text-center" style={{ width: '60px' }}>#</th>
              <th className="fw-bold">Book Title</th>
              <th className="fw-bold">Category</th>
              <th className="fw-bold">Price</th>
              <th className="fw-bold text-center" style={{ width: '150px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBooks.map((book, index) => (
              <tr key={book._id} className="align-middle">
                <td className="text-center">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="bg-light rounded" style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <i className="bi bi-file-earmark-text text-secondary"></i>
                    </div>
                    <div className="ms-3">
                      <p className="mb-0 fw-medium">{book.title}</p>
                      <div className='flex-shrink-0 d-inline-flex align-items-center gap-2'>
                        <small className="text-muted">ID: {book._id.slice(-6)}</small>
                        {book.trending &&
                          <Badge bg='success-subtle text-success' className=" fw-semibold text-capitalize">
                            <i className='bi bi-graph-up-arrow pe-2' />trending
                          </Badge>
                        }
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge bg='warning-subtle text-warning' className="fw-semibold text-capitalize">
                    {book.category}
                  </Badge>
                </td>
                <td>
                  <span className="fw-bold text-dark">${book.newPrice}</span>
                  {book.oldPrice && (
                    <small className="text-muted text-decoration-line-through ms-2">
                      ${book.oldPrice}
                    </small>
                  )}
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <Button as={Link} variant="outline-primary" type='button' size='sm' className="d-flex align-items-center" to={`/dashboard/edit-book/${book._id}`}>
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="d-flex align-items-center"
                      onClick={() => confirmDelete(book._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <section className="py-1 bg-blueGray-50">
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fs-5">Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this book? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteBook}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Card className="border-light-subtle shadow-sm">
        <Card.Header className="bg-body-secondary gap-2 flex-wrap border-light-subtle d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-book fs-4 me-2 text-primary"></i>
            <h5 className="mb-0 fw-bold">Book Inventory</h5>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <div className="d-none d-md-block">
              <Button
                variant={viewMode === 'table' ? 'primary' : 'outline-primary'}
                size="sm"
                className="me-1"
                onClick={() => setViewMode('table')}
              >
                <i className="bi bi-table me-1"></i>
                Table
              </Button>
              <Button
                variant={viewMode === 'cards' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                <i className="bi bi-grid me-1"></i>
                Cards
              </Button>
            </div>
            <Button as={Link} size="sm" variant='outline-secondary' type="button" to="/dashboard" className="d-flex align-items-center">
              <i className="bi bi-arrow-left me-1"></i>
              Back to DashBoard
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          {isLoading ? (
            <div className="d-flex align-items-center justify-content-center py-5">
              <Spinner animation="border" variant="dark" />
              <span className='fw-semibold ps-2'>Loading...</span>
            </div>
          ) : books && books.length > 0 ? (
            <>
              {/* For larger screens */}
              <div className={viewMode === 'table' ? '' : 'd-none'}>
                {renderBookTable()}
              </div>

              {/* For smaller screens or card view */}
              <div className={viewMode === 'cards' ? '' : 'd-none'}>
                {renderBookCards()}
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-journal-x text-muted" style={{ fontSize: "3rem" }}></i>
              <p className="mt-3 mb-0">No books found. Add some books to your inventory.</p>
              <Button as={Link} variant="primary" size="sm" to="/dashboard/add-book" className="mt-3">
                <i className="bi bi-plus-lg me-1"></i>
                Add Book
              </Button>
            </div>
          )}
        </Card.Body>
        {books?.length > 0 && (
          <Card.Footer className="bg-white border-0 d-flex justify-content-between align-items-center py-3">
            <div>
              <small className="text-muted">Showing {currentPage} of {totalPages}</small>
            </div>
            <div className="d-flex align-items-center">
              <Button
                variant="outline-primary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <i className="bi bi-arrow-left me-1"></i>
                Previous
              </Button>
              <span className="mx-2">{currentPage}</span>
              <Button
                variant="outline-primary"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Next
                <i className="bi bi-arrow-right ms-1"></i>
              </Button>
            </div>
          </Card.Footer>
        )}
      </Card>
    </section >
  )
}

export default ManageBooks