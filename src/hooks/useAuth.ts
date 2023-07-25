import {useCallback} from "react";
import {ConnectorNames} from "../config/wallet.ts";
import { useConnect, useDisconnect, ConnectorNotFoundError, SwitchChainNotSupportedError } from 'wagmi';

const useAuth = () => {
    const { connectAsync, connectors } = useConnect()
    const { disconnectAsync } = useDisconnect()

    const login = useCallback(
        async (connectorID: ConnectorNames) => {
            const findConnector = connectors.find((c) => c.id === connectorID)
            try {
                const connected = await connectAsync({ connector: findConnector, chainId: 1})
                if (!connected) {
                    console.log('error when connect!')
                }
                return connected
            } catch (error) {
                if (error instanceof ConnectorNotFoundError) {
                    console.log('catch exception not found connector')
                    throw new Error()
                }

                if (error instanceof SwitchChainNotSupportedError) {
                    console.log('catch exception not support switch chain')
                    throw new Error()
                }
            }
            return undefined
        },
        [connectors, connectAsync]
    )

    const logout = useCallback(async () => {
        try {
            await disconnectAsync()
        } catch (error) {
            console.error(error)
        }
    }, [disconnectAsync])

    return { login, logout }
}

export default useAuth