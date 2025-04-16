import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../Components/DashboardLayout";

//Code splitting
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
const OrderDetail = lazy(() => import("../Pages/OrderDetail"));

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/books/:id", element: <Book /> },
      { path: "/orders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/checkout", element: <ProtectedRoute><CheckoutPage /></ProtectedRoute> },
      { path: "/order-detail/:id", element: <OrderDetail /> },
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