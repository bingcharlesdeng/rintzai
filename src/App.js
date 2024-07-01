import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { UserProvider } from './components/User/UserContext';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Navbar from './components/Routes/Navbar';
import Login from './components/Routes/Login';
import Signup from './components/Routes/Signup';
import Home from './components/Home/Home';
import Journal from './components/Journal/Journal';
import MoodTracker from './components/MoodTracker/MoodTracker';
import Chat from './components/Chat/Chat';
import Quotes from './components/Quotes/Quotes';
import Profile from './components/Profile/Profile';
import Display from './components/Display/Display';
import Gratitude from './components/Gratitude/Gratitude';
import Vision from './components/Vision/Vision';
import Goals from './components/Goals/Goals';
import Meditation from './components/Meditation/Meditation';
import Resources from './components/Resources/Resources';
import CBT from './components/CBT/CBT';
import Social from './components/Social/Social';
import Affirmations from './components/Affirmations/Affirmations';
import Habits from './components/Habits/Habits';
import DBT from './components/DBT/DBT';
import MentalIllness from './components/Mental/MentalIllness';
import SleepTracker from './components/Sleep/SleepTracker';
import MoodMusic from './components/Music/MoodMusic';
import Voice from './components/Voice/Voice';
import Progress from './components/Progress/Progress';
import Recommendations from './components/Recommendations/Recommendations';
import Community from './components/Community/Community';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      console.log('Initializing app...');
      try {
        const platform = Capacitor.getPlatform();
        console.log('📱 Device platform:', platform);

        if (Capacitor.isNative) {
          console.log('🚀 Running on a native platform');
          if (Capacitor.Plugins.StatusBar) {
            await Capacitor.Plugins.StatusBar.setStyle({ style: 'DARK' });
          }
        } else {
          console.log('🌐 Running on the web');
        }

        Capacitor.addListener('appUrlOpen', (data) => {
          console.log('Deep link received:', data.url);
        });

      } catch (error) {
        console.error('Error during app initialization:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route element={
              <>
                <Navbar />
                <Outlet />
              </>
            }>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="display" element={<Display />} />
              <Route path="journal" element={<Journal />} />
              <Route path="mood-tracker" element={<MoodTracker />} />
              <Route path="chat" element={<Chat />} />
              <Route path="quotes" element={<Quotes />} />
              <Route path="gratitude" element={<Gratitude />} />
              <Route path="vision" element={<Vision />} />
              <Route path="goals" element={<Goals />} />
              <Route path="meditation" element={<Meditation />} />
              <Route path="resources" element={<Resources />} />
              <Route path="cbt" element={<CBT />} />
              <Route path="social" element={<Social />} />
              <Route path="affirmations" element={<Affirmations />} />
              <Route path="habits" element={<Habits />} />
              <Route path="dbt" element={<DBT />} />
              <Route path="mental" element={<MentalIllness />} />
              <Route path="sleep" element={<SleepTracker />} />
              <Route path="music" element={<MoodMusic />} />
              <Route path="voice" element={<Voice />} />
              <Route path="progress" element={<Progress />} />
              <Route path="recommendations" element={<Recommendations />} />
              <Route path="community" element={<Community />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;