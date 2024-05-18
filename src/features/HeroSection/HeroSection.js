//necessary imports
//please note that many of tailwind css components above are taken from the tailwind css "https://tailwindui.com/components"

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts, fetchAllProductsAsync } from '../product-list/ProductSlice';

// Hero section component for the landing page

export default function HeroSection() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  // Get 7 random products from the store
  const getRandomProducts = (count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomProducts = getRandomProducts(7);

  return (
    <div>
      {/* Hero section */}
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Summer styles are finally here
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              This summer, our latest collection embraces everyone, offering
              styles that celebrate individuality and diversity. No matter who
              you are, our fashion will empower you to shine brightly in a
              world that welcomes and celebrates every unique identity.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      {randomProducts.slice(0, 2).map((product, index) => (
                        <div
                          key={product._id}
                          className={`h-64 w-44 overflow-hidden rounded-lg ${
                            index === 0 ? 'sm:opacity-0 lg:opacity-100' : ''
                          }`}
                        >
                          <img
                            src={product.imageSrc[0].src}
                            alt={product.imageSrc[0].imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      {randomProducts.slice(2, 5).map((product) => (
                        <div
                          key={product._id}
                          className="h-64 w-44 overflow-hidden rounded-lg"
                        >
                          <img
                            src={product.imageSrc[0].src}
                            alt={product.imageSrc[0].imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      {randomProducts.slice(5, 7).map((product) => (
                        <div
                          key={product._id}
                          className="h-64 w-44 overflow-hidden rounded-lg"
                        >
                          <img
                            src={product.imageSrc[0].src}
                            alt={product.imageSrc[0].imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/"
                className="inline-block rounded-md border border-transparent bg-gray-900 px-8 py-3 text-center font-medium text-white hover:bg-gray-600"
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}