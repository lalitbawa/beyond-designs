//please note that many of tailwind css components above are taken from the tailwind css "https://tailwindui.com/components"

//necessary imports
import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../features/Footer/Footer'

//display the 404 error page and footer component if you go to a page that doesn't exist (*) in the app routes

export default function Error404() {
  return (
    <>
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-gray-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
      <Footer></Footer>
      </>
  )
}