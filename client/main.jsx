import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'modern-css-reset'
import './shared/styles/Reset.css'
import AppRouter from './app/Router.jsx'
import { Auth0Provider } from '@auth0/auth0-react'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin + "/home",
                audience: "https://darksoulsBlog",
            }}
        >
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Auth0Provider>
    </React.StrictMode>
)