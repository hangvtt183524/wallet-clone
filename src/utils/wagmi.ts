import { configureChains, createClient, createStorage } from "wagmi";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { CHAINS } from '../config/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { TrustWalletConnector } from "./trustWallet.ts";


export const { provider, chains } = configureChains(
    CHAINS,
    [
        jsonRpcProvider({
            rpc: (chain) => {
                return { http: chain.rpcUrls.default.http[0] };
            },
        }),
    ]
)

export const metaMaskConnector = new MetaMaskConnector({
    chains,
    options: {
        shimDisconnect: false,
    },
})

export const coinbaseConnector = new CoinbaseWalletConnector({
    chains,
    options: {
        appName: 'PancakeSwap',
        appLogoUrl: 'https://pancakeswap.com/logo.png',
    },
})

export const walletConnectConnector = new WalletConnectLegacyConnector({
    chains,
    options: {
        qrcode: true,
    },
})

export const trustWalletConnector = new TrustWalletConnector({
    chains,
    options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true,
    },
})


export const wagmiConfig = createClient({
    storage: createStorage({
        storage:  window.localStorage,
        key: 'wagmi_v1.1',
    }),
    autoConnect: false,
    provider,
    connectors: [
        metaMaskConnector,
        coinbaseConnector,
        walletConnectConnector,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        trustWalletConnector
    ],
})