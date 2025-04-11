import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { store } from './Store'
import Routers from './Routers/index.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={Routers} />
    </StrictMode>
  </Provider >,
)
