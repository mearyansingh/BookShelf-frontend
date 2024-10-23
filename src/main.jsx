import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './Store'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Routers from './Routers/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Routers} />
    </Provider>,
  </StrictMode>,
)
