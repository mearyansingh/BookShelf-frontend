import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../Store/bookApi';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const bookCategories = [
   { value: '', label: 'Choose A Category' },
   { value: 'business', label: 'Business' },
   { value: 'technology', label: 'Technology' },
   { value: 'fiction', label: 'Fiction' },
   { value: 'horror', label: 'Horror' },
   { value: 'adventure', label: 'Adventure' },
   // Add more options as needed
]

const AddBook = () => {
   const [imageFile, setImageFile] = useState(null);
   const [imageFileName, setImageFileName] = useState('')
   const navigate = useNavigate()
   const [addBook, { isLoading, isError }] = useAddBookMutation()
   const { register, handleSubmit, formState: { errors }, reset } = useForm();

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setImageFile(file);
         setImageFileName(file.name);
      }
   }

   const onSubmit = async (data) => {
      const newBookData = {
         ...data,
         coverImage: imageFileName
      }
      try {
         await addBook(newBookData).unwrap();
         alert("Book added successfully!")
         reset();
         setImageFileName('')
         setImageFile(null);
         navigate("/dashboard/manage-books")
      } catch (error) {
         console.error(error);
         alert("Failed to add book. Please try again.")
      }
   }

   return (
      <>
         <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>
            <form onSubmit={handleSubmit(onSubmit)} className=''>
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
                  // onChange={(e) => setSelectedCategory(e.target.value)}
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
                     {...register("newPrice", { required: true })}
                  />
                  <label htmlFor="newPrice" className="form-label">New Price</label>
               </div>
               <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
                  {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
               </div>
               <Button type="submit" className="">
                  {isLoading ?
                     <span className="">Adding.. </span>
                     :
                     <span>Add Book</span>
                  }
               </Button>
            </form>
         </div>
      </>
   )
}

export default AddBook