import { NextPage } from 'next'
import { SendSolForm } from '../components/SendSolForm'
import Head from 'next/head'
import AppBar from '../components/AppBar'
import BalanceDisplay from '../components/Balance'
import WalletContextProvider from '../contexts/WalletContext'
import { Flex } from '@chakra-ui/react'
import AddressForm from '../components/AddressForm'
import { useState } from 'react'
import * as Web3 from '@solana/web3.js'

const Home: NextPage = () => {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [isExecutable, setIsExecutable] = useState<boolean>();
   const addressSubmittedHandler = (address: string) => {
    try {
      setAddress(address)
      const key = new Web3.PublicKey(address)
      const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
      connection.getBalance(key).then(balance => {
        setBalance(balance / Web3.LAMPORTS_PER_SOL)
      })
      connection.getAccountInfo(key).then(info => {
        setIsExecutable(info!.executable);
      })
    } catch (error) {
      setAddress('')
      setBalance(0)
      alert(error)
    }
  }

  return (
    <Flex flexDir="column" align="center" paddingY="50px" bgColor="thistle" minHeight="100vh">
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta
          name="description"
          content="Wallet-Adapter Example"
        />
      </Head>
      <WalletContextProvider>
        <AppBar />
      <Flex w="100%">
        <AddressForm address={address} handler={addressSubmittedHandler} balance={balance} isExecutable={isExecutable}/>
      </Flex>
        <Flex w="100%" justify="center">
          <SendSolForm />
        </Flex>
      </WalletContextProvider >
    </Flex>
  );
}

export default Home;