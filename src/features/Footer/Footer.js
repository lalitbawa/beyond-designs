import React from 'react'

//basic footer component

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <div className="border-t border-gray-200 py-10">
        <p className="text-sm text-gray-500">
          Copyright &copy; 2024 Eve Store
        </p>
      </div>
  </footer>
  )
}
