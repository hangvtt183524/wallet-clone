import { ChainId } from "./chains.ts";
import { arbitrum, polygonZkEvm, zkSync, zkSyncTestnet, polygonZkEvmTestnet, arbitrumGoerli } from 'wagmi/chains'

const POLYGON_ZKEVM_NODES = [
    'https://f2562de09abc5efbd21eefa083ff5326.zkevm-rpc.com/',
    ...polygonZkEvm.rpcUrls.public.http,
]

export const SERVER_NODES = {
    [ChainId.BSC]: [
        'https://bsc-dataseed1.defibit.io',
        'https://bsc-dataseed1.binance.org',
    ].filter(Boolean),
    [ChainId.BSC_TESTNET]: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    [ChainId.ETHEREUM]: [
        'https://eth.llamarpc.com',
        'https://cloudflare-eth.com',
    ],
    [ChainId.GOERLI]: [
        'https://eth-goerli.public.blastapi.io',
    ].filter(Boolean),
    [ChainId.ARBITRUM_ONE]: arbitrum.rpcUrls.public.http,
    [ChainId.ARBITRUM_GOERLI]: arbitrumGoerli.rpcUrls.public.http,
    [ChainId.POLYGON_ZKEVM]: POLYGON_ZKEVM_NODES,
    [ChainId.POLYGON_ZKEVM_TESTNET]: [
        'https://polygon-zkevm-testnet.rpc.thirdweb.com',
        ...polygonZkEvmTestnet.rpcUrls.public.http,
    ],
    [ChainId.ZKSYNC]: zkSync.rpcUrls.public.http,
    [ChainId.ZKSYNC_TESTNET]: zkSyncTestnet.rpcUrls.public.http,
    [ChainId.LINEA_TESTNET]: [
        'https://rpc.goerli.linea.build',
        'https://linea-testnet.rpc.thirdweb.com',
        'https://consensys-zkevm-goerli-prealpha.infura.io/v3/93e8a17747e34ec0ac9a554c1b403965',
    ],
} satisfies Record<ChainId, readonly string[]>

export const PUBLIC_NODES = {
    [ChainId.BSC]: [
        'https://bsc-dataseed1.defibit.io',
        'https://bsc-dataseed1.binance.org',
    ].filter(Boolean),
    [ChainId.BSC_TESTNET]: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    [ChainId.ETHEREUM]: [
        'https://eth.llamarpc.com',
        'https://cloudflare-eth.com',
    ].filter(Boolean),
    [ChainId.GOERLI]: [
        'https://eth-goerli.public.blastapi.io',
    ].filter(Boolean),
    [ChainId.ARBITRUM_ONE]: arbitrum.rpcUrls.public.http,
    [ChainId.ARBITRUM_GOERLI]: arbitrumGoerli.rpcUrls.public.http,
    [ChainId.POLYGON_ZKEVM]: POLYGON_ZKEVM_NODES,
    [ChainId.POLYGON_ZKEVM_TESTNET]: [
        ...polygonZkEvmTestnet.rpcUrls.public.http,
        'https://polygon-zkevm-testnet.rpc.thirdweb.com',
    ],
    [ChainId.ZKSYNC]: zkSync.rpcUrls.public.http,
    [ChainId.ZKSYNC_TESTNET]: zkSyncTestnet.rpcUrls.public.http,
    [ChainId.LINEA_TESTNET]: [
        'https://rpc.goerli.linea.build',
        'https://linea-testnet.rpc.thirdweb.com',
        'https://consensys-zkevm-goerli-prealpha.infura.io/v3/93e8a17747e34ec0ac9a554c1b403965',
    ],
} satisfies Record<ChainId, readonly string[]>