import { createBrowserRouter } from 'react-router-dom';
import Cart from './pages/Cart';
import Favorite from './pages/Favorite';
import Home from './pages/Home';
export const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />
  },
  {
    path:"/favorites",
    element: <Favorite />
  },
  {
    path:"/cart",
    element: <Cart />
  },
])

