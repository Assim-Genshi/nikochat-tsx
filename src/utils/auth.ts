
import { supabase } from '../supabase/supabaseClient'; // Adjust the path as necessary
import { AuthError, Session, User, SignUpWithPasswordCredentials } from '@supabase/supabase-js';

interface AuthResponse {
  success: boolean;
  data?: User | Session | null;
  error?: AuthError | null;
}

interface SignUpResponse {
    success: boolean;
    data?: { user: User | null; session: Session | null; };
    error?: AuthError | null;
}


// Sign Up
export const signUp = async (credentials: SignUpWithPasswordCredentials): Promise<SignUpResponse> => {
  const { data, error } = await supabase.auth.signUp(credentials);
  if (error) {
    console.error('Sign up error:', error.message);
    return { success: false, error };
  }
    // Sign up successful, but requires email confirmation
    // data.user might be null if email confirmation is required and session is not created immediately.
    // data.session might also be null. Check Supabase settings.
  console.log('Sign up initiated:', data); 
  // Even if user/session is null due to confirmation, treat as success for navigation purposes
  return { success: true, data: { user: data.user, session: data.session } }; 
};

// Sign In
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error('Sign in error:', error.message);
    return { success: false, error };
  }
  console.log('Sign in successful:', data.user);
  return { success: true, data: data.user }; // Return user data on success
};

// Sign Out
export const signOut = async (): Promise<{ success: boolean; error?: AuthError | null }> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign out error:', error.message);
    return { success: false, error };
  }
  console.log('Sign out successful');
  return { success: true };
};

// Get User Session (primarily for initial load or manual checks)
export const getUser = async (): Promise<AuthResponse> => {
  const { data: { session }, error } = await supabase.auth.getSession();
   if (error) {
    console.error('Error getting session:', error.message);
    return { success: false, error };
  }
  return { success: true, data: session }; // Return the session
};
