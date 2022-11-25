import { Flex, Input, Text, Button, Heading } from '@chakra-ui/react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as web3 from '@solana/web3.js'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { FC, useState } from 'react'
import BalanceDisplay from './Balance'

export const SendSolForm: FC = () => {
  const [txSig, setTxSig] = useState('')
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const link = () => {
    return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ''
  }

  const sendSol = (event: any) => {
    event.preventDefault()
    if (!connection || !publicKey) {
      return
    }
    const transaction = new web3.Transaction()
    const recipientPubKey = new web3.PublicKey(event.target.recipient.value)

    const sendSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey,
      lamports: LAMPORTS_PER_SOL * event.target.amount.value,
    })

    transaction.add(sendSolInstruction)
    sendTransaction(transaction, connection).then((sig) => {
      setTxSig(sig)
    })
  }

  return (
    <Flex flexDir="column" align="center" w="60vw" paddingY="30px">
      <Heading>Transfer SOL</Heading>
      {publicKey ? (
        <form onSubmit={sendSol}>
          <Flex flexDir="column" align="center" w="35vw" my="30px">
            <BalanceDisplay/>
            <label htmlFor="amount">Amount (in SOL) to send:</label>
            <Input
              id="amount"
              type="text"
              placeholder="e.g. 0.1"
              required
              borderColor="black"
              bgColor="darkslateblue"
              color="white"
              mt="10px"
            />
          </Flex>
          <Flex flexDir="column" align="center">
            <label htmlFor="recipient">Send SOL to:</label>
            <Input
              id="recipient"
              type="text"
              borderColor="black"
              bgColor="darkslateblue"
              color="white"
              mt="10px"
              placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA"
              required
            />
          </Flex>
          <Button
            type="submit"
            w="100%"
            my="15px"
            bgColor="black"
            color="thistle"
          >
            Send
          </Button>
        </form>
      ) : (
        <span>Connect Your Wallet</span>
      )}
      {txSig ? (
        <Flex>
          <Text>
            View your transaction on{" "}
            <a href={link()}>Solana Explorer</a>
          </Text>
        </Flex>
      ) : null}
    </Flex>
  )
}
