import React from "react";
import { Link } from "react-router-dom";

function NotLoggedInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl mb-4">You are not logged in.</h1>
        <p>Please <Link to="/" className="text-blue-900 underline">login</Link> to access this page.</p>
      </div>
    </div>
  );
}

export default NotLoggedInPage;
