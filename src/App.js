import Counter from './features/counter/Counter';
import './App.css';
import ProductList from './features/product-list/ProductList';
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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
