import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { supabase } from './supabase/supabaseClient'; // Ensure correct path
import { Session } from '@supabase/supabase-js';
import { signOut } from './utils/auth'; // Import signOut from utils

import Homepage from './pages/homepage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import EmailConfirm from './pages/EmailConfirm'; // Import the new page

// Example Chat component (can be moved to its own file later)
const Chat = () => {
  const handleLogout = async () => {
    const { success } = await signOut(); // Use the signOut util
    if (!success) {
      // Handle potential sign out error (e.g., show a message)
      console.error("Failed to sign out");
    }
     // App.tsx's state change will handle redirect
  };

  return (
    <div className="p-4">
       <h1 className="text-2xl mb-4">Chat Page</h1>
       <p>Welcome! You are logged in.</p>
        <button
         onClick={handleLogout}
         className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
       >
         Logout
       </button>
    </div>
  );
};


const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     supabase.auth.getSession().then(({ data: { session } }) => {
       setSession(session);
       setLoading(false);
     }).catch(error => {
        console.error("Error getting initial session:", error);
        setLoading(false); // Ensure loading stops even on error
     });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session); // Log auth state changes
      setSession(session);
      if (loading) setLoading(false);
    });

    return () => {
        console.log("Unsubscribing from auth changes");
        subscription.unsubscribe();
    };
  }, []); // Remove loading from dependency array - only run once on mount


  if (loading) {
     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
   }


  return (
    <Router>
      <Routes>
         {/* Public route for email confirmation */}
         <Route path="/confirm-email" element={<EmailConfirm />} />

         {/* --- Protected Routes --- */}
         {/* Redirect to login if no session */}
         <Route
           path="/"
           element={session ? <Homepage /> : <Navigate to="/login" replace />} // Added replace
         />
         <Route
           path="/chat"
           element={session ? <Chat /> : <Navigate to="/login" replace />} // Added replace
         />

         {/* --- Authentication Routes --- */}
         {/* Redirect to home if session exists */}
          <Route
           path="/login"
           element={!session ? <Login /> : <Navigate to="/" replace />} // Added replace
          />
         <Route
           path="/signup"
           element={!session ? <Signup /> : <Navigate to="/" replace />} // Added replace
          />

        {/* Optional: Catch-all for unknown routes */}
        {/* <Route path="*" element={<Navigate to={session ? "/" : "/login"} replace />} /> */}

      </Routes>
    </Router>
  );
};

export default App;
