import {ReactNode, useState} from "react";
import { isMobile } from 'react-device-detect'

type LinkOfTextAndLink = string | { text: string; url: string }

type DeviceLink = {
  desktop?: LinkOfTextAndLink
  mobile?: LinkOfTextAndLink
}

type LinkOfDevice = string | DeviceLink

interface ModalV2Props {
  isOpen?: boolean;
  onDismiss?: () => void;
  closeOnOverlayClick?: boolean;
  children?: ReactNode;
}

export type WalletConfigV2<T = unknown> = {
  id: string
  title: string
  icon: string
  connectorId: T
  deepLink?: string
  installed?: boolean
  guide?: LinkOfDevice
  downloadLink?: LinkOfDevice
  mobileOnly?: boolean
}

interface WalletModalV2Props<T = unknown> extends ModalV2Props {
  wallets: WalletConfigV2<T>[]
  login: (connectorId: T) => Promise<any>
  docLink: string
  docText: string
}
export function WalletModalV2<T = unknown>(props: WalletModalV2Props<T>) {
  const { wallets: wallets, login, docLink, docText } = props
  const [selectedWallet, setSelectedWallet] = useState("");

  const connectWallet = (wallet: WalletConfigV2<T>) => {
    setSelectedWallet(wallet.title);

    if (wallet.installed !== false) {
        login(wallet.connectorId).then((v) => {
            console.log('after login wallet: ', v)
        }).catch((err) => {
            console.log('error when login: ', err)
        })
    } else {
        console.log('chua install')
    }
  }

  return (
      <div>
        <div>Selected wallet: {selectedWallet}</div>
          { isMobile ? (
                  <MobileModal wallets={wallets} docLink={docLink} docText={docText} connectWallet={connectWallet} />
          ) : (
              <DesktopModal wallets={wallets} docLink={docLink} docText={docText} connectWallet={connectWallet} />
          )}
      </div>
  )
}

function DesktopModal<T>({
                           wallets: wallets_,
                           connectWallet,
                           docLink,
                           docText,
                         }: Pick<WalletModalV2Props<T>, 'wallets' | 'docLink' | 'docText'> & {
  connectWallet: (wallet: WalletConfigV2<T>) => void
}) {
    const [status, setStatus] = useState("");
    const connectToWallet = (wallet: WalletConfigV2<T>) => {
        console.log('doc: ', docLink, docText)
        setStatus(`${wallet?.installed}`)
        connectWallet(wallet)
    }

  return (
      <div>
        <div>Desktop Modal</div>
        <div>status: {status}</div>
        <WalletSelect
            wallets={wallets_}
            onClick={(w) => {
                connectToWallet(w)
            }}
        />
      </div>
  )
}

function WalletSelect<T>({
    wallets,
    onClick,
}: {
    wallets: WalletConfigV2<T>[]
    onClick: (wallet: WalletConfigV2<T>) => void
}) {
    return (
        <div>
            {wallets.map((wallet) => {
                return (
                    <button onClick={() => onClick(wallet)}>{wallet.title}</button>
                )
            })}
        </div>
    )
}

function MobileModal<T>({
                            wallets: wallets_,
                            connectWallet,
                            docLink,
                            docText,
                        }: Pick<WalletModalV2Props<T>, 'wallets' | 'docLink' | 'docText'> & {
    connectWallet: (wallet: WalletConfigV2<T>) => void
}) {
    const [status, setStatus] = useState("");

    console.log('doc: ', docLink, docText)
    return (
        <div>
            <div>Mobile Modal</div>
            <div>Status: {status}</div>
            <WalletSelect
                wallets={wallets_}
                onClick={(wallet) => {
                    connectWallet(wallet)
                    setStatus(`${wallet.installed}`)
                    if (wallet.deepLink && wallet.installed === false) {
                        window.open(wallet.deepLink)
                    }
                }}
            />
        </div>
    )
}