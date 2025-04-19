import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter , Router, RouterProvider} from 'react-router-dom'
import NotFound from './Components/NotFound.jsx'
import Home from './Components/Home.jsx'
import Cart from './Components/Cart.jsx'
import CartItems from './Components/CartItems.jsx'
import ProductDetails from './Components/ProductDetails.jsx'
import ProductList from './Components/ProductsList.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/cartitems",
        element: <CartItems />
      },
      {
        path: "/ProductDetails",
        element: <ProductDetails />
      },
      {
        path: "/ProductList",
        element: <ProductList />
      },
    ],
    errorElement: <NotFound />
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)
