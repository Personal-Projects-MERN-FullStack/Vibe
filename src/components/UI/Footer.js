import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 text-center text-white  relative bottom-0 left-0 right-0">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Vibe. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer