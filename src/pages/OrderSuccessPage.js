import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import Footer from '../features/Footer/Footer';

export default function OrderSuccessPage() {
  const user = useSelector(selectLoggedInUser);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const response = await fetch(`http://localhost:8080/orders?user=${user.id}&_sort=id&_order=desc&_limit=1`);
        const data = await response.json();
        setOrder(data[0]);
      } catch (error) {
        console.error('Error fetching latest order:', error);
      }
    };

    if (user) {
      fetchLatestOrder();
    }
  }, [user]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const getTotalPrice = () => {
    return order.items.reduce((total, item) => total + parseFloat(item.price.replace('£', '')) * item.quantity, 0);
  };

  const getTotalItems = () => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
    <main className="relative">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Thanks for ordering</h1>
          <p className="mt-2 text-base text-gray-500">
            We appreciate your order, we're currently processing it. So hang tight and we'll send you confirmation
            very soon!
          </p>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent order</h2>

          <div className="space-y-20">
            <div key={order.id}>
              <h3 className="sr-only">Order placed on <time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleDateString()}</time></h3>

              <div className="mt-6 flex flex-col border-t border-b border-gray-200 py-6 text-sm sm:flex-row sm:justify-between">
                <div className="flex">
                  <dl className="grid grid-cols-2 gap-x-6 text-sm">
                    <div>
                      <dt className="font-medium text-gray-900">Tracking Status</dt>
                      <dd className="mt-2 text-gray-500">
                        {order.status}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">Total items</dt>
                      <dd className="mt-2 text-gray-500">{getTotalItems()}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 sm:mt-0">
                  <div className="font-medium text-gray-900">Total amount</div>
                  <div className="mt-2 text-gray-500">{`£${getTotalPrice().toFixed(2)}`}</div>
                </div>
              </div>

              <table className="mt-4 w-full text-gray-500 sm:mt-6">
                <caption className="sr-only">Products</caption>
                <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                  <tr>
                    <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">Product</th>
                    <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">Price</th>
                    <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-6 pr-8">
                        <div className="flex items-center">
                          <img
                            src={item.imageSrc[0].src}
                            alt={item.imageSrc[0].imageAlt}
                            className="mr-6 h-16 w-16 rounded object-cover object-center"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="mt-1 sm:hidden">{item.price}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-6 pr-8 sm:table-cell">{item.price}</td>
                      <td className="hidden py-6 pr-8 sm:table-cell">{item.quantity}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 py-6 text-right">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-500">
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </main>
    <Footer></Footer>
    </>
  );
}