import { signOut } from 'firebase/auth';


export const handleLogout = async (auth) => {
  try {
    await signOut(auth);
    console.log('Logged out successfully!');


  } catch (error) {
    console.error('Logout failed:', error);
    // Handle logout errors (e.g., display error message to user)
  }
};


