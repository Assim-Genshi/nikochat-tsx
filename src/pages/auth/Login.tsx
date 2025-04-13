import React, { useState } from 'react';
import { signIn } from '../../utils/auth'; // Import the new auth function
import { Button } from "@heroui/react"; // Assuming this is the correct import

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  // No navigate needed here, App.tsx handles redirects based on session changes

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    // Call the reusable signIn function
    const response = await signIn(email, password);

    setLoading(false);

    if (response.success) {
      // Login successful, App.tsx's onAuthStateChange will detect the new session and redirect.
      console.log('Login successful, user:', response.data);
    } else if (response.error) {
       // Handle specific Supabase auth errors, e.g., email not confirmed
      if (response.error.message === 'Email not confirmed') {
           setError('Please confirm your email address before logging in.');
           // Optionally, you could redirect to a confirmation reminder page
           // navigate('/confirm-email'); 
      } else {
           setError(response.error.message || 'Failed to login');
      }
    } else {
       setError('An unexpected error occurred during login.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign in to your account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {/* Removed hidden input as it wasn't standard */}
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                disabled={loading}
              />
            </div>
          </div>

           {error && <p className="text-sm text-center text-red-600">{error}</p>}

          <div>
             {/* Ensure the Button component prop is correct (isBusy or isLoading) */}
              <Button 
                 isLoading={loading} /* Assuming isBusy is correct */
                 type="submit" 
                 className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                 disabled={loading}
               >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
          </div>
            <p className="mt-2 text-sm text-center text-gray-600">
                  Don't have an account yet?{' '}
                  <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign up
                  </a>
                </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
