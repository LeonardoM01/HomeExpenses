import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import './App.css'

import Home from './pages/Home'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/users',
        lazy: () => import('./pages/User').then(module => ({ Component: module.default })),
    },
    {
        path: '/categories',
        lazy: () => import('./pages/Category').then(module => ({ Component: module.default })),
    },
    {
        path: '/transactions',
        lazy: () => import('./pages/Transaction').then(module => ({ Component: module.default })),
    },
    {
        path: '/reports',
        lazy: () => import('./pages/UserSummary').then(module => ({ Component: module.default })),
    }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
