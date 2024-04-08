//necessary imports
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout'
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import Error404 from './pages/Error404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrderPage from './pages/UserOrderPage';
import Logout from './features/auth/components/Logout';

//create the router and define the routes

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>,
  },
  {
    path: "login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "cart",
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "home",
    element: <Protected><LandingPage></LandingPage></Protected>,
  },
  {
    path: "checkout",
    element: <Protected><Checkout></Checkout></Protected>,
  },
  {
    path: "productdetails/:productId",
    element: <Protected><ProductDetailPage></ProductDetailPage></Protected>,
  },
  {
    path: "*",
    element: <Error404></Error404>
  },
  {
    path: '/logout',
    element: <Logout></Logout>,
  },
  {
    path: "ordersuccess",
    element: <Protected><OrderSuccessPage></OrderSuccessPage></Protected>,
  },
  {
    path: "userorders",
    element: <Protected><UserOrderPage></UserOrderPage></Protected>,
  }
]);



function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user._id))
    }
  },[dispatch, user])

  
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
