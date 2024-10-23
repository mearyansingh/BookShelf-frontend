import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import CheckoutPage from "../Pages/Checkout";
import Book from "../Pages/Book";
import ProtectedRoute from "./ProtectedRoute";
import Orders from "../Pages/Orders";
import NotFound from "../Pages/NotFound";
import Dashboard from "../Pages/Dashboard";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../Pages/AdminLogin";
import ManageBooks from "../Pages/ManageBooks";
import DashboardLayout from "../Components/DashboardLayout";
import AddBook from "../Pages/AddBook";
import UpdateBook from "../Pages/UpdateBook";

const Routers = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      errorElement: <NotFound />,
      children: [
         { path: "/", element: <Home /> },
         { path: "/books/:id", element: <Book /> },
         { path: "/orders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
         { path: "/about", element: <div>About</div> },
         { path: "/contact", element: <div>Contact</div> },
         { path: "/login", element: <Login /> },
         { path: "/register", element: <Register /> },
         { path: "/checkout", element: <ProtectedRoute><CheckoutPage /></ProtectedRoute> },
      ],
   },
   {
      path: "/admin",
      element: <AdminLogin />
   },
   {
      path: "/dashboard",
      element: <AdminRoute><DashboardLayout /></AdminRoute>,
      children: [
         {
            path: "",
            element: <AdminRoute><Dashboard /></AdminRoute>
         },
         {
            path: "add-new-book",
            element: <AdminRoute><AddBook /></AdminRoute>
         },
         {
            path: "edit-book/:id",
            element: <AdminRoute><UpdateBook /></AdminRoute>
         },
         {
            path: "manage-books",
            element: <AdminRoute><ManageBooks /></AdminRoute>
         },
      ]
   }
]);

export default Routers