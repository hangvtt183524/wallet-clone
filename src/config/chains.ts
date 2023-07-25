import {
    bsc as bsc_,
    bscTestnet,
    goerli,
    mainnet,
    // zkSync,
    zkSyncTestnet,
    polygonZkEvmTestnet as polygonZkEvmTestnet_,
    polygonZkEvm as polygonZkEvm_,
    lineaTestnet as lineaTestnet_,
    // arbitrumGoerli,
    Chain,
} from 'wagmi/chains'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import memoize from 'lodash.memoize'

export enum ChainId {
    ETHEREUM = 1,
    GOERLI = 5,
    BSC = 56,
    BSC_TESTNET = 97,
    ZKSYNC_TESTNET = 280,
    ZKSYNC = 324,
    POLYGON_ZKEVM = 1101,
    POLYGON_ZKEVM_TESTNET = 1442,
    ARBITRUM_ONE = 42161,
    ARBITRUM_GOERLI = 421613,
    LINEA_TESTNET = 59140,
}

export const CHAIN_QUERY_NAME = {
    [ChainId.ETHEREUM]: 'eth',
    [ChainId.GOERLI]: 'goerli',
    [ChainId.BSC]: 'bsc',
    [ChainId.BSC_TESTNET]: 'bscTestnet',
    [ChainId.ARBITRUM_ONE]: 'arb',
    [ChainId.ARBITRUM_GOERLI]: 'arbGoerli',
    [ChainId.POLYGON_ZKEVM]: 'polygonZkEVM',
    [ChainId.POLYGON_ZKEVM_TESTNET]: 'polygonZkEVMTestnet',
    [ChainId.ZKSYNC]: 'zkSync',
    [ChainId.ZKSYNC_TESTNET]: 'zkSyncTestnet',
    [ChainId.LINEA_TESTNET]: 'lineaTestnet',
} as const satisfies Record<ChainId, string>

const CHAIN_QUERY_NAME_TO_ID = Object.entries(CHAIN_QUERY_NAME).reduce((acc, [chainId, chainName]) => {
    return {
        [chainName.toLowerCase()]: chainId as unknown as ChainId,
        ...acc,
    }
}, {} as Record<string, ChainId>)

export const getChainId = memoize((chainName: string) => {
    if (!chainName) return undefined
    return CHAIN_QUERY_NAME_TO_ID[chainName.toLowerCase()] ? +CHAIN_QUERY_NAME_TO_ID[chainName.toLowerCase()] : undefined
})

const bsc = {
    ...bsc_,
    rpcUrls: {
        ...bsc_.rpcUrls,
        public: {
            ...bsc_.rpcUrls.public,
            http: ['https://bsc-dataseed.binance.org/'],
        },
        default: {
            ...bsc_.rpcUrls.default,
            http: ['https://bsc-dataseed.binance.org/'],
        },
    },
} satisfies Chain

const polygonZkEvm = {
    ...polygonZkEvm_,
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 57746,
        },
    },
} as const satisfies Chain

const polygonZkEvmTestnet = {
    ...polygonZkEvmTestnet_,
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 525686,
        },
    },
} as const satisfies Chain

export const L2_CHAIN_IDS: ChainId[] = [
    ChainId.ARBITRUM_ONE,
    ChainId.ARBITRUM_GOERLI,
    ChainId.POLYGON_ZKEVM,
    ChainId.POLYGON_ZKEVM_TESTNET,
    ChainId.ZKSYNC,
    ChainId.ZKSYNC_TESTNET,
    ChainId.LINEA_TESTNET,
]

const lineaTestnet = {
    ...lineaTestnet_,
    blockExplorers: {
        etherscan: {
            name: 'LineaScan',
            url: 'https://goerli.lineascan.build',
        },
        default: {
            name: 'LineaScan',
            url: 'https://goerli.lineascan.build',
        },
    },
} as const satisfies Chain

export const CHAINS = [
    bsc,
    mainnet,
    bscTestnet,
    goerli,
    // zkSync,
    zkSyncTestnet,
    polygonZkEvm,
    polygonZkEvmTestnet,
    lineaTestnet,
    // arbitrumGoerli,
    // arbitrum,
]
