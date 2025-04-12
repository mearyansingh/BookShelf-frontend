import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../Components/DashboardLayout";
// import Home from "../Pages/Home";
// import Login from "../Pages/Login";
// import Register from "../Pages/Register";
// import CheckoutPage from "../Pages/Checkout";
// import Book from "../Pages/Book";
// import Orders from "../Pages/Orders";
// import NotFound from "../Pages/NotFound";
// import Dashboard from "../Pages/Dashboard";
// import AdminLogin from "../Pages/AdminLogin";
// import ManageBooks from "../Pages/ManageBooks";
// import AddBook from "../Pages/AddBook";
// import UpdateBook from "../Pages/UpdateBook";

const Home = lazy(() => import("../Pages/Home"));
const Login = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));
const CheckoutPage = lazy(() => import("../Pages/Checkout"));
const Book = lazy(() => import("../Pages/Book"));
const NotFound = lazy(() => import("../Pages/NotFound"));
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const AdminLogin = lazy(() => import("../Pages/AdminLogin"));
const ManageBooks = lazy(() => import("../Pages/ManageBooks"));
const Orders = lazy(() => import("../Pages/Orders"));
const AddBook = lazy(() => import("../Pages/AddBook"));
const UpdateBook = lazy(() => import("../Pages/UpdateBook"));
const Test = lazy(() => import("../Pages/Test"));

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
      { path: "/test", element: <Test /> },
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
        index: true,
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