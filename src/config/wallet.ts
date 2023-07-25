import {WalletConfigV2} from "../ui-wallets";
import { getTrustWalletProvider } from "../utils/trustWallet.ts";

export enum ConnectorNames {
    MetaMask = 'metaMask',
    Injected = 'injected',
    WalletConnect = 'walletConnect',
    WalletConnectV1 = 'walletConnectLegacy',
    BSC = 'bsc',
    Blocto = 'blocto',
    WalletLink = 'coinbaseWallet',
    Ledger = 'ledger',
    TrustWallet = 'trustWallet',
}

const docLangCodeMapping: Record<string, string> = {
    it: 'italian',
    ja: 'japanese',
    fr: 'french',
    tr: 'turkish',
    vi: 'vietnamese',
    id: 'indonesian',
    'zh-cn': 'chinese',
    'pt-br': 'portuguese-brazilian',
}

export const getDocLink = (code: string) =>
    docLangCodeMapping[code]
        ? `https://docs.pancakeswap.finance/v/${docLangCodeMapping[code]}/get-started/wallet-guide`
        : `https://docs.pancakeswap.finance/get-started/wallet-guide`


const isMetamaskInstalled = () => {
    if (typeof window === 'undefined') {
        return false
    }

    if (window.ethereum?.isMetaMask) {
        return true
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.ethereum?.providers?.some((p) => p.isMetaMask)) {
        return true
    }

    return false
}

const walletsConfig = (): WalletConfigV2<ConnectorNames>[] => {
    return [
        {
            id: 'metamask',
            title: 'Metamask',
            icon: 'iconMetamask',
            get installed() {
                return isMetamaskInstalled()
            },
            connectorId: ConnectorNames.MetaMask,
            deepLink: 'https://metamask.app.link/dapp/sage-cocada-bc19c9.netlify.app/',
            downloadLink: 'https://metamask.app.link/dapp/pancakeswap.finance/'
        },
        {
            id: 'coinbase',
            title: 'Coinbase Wallet',
            icon: 'iconCoinBase',
            connectorId: ConnectorNames.WalletLink,
        },
        {
            id: 'walletconnect',
            title: 'WalletConnect',
            icon: 'iconwalletconnect',
            connectorId: ConnectorNames.WalletConnect,
        },
        {
            id: 'trust',
            title: 'Trust Wallet',
            icon: 'iconTrustWallet',
            connectorId: ConnectorNames.TrustWallet,
            get installed() {
                return !!getTrustWalletProvider()
            },
            deepLink: 'https://link.trustwallet.com/open_url?coin_id=20000714&url=https://sage-cocada-bc19c9.netlify.app',
            downloadLink: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
            guide: {
                desktop: 'https://trustwallet.com/browser-extension',
                mobile: 'https://trustwallet.com/',
            },
        },
    ]
}

export const createWallets = () => {
    const config = walletsConfig()
    return config
}