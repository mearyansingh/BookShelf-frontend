import { useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../Store/bookApi';
import { getBaseUrl } from '../Helpers';

const bookCategories = [
   { value: '', label: 'Choose A Category' },
   { value: 'business', label: 'Business' },
   { value: 'technology', label: 'Technology' },
   { value: 'fiction', label: 'Fiction' },
   { value: 'horror', label: 'Horror' },
   { value: 'adventure', label: 'Adventure' },
   // Add more options as needed
]

const UpdateBook = () => {

   const { id } = useParams();
   const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
   const navigate = useNavigate()
   const [updateBook] = useUpdateBookMutation();
   const { register, handleSubmit, setValue, reset } = useForm();

   useEffect(() => {
      if (bookData) {
         setValue('title', bookData.title);
         setValue('description', bookData.description);
         setValue('category', bookData?.category);
         setValue('trending', bookData.trending);
         setValue('oldPrice', bookData.oldPrice);
         setValue('newPrice', bookData.newPrice);
         setValue('coverImage', bookData.coverImage)
      }
   }, [bookData, setValue])

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
         alert('Book updated successfully!')
         await refetch()
         navigate("/dashboard/manage-books")
      } catch (error) {
         console.log("Failed to update book.", error);
         alert("Failed to update book.");
      }
   }

   return (
      <>
         {isLoading && <div>Loading</div>}
         {isError && <div>Error fetching book data</div>}
         <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>
            <Form onSubmit={handleSubmit(onSubmit)} className=''>
               <div className="form-floating mb-3">
                  <input
                     type="text"
                     className="form-control"
                     name="title"
                     id="title"
                     placeholder="Enter book title"
                     {...register("title", { required: true })}
                  />
                  <label htmlFor="title" className="form-label">Title</label>
               </div>
               <div className="form-floating mb-3">
                  <Form.Control
                     as="textarea"
                     className="form-control"
                     name="description"
                     id="description"
                     placeholder="Enter book description"
                     {...register("description", { required: true })}
                  />
                  <label htmlFor="description" className="form-label">Description</label>
               </div>
               <Form.Select
                  aria-label="Default select example"
                  className='bg-secondary-subtle'
                  {...register("category", { required: true })}
               >
                  {bookCategories.map((category) => (
                     <option key={category?.value} value={category.value}>{category.label}</option>
                  ))}
               </Form.Select>
               <div className="mb-4">
                  <label className="inline-flex items-center">
                     <input
                        type="checkbox"
                        {...register('trending')}
                        className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                     />
                     <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                  </label>
               </div>
               <div className="form-floating mb-3">
                  <input
                     type="number"
                     className="form-control"
                     name="oldPrice"
                     id="oldPrice"
                     placeholder="Old price"
                     step="0.01"
                     {...register("oldPrice", { required: true })}
                  />
                  <label htmlFor="oldPrice" className="form-label">Old price</label>
               </div>
               <div className="form-floating mb-3">
                  <input
                     type="number"
                     className="form-control"
                     name="newPrice"
                     id="newPrice"
                     placeholder="New price"
                     step="0.01"
                     {...register("newPrice", { required: true })}
                  />
                  <label htmlFor="newPrice" className="form-label">New Price</label>
               </div>
               <div className="form-floating mb-3">
                  <input
                     type="text"
                     className="form-control"
                     name="coverImage"
                     id="coverImage"
                     placeholder="New price"
                     {...register("coverImage", { required: true })}
                  />
                  <label htmlFor="coverImage" className="form-label">Cover Image URL</label>
               </div>
               {/* <div className="mb-4">
               <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
               <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
               {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
            </div> */}
               <Button type="submit" className="">
                  {isLoading ?
                     <span className="">Updating.. </span>
                     :
                     <span>Update Book</span>
                  }
               </Button>
            </Form>
         </div>
      </>
   )
}

export default UpdateBook