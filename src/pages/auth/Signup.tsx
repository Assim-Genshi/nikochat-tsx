import React, { useState } from 'react';
// Remove useNavigate import if no longer needed after removing redirection
// import { useNavigate } from 'react-router-dom'; 
import { supabase } from '../../supabaseClient';
import { Button } from "@heroui/react";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  // Remove navigate initialization if import is removed
  // const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      setLoading(false);
      return;
    }

    // Basic password validation (example: minimum length)
    if (password.length < 6) {
        setError('Password should be at least 6 characters.');
        setLoading(false);
        return;
    }


    try {
      // Use Supabase auth signup
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Successfully signed up, maybe show a success message or let App.tsx handle redirect
        console.log('Signup successful, user:', data.user); 
        // navigate('/chat'); // <-- Remove this line
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
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
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
             <Button 
             isLoading={loading}
             type="submit" 
             className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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