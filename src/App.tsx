import './App.css'
import { WalletModalV2 } from "./ui-wallets";

import { useMemo } from "react";
import { createWallets } from "./config/wallet.ts";

import useAuth from "./hooks/useAuth.ts";

function App() {
    const wallets = useMemo(() => createWallets(), [])
    const { login } = useAuth()

  return (
      <div>
          <WalletModalV2
              docLink="docLink"
              docText="docText"
              wallets={wallets}
              login={login}
          />
      </div>
  )
}

export default App
