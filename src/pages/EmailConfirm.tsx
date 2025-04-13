import React from 'react';

const EmailConfirm: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
        <p className="text-gray-700">
          We've sent a confirmation link to your email address.
        </p>
        <p className="text-gray-700 mt-2">
          Please click the link in the email to activate your account. Once confirmed, you can log in.
        </p>
        <p className="text-gray-500 text-sm mt-6">
          (Didn't receive an email? Check your spam folder or try signing up again.)
        </p>
         <a 
           href="/login" 
           className="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
         >
           Go to Login
         </a>
      </div>
    </div>
  );
};

export default EmailConfirm;
