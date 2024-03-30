import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../ProductSlice';
import Footer from '../../Footer/Footer';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {

  const { productId } = useParams();
  const products = useSelector(selectAllProducts);
  const [selectedSize, setSelectedSize] = useState(null);

  const product = products.find((p) => p.id === parseInt(productId));

  useEffect(() => {
    if (product && product.size.length > 0) {
      setSelectedSize(product.size[0]);
    }
  }, [product]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-white">
      <div className="pb-8 pt-4 sm:pb-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-4">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">{product.name}</h1>
                <p className="text-xl font-medium text-gray-900">{product.price}</p>
              </div>
              {/* Reviews */}
              <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {product.rating}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                    ·
                  </div>
                  <div className="ml-4 flex">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      See all {product.reviewCount} reviews
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
              {product.imageSrc.map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.imageAlt}
                  className="rounded-lg"
                />
              ))}
            </div>
          </div>

            <div className="mt-4 lg:col-span-5">
              <form>
                {/* Size picker */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">Size</h2>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      See sizing chart
                    </a>
                  </div>

                  <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {Object.entries(product.size[0]).map(([size, inStock]) => (
        <RadioGroup.Option
          key={size}
          value={size}
          className={({ active, checked }) =>
            classNames(
              inStock ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25',
              active ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
              checked
                ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
                : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
              'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1'
            )
          }
          disabled={!inStock}
        >
          <RadioGroup.Label as="span">{size.toUpperCase()}</RadioGroup.Label>
        </RadioGroup.Option>
      ))}
    </div>
  </RadioGroup>
              </div>

                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
              </form>

              {/* Product details */}
              <div className="mt-6">
  <h2 className="text-sm font-medium text-gray-900">Description</h2>

  <div className="prose prose-sm mt-2 text-gray-500">
    {product.details}
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}