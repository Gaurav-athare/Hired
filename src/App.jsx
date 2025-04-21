import { useState } from 'react';
import './App.css';
import Applayout from './layout/app-layout';
import Landingpage from './pages/Landing';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Onboarding from './pages/onboarding';
import Job from './pages/job';
import Joblisting from './pages/job-listing';
import PostJob from './pages/post-job';
import SavedJob from './pages/savedJob';
import MyJob from './pages/my-jobs';
import { ThemeProvider } from "@/components/theme-provider"
import ProtectedRoute from './components/protected-route';

function App() {
  const router = createBrowserRouter([
    {
      element: <Applayout />,
      children: [ 
        {
          path: '/',
          element: <Landingpage />
        },
        {
          path: '/onboarding',
          element:
          <ProtectedRoute>
             <Onboarding />
          </ProtectedRoute>
        },
        {
          path: '/jobs',
          element:
          <ProtectedRoute>
             <Joblisting />
          </ProtectedRoute>
        },
        {
          path: '/job/:id',
          element: <Job />
        },
        {
          path: '/postjob',
          element: 
          <ProtectedRoute>
             <PostJob />
          </ProtectedRoute>
        },
        {
          path: '/saved-job',
          element: 
          <ProtectedRoute>
             <SavedJob />
          </ProtectedRoute>
        },
        {
          path: '/my-job',
          element: <MyJob />
        }
      ]
    }
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
