//necessary imports
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import logo from '../../../images/logo-white.png'
import { useForm } from "react-hook-form"
import { checkUserAsync,selectLoggedInUser } from '../authSlice';

//login page - includes login interface, makes use of react-hook-form for form validation, dispatches checkUserAsync action to check user credentials.

export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [error, setError] = useState(null);

  return (
    <>
      {user && <Navigate to='/home' replace={true}></Navigate>}
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-10 w-auto"
                src={logo}
                alt="Your Company"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Not a member?{' '}
                <Link to="/signup" className="font-semibold text-gray-600 hover:text-gray-500">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form noValidate
                  onSubmit={handleSubmit(async (data) => {
                    try {
                      await dispatch(checkUserAsync({ email: data.email, password: data.password })).unwrap();
                    } catch (error) {
                      setError(error.toString());
                    }
                  })} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          },
                        })}
                        type="email"
                        className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 ${errors.email ? 'ring-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        {...register('password', {
                          required: 'Password is required',
                        })}
                        type="password"
                        className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 ${errors.password ? 'ring-red-500' : ''}`}
                      />
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                      )}
                    </div>
                    {error && (
                      <p className="mt-1 text-sm text-red-600">{error.message}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-10">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={logo}
            alt=""
          />
        </div>
      </div>
    </>
  );
}