import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from "./utils/wagmi.ts";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <WagmiConfig config={wagmiConfig}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </WagmiConfig>
)
