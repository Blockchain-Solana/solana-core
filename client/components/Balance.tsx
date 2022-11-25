import { Flex, Text } from '@chakra-ui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import {useEffect, useState } from 'react'

const BalanceDisplay = () => {
    const [balance, setBalance] = useState(0);
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    useEffect(() => {
        if (!connection || !publicKey) { return }

        connection.getAccountInfo(publicKey).then(info => {
            setBalance(info!.lamports);
        })
    }, [connection, publicKey])

    return (
        <Flex mb="10px">
            <Text fontWeight="bold">{publicKey ? `Balance: ${balance / LAMPORTS_PER_SOL}` : ''}</Text>
        </Flex>
    )
}

export default BalanceDisplay;