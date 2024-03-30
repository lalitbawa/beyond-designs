import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  fetchAllProductsAsync,
  selectProductsStatus,
} from "../ProductSlice";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const sortOptions = [
  { name: "Relevance", order: "relevance" },
  { name: "Low to High", order: "lowToHigh" },
  { name: "High to Low", order: "highToLow" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const [sortOrder, setSortOrder] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const sortProducts = (products, order) => {
    return [...products].sort((a, b) => {
      if (order === "lowToHigh") {
        return (
          parseFloat(a.price.replace(/[^0-9.-]+/g, "")) -
          parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
        );
      } else if (order === "highToLow") {
        return (
          parseFloat(b.price.replace(/[^0-9.-]+/g, "")) -
          parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
        );
      }
      return 0;
    });
  };

  const [selectedFilters, setSelectedFilters] = useState({
    size: [],
    category: [],
    season: [],
    price: [],
  });

  const handleFilterChange = (category, value) => {
    setSelectedFilters((prevFilters) => {
      const filters = [...prevFilters[category]];
      const index = filters.indexOf(value);
      if (index > -1) {
        filters.splice(index, 1);
      } else {
        filters.push(value);
      }
      return { ...prevFilters, [category]: filters };
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSize =
      selectedFilters.size.length === 0 ||
      selectedFilters.size.some((size) => product.size.some((s) => s[size]));
    const matchesCategory =
      selectedFilters.category.length === 0 ||
      selectedFilters.category.includes(product.product_type);
    const matchesSeason =
      selectedFilters.season.length === 0 ||
      selectedFilters.season.includes(product.season);
    const matchesPrice =
      selectedFilters.price.length === 0 ||
      selectedFilters.price.some((range) => {
        const [min, max] = range.split("-").map(parseFloat);
        const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
        return price >= min && (max === Infinity || price <= max);
      });
    return matchesSize && matchesCategory && matchesSeason && matchesPrice;
  });

  const sortedProducts = sortProducts(filteredProducts, sortOrder);

  const filters = {
    price: [
      { value: "0", label: "£0 - £25", checked: false },
      { value: "25", label: "£25 - £50", checked: false },
      { value: "50", label: "£50 - £75", checked: false },
      { value: "75", label: "£75+", checked: false },
    ],
    season: Array.from(new Set(products.map((product) => product.season))).map(
      (type) => ({
        value: type,
        label: type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, " "),
        checked: false,
      })
    ),
    size: [
      { value: "xs", label: "XS", checked: false },
      { value: "s", label: "S", checked: true },
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
      { value: "xl", label: "XL", checked: false },
      { value: "2xl", label: "2XL", checked: false },
    ],
    category: Array.from(
      new Set(products.map((product) => product.product_type))
    ).map((type) => ({
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, " "),
      checked: false,
    })),
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error fetching products</div>;
  }

  const productsPerPage = window.innerWidth >= 768 ? 12 : 6;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handleClearFilters = () => {
    setSelectedFilters({
      size: [],
      category: [],
      season: [],
      price: [],
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="bg-white">
        {/* Filters */}
        <Disclosure
          as="section"
          aria-labelledby="filter-heading"
          className="grid items-center border-b border-t border-gray-200"
        >
          <h2 id="filter-heading" className="sr-only">
            Filters
          </h2>
          <div className="relative col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
              <div>
                <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                  <FunnelIcon
                    className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  2 Filters
                </Disclosure.Button>
              </div>
              <div className="pl-6">
                <button
                  type="button"
                  className="text-gray-500"
                  onClick={handleClearFilters}
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="border-t border-gray-200 py-10">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
              <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                <fieldset>
                  <legend className="block font-medium">Price</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.price.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm"
                      >
                        <input
                          id={`price-${optionIdx}`}
                          name="price[]"
                          value={`${option.value}-${
                            option.value === "75"
                              ? Infinity
                              : parseInt(option.value, 10) + 25
                          }`}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={selectedFilters.price.includes(
                            `${option.value}-${
                              option.value === "75"
                                ? Infinity
                                : parseInt(option.value, 10) + 25
                            }`
                          )}
                          onChange={() =>
                            handleFilterChange(
                              "price",
                              `${option.value}-${
                                option.value === "75"
                                  ? Infinity
                                  : parseInt(option.value, 10) + 25
                              }`
                            )
                          }
                        />
                        <label
                          htmlFor={`price-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="block font-medium">Season</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.season.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm"
                      >
                        <input
                          id={`Season-${optionIdx}`}
                          name="Season[]"
                          value={option.value}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={selectedFilters.season.includes(
                            option.value
                          )}
                          onChange={() =>
                            handleFilterChange("season", option.value)
                          }
                        />
                        <label
                          htmlFor={`Season-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
              <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                <fieldset>
                  <legend className="block font-medium">Size</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.size.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm"
                      >
                        <input
                          id={`size-${optionIdx}`}
                          name="size[]"
                          value={option.value}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={selectedFilters.size.includes(option.value)}
                          onChange={() =>
                            handleFilterChange("size", option.value)
                          }
                        />
                        <label
                          htmlFor={`size-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="block font-medium">Category</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.category.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm"
                      >
                        <input
                          id={`category-${optionIdx}`}
                          name="category[]"
                          value={option.value}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={selectedFilters.category.includes(
                            option.value
                          )}
                          onChange={() =>
                            handleFilterChange("category", option.value)
                          }
                        />
                        <label
                          htmlFor={`category-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          </Disclosure.Panel>
          <div className="col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
              <Menu as="div" className="relative inline-block">
                <div className="flex">
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={() => handleSortChange(option.order)}
                              className={classNames(
                                sortOrder === option.order
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm w-full text-left"
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </Disclosure>
      </div>
      {/* Filters end */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {currentProducts.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <Link to={`/productdetails/${product.id}`}>
                <img
                  src={product.imageSrc[0].src}
                  alt={product.imageSrc[0].imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </Link>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link to={`/productdetails/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 items-center justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <div className="text-sm text-gray-700">
              Page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>

          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstProduct + 1}</span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastProduct, sortedProducts.length)}
                </span>{" "}
                of <span className="font-medium">{sortedProducts.length}</span>{" "}
                results
              </p>
            </div>

            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* Page buttons */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    aria-current={
                      currentPage === index + 1 ? "page" : undefined
                    }
                    className={classNames(
                      currentPage === index + 1
                        ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
                      "rounded-md"
                    )}
                  >
                    {index + 1}
                  </button>
                ))}

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
