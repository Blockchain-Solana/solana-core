import { FC } from 'react'
import Image from 'next/image'
import { Flex, Button } from '@chakra-ui/react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const AppBar = () => {
    return (
        <Flex justify="space-around" w="100vw" paddingBottom="30px">
            <Image src="/solanaLogo.png" height={30} width={200} alt={'Solana Logo'} />
            <WalletMultiButton/>
        </Flex>
    )
}

export default AppBar;