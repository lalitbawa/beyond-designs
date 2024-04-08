//necessary imports
import { RadioGroup } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  selectProductsStatus,
  fetchAllProductsAsync,
} from "../ProductSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { addToCartAsync } from "../../cart/cartSlice";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const { productId } = useParams();
  const products = useSelector(selectAllProducts);
  const productsStatus = useSelector(selectProductsStatus);
  const [selectedSize, setSelectedSize] = useState(null);
  const user = useSelector(selectLoggedInUser);

  const navigate = useNavigate();

  // Find the product with the given productId
  const product = products.find((p) => p._id === productId);

  const dispatch = useDispatch();

  // Fetch all products from the store right after the component mounts
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  if (productsStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const imageArray = product.imageSrc
    ? [product.imageSrc[0], ...product.imageSrc]
    : [];

  // Add the selected product to the cart and navigate to the cart page and sends an alert if no size is selected.
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    const newItem = {
      ...product,
      quantity: 1,
      user: user._id,
      size: selectedSize,
    };
    delete newItem["_id"];
    dispatch(addToCartAsync(newItem));
    navigate("/cart");
  };

  return (
    <div className="bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {product.name}
                </h1>
                <p className="text-xl font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 lg:gap-8">
                {imageArray.map((image, index) => (
                  <img
                    key={`${image.src}-${index}`}
                    src={image.src}
                    alt={image.imageAlt}
                    className={classNames(
                      index === 0 ? "lg:col-span-2 lg:row-span-2" : "",
                      "rounded-lg"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              <form>
                {/* Size picker */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">Size</h2>
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-600 hover:text-gray-500"
                    >
                      See sizing chart
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {product.size[0] &&
                        Object.entries(product.size[0]).map(
                          ([size, inStock]) => (
                            <RadioGroup.Option
                              key={size}
                              value={size}
                              className={({ active, checked }) =>
                                classNames(
                                  inStock
                                    ? "cursor-pointer focus:outline-none"
                                    : "cursor-not-allowed opacity-25",
                                  active
                                    ? "ring-2 ring-gray-500 ring-offset-2"
                                    : "",
                                  checked
                                    ? "border-transparent bg-gray-600 text-white hover:bg-gray-700"
                                    : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                                  "flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1"
                                )
                              }
                              disabled={!inStock}
                            >
                              <RadioGroup.Label as="span">
                                {size.toUpperCase()}
                              </RadioGroup.Label>
                            </RadioGroup.Option>
                          )
                        )}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  type="submit"
                  onClick={(e) => handleAddToCart(e)}
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
              </form>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>

                <div className="prose prose-sm mt-4 text-gray-500">
                  {product.details}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
