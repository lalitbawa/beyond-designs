import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../../auth/authSlice';
import { fetchUserOrdersAsync, selectUserOrders } from '../userSlice';

export default function UserOrder() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const orders = useSelector(selectUserOrders);
  
    useEffect(() => {
      if (user) {
        dispatch(fetchUserOrdersAsync(user.id));
      }
    }, [dispatch, user]);
  
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Orders</h1>
  
          <div className="mt-12 space-y-16">
            {orders.map((order) => (
              <div key={order.id} className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                <div className="flex items-center border-b border-gray-200 p-4 sm:p-6">
                  <div className="flex flex-1 items-center">
                    <div className="ml-4 flex-1 sm:ml-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">Order #{order.id}</h3>
                        <p className="ml-4 text-sm text-gray-600">{order.status}</p>
                      </div>
                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between sm:mt-0">
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="p-4 sm:p-6">
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.imageSrc[0].src}
                              alt={item.imageSrc[0].imageAlt}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
  
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={item.href}>{item.name}</a>
                                </h3>
                                <p className="ml-4">{item.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{item.size}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">Qty {item.quantity}</p>
  
                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-gray-600 hover:text-gray-500"
                                >
                                  Buy again
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }