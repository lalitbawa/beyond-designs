import Counter from './features/counter/Counter';
import './App.css';
import ProductList from './features/product-list/components/ProductList';
import Navbar from './features/Navbar/Navbar';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import {
  createBrowserRouter,
  RouterProvider,Route,Link
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout'
import ProductDetailPage from './pages/ProductDetailPage';
import Footer from './features/Footer/Footer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
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
    element: <CartPage></CartPage>,
  },
  {
    path: "home",
    element: <LandingPage></LandingPage>,
  },
  {
    path: "checkout",
    element: <Checkout></Checkout>,
  },
  {
    path: "productdetails",
    element: <ProductDetailPage></ProductDetailPage>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
