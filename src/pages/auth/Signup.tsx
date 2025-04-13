import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { signUp } from '../../utils/auth'; // Import the new auth function
import { Button } from "@heroui/react"; // Assuming this is the correct import

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
        setError('Password should be at least 6 characters.');
        setLoading(false);
        return;
    }

    // Call the reusable signUp function
    const response = await signUp({ email, password });

    setLoading(false);

    if (response.success) {
      // Redirect to email confirmation page upon successful sign-up initiation
      console.log('Sign up initiated, redirecting to confirm email page.');
      navigate('/confirm-email'); 
    } else if (response.error) {
      setError(response.error.message || 'An unknown signup error occurred.');
    } else {
       setError('An unexpected error occurred during sign up.');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              disabled={loading} // Disable input while loading
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password" // Use new-password for signup
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              disabled={loading} // Disable input while loading
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
             {/* Ensure the Button component prop is correct (isBusy or isLoading) */}
             <Button 
               isLoading={loading}  /* Assuming isBusy is correct based on previous context */
               type="submit" 
               className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
               disabled={loading} // Disable button while loading
              >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </div>
        </form>
         <p className="mt-2 text-sm text-center text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </a>
                </p>
      </div>
    </div>
  );
};

export default Signup;
