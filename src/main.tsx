import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { 
  createBrowserRouter, 
  RouterProvider, 
} from 'react-router-dom'
import { PokemonIndexPage } from './pages/pokemon/PokemonPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokemon",
    element: <PokemonIndexPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
