import { Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import Loader from '../Components/Loader';

const ProtectedRoute = ({ children }) => {
   const { currentUser, loading } = useAuth()
   if (loading) {
      return <Loader />;
   }
   return currentUser ? children : <Navigate to="/login" replace />;
}
// Without replace: Adds the / login page to the history, allowing the user to go back to the previous page.
// With replace: Replaces the current page with the / login page, preventing the user from going back.

export default ProtectedRoute