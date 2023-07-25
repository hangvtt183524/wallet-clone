import { CHAINS } from '../config/chains'
import { PUBLIC_NODES } from "../config/nodes.ts";
import { configureChains, createConfig, createStorage } from "wagmi";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { mainnet } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { TrustWalletConnector } from "./trustWallet.ts";

const mostNodesConfig = Object.values(PUBLIC_NODES).reduce((prev, cur) => {
    return cur.length > prev ? cur.length : prev
}, 0)

export const { publicClient, chains } = configureChains(
    CHAINS,
    Array.from({ length: mostNodesConfig })
        .map((_, i) => i)
        .map((i) => {
            return jsonRpcProvider({
                rpc: (chain) => {
                    if (process.env.NODE_ENV === 'test' && chain.id === mainnet.id && i === 0) {
                        return { http: 'https://cloudflare-eth.com' }
                    }
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return PUBLIC_NODES[chain.id]?.[i]
                        ? {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            http: PUBLIC_NODES[chain.id][i],
                        }
                        : null
                },
            })
        }),
    {
        batch: {
            multicall: {
                batchSize: 1024 * 200,
            },
        }
    }
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

export const walletConnectConnector = new WalletConnectConnector({
    chains,
    options: {
        showQrModal: true,
        projectId: 'e542ff314e26ff34de2d4fba98db70bb',
    },
})

export const trustWalletConnector = new TrustWalletConnector({
    chains,
    options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true,
    },
})


export const wagmiConfig = createConfig({
    storage: createStorage({
        storage:  window.localStorage,
        key: 'wagmi_v1.1',
    }),
    autoConnect: false,
    publicClient,
    connectors: [
        metaMaskConnector,
        coinbaseConnector,
        walletConnectConnector,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        trustWalletConnector
    ],
})