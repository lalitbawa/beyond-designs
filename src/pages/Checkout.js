//please note that many of tailwind css components above are taken from the tailwind css "https://tailwindui.com/components"

// necessary imports
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { selectItems, createOrderAsync} from '../features/cart/cartSlice';
import { selectLoggedInUser } from '../features/auth/authSlice';
import Footer from '../features/Footer/Footer'


export default function Checkout() {
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Calculate the total price of all items in the cart
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + parseFloat(item.price.replace('£', '')) * item.quantity, 0);
  };

  // Create an order with the user's details and items in the cart. sends an object with the user's details and items in the cart to the server to create an order in the orders collection db and redirects the user to the order success page
  const onSubmit = async (data) => {
    const orderData = {
      user: user._id,
      items: items,
      ...data,
    };
    
    try {
      await dispatch(createOrderAsync(orderData)).unwrap();
      navigate('/ordersuccess');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <>
    <div className="bg-white">
      {/* Background color split screen for large screens */}
      <div className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
      <div className="fixed right-0 top-0 hidden h-full w-1/2 bg-gray-600 lg:block" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
        <h1 className="sr-only">Checkout</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-gray-600 py-12 text-gray-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0"
        >
          <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <dl>
              <dt className="text-sm font-medium">Amount due</dt>
              <dd className="mt-1 text-3xl font-bold tracking-tight text-white">{`£${getTotalPrice().toFixed(2)}`}</dd>
            </dl>

            <ul  className="divide-y divide-white divide-opacity-10 text-sm font-medium">
              {items.map((item) => (
                <li key={item._id} className="flex items-start space-x-4 py-6">
                  <img
                    src={item.imageSrc[0].src}
                    alt={item.imageSrc[0].imageAlt}
                    className="h-20 w-20 flex-none rounded-md object-cover object-center"
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-white">{item.name}</h3>
                    <p>{item.size}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className="flex-none text-base font-medium text-white">{item.price}</p>
                </li>
              ))}
            </ul>

            <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
              <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
                <dt className="text-base">Total</dt>
                <dd className="text-base">{`£${getTotalPrice().toFixed(2)}`}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          aria-labelledby="payment-and-shipping-heading"
          className="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0"
        >
          <h2 id="payment-and-shipping-heading" className="sr-only">
            Payment and shipping details
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
              <div>
                <h3 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                  Contact information
                </h3>

                <div className="mt-6">
                  <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      id="phone-number"
                      {...register('phoneNumber', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Invalid phone number',
                        },
                      })}
                      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm ${
                        errors.phoneNumber ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">Payment details</h3>

                <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                  <div className="col-span-3 sm:col-span-4">
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                      Card number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="card-number"
                        {...register('cardNumber', {
                          required: 'Card number is required',
                          pattern: {
                            value: /^[0-9]{16}$/,
                            message: 'Invalid card number',
                          },
                        })}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm ${
                          errors.cardNumber ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-3">
                    <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="expiration-date"
                        {...register('expirationDate', {
                          required: 'Expiration date is required',
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                            message: 'Invalid expiration date',
                          },
                        })}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm ${
                          errors.expirationDate ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.expirationDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.expirationDate.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="cvc"
                        {...register('cvc', {
                          required: 'CVC is required',
                          pattern: {
                            value: /^[0-9]{3,4}$/,
                            message: 'Invalid CVC',
                          },
                        })}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm ${
                          errors.cvc ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.cvc && (
                        <p className="mt-1 text-sm text-red-600">{errors.cvc.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">Shipping address</h3>

                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                  <div className="sm:col-span-3">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="address"
                        {...register('address', {
                          required: 'Address is required',
                        })}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm ${
                          errors.address ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="city"
                        {...register('city', {
                          required: 'City is required',
                        })}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm ${
                          errors.city ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="region"
                        {...register('region', {
                          required: 'State/Province is required',
                        })}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm ${
                          errors.region ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.region && (
                        <p className="mt-1 text-sm text-red-600">{errors.region.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="postal-code"
                        {...register('postalCode', {
                          required: 'Postal code is required',
                        })}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm ${
                          errors.postalCode ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Pay now
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <p>
              or{' '}
              <Link to="/cart" className="font-medium text-gray-600 hover:text-gray-500">
                Go back to cart<span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}