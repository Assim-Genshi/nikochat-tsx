import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, // Import Navigate
} from "react-router-dom";
import { supabase } from './supabaseClient'; // Import supabase client
import { Session } from '@supabase/supabase-js'; // Import Session type
import Homepage from './pages/homepage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Example Chat component (can be moved to its own file later)
const Chat = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // The onAuthStateChange listener in App.tsx will handle the redirect
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
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
     // Check initial session
     supabase.auth.getSession().then(({ data: { session } }) => {
       setSession(session);
       setLoading(false); // Set loading to false once session is checked
     });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // If loading was true, set it to false on first auth state change too
      if (loading) setLoading(false); 
    });

    // Cleanup listener on unmount
    return () => subscription.unsubscribe();
  }, [loading]); // Rerun effect if loading changes (though primarily runs once)


   // Display a loading indicator while checking auth state
  if (loading) {
     return <div>Loading...</div>; 
   }


  return (
    <Router>
      <Routes>
         {/* Homepage: Redirect to login if not authenticated */}
         <Route 
           path="/" 
           element={session ? <Homepage /> : <Navigate to="/login" />} 
         />
         
         {/* Chat Page: Redirect to login if not authenticated */}
         <Route 
           path="/chat" 
           element={session ? <Chat /> : <Navigate to="/login" />} 
         />

         {/* Login Page: Redirect to home if already authenticated */}
         <Route 
           path="/login" 
           element={!session ? <Login /> : <Navigate to="/" />} 
          />
          
         {/* Signup Page: Redirect to home if already authenticated */}
         <Route 
           path="/signup" 
           element={!session ? <Signup /> : <Navigate to="/" />} 
          />
      </Routes>
    </Router>
  );
};

export default App;
