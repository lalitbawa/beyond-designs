import React, { useState, useEffect } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, Link,useLocation } from "react-router-dom";
import logo from '../../images/logo-white.png';
import { useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import { selectAllProducts } from '../product-list/ProductSlice';

const navigation = {
  products: [
    {
      id: "Products",
      name: "All Products",
      href: "/",
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ Children }) {
  const [open, setOpen] = useState(false);
  const items = useSelector(selectItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const products = useSelector(selectAllProducts);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults(products);
    } else {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredProducts);
    }
  };

  const handleProductClick = (productId) => {
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/productdetails/${productId}`);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest('.relative') &&
        !event.target.closest('.absolute')
      ) {
        setSearchResults([]);
      }
    };

    const handleScroll = () => {
      setSearchResults([]);
    };

    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-white">
      {/* Mobile navbar start */}
      <Transition.Root show={open} as={React.Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={React.Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={React.Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}


                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {navigation.pages.map((page) => (
  <div key={page.name} className="flow-root">
    <Link
      to={page.href}
      className="-m-2 block p-2 font-medium text-gray-900"
    >
      {page.name}
    </Link>
  </div>
))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link
                      to="/logout"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign out
                    </Link>
                  </div>
                  
                  <div className="flow-root">
                    <Link
      to="/userorders"
      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      My orders
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Mobile navbar end */}

      <header className="relative overflow-hidden">
        {/* Top navigation */}
        <nav
          aria-label="Top"
          className="relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center">
              {/* Hamburger menu button */}
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Eve Logo</span>
                  <img src={logo} className="h-10 w-auto mr-4" alt="pookie-image" />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                {navigation.products.map((product) => (
  <Link
    key={product.id}
    to={product.href}
    className={classNames(
      "border-transparent text-gray-700 hover:text-gray-800",
      "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
    )}
  >
    {product.name}
  </Link>
))}
                  {/* Pages */}
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {/* Desktop links */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
    <Link
      to="/logout"
      className="text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
    >
      Sign out
    </Link>
    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
    
    <Link
      to="/userorders"
      className="text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
    >
      My orders
    </Link>
  </div>
                {/* Search */}
                {location.pathname !== '/home' && (
                  <div className="flex lg:ml-6">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-0 focus:border-transparent"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      {searchResults.length > 0 && (
                        <div className="absolute w-full mt-2 bg-white border rounded-md shadow-lg z-10">
                          <ul className="max-h-48 overflow-auto">
                          {searchResults.map((product) => (
  <li
    key={product._id}
    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    onClick={() => handleProductClick(product._id)}
  >
    {product.name}
  </li>
))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {items.length}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {Children}
      </header>
    </div>
  );
}