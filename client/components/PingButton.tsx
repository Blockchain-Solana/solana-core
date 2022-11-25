import { Button, Flex } from '@chakra-ui/react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as Web3 from '@solana/web3.js'

const PROGRAM_ID = new Web3.PublicKey(
  'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa',
)
const PROGRAM_DATA_PUBLIC_KEY = new Web3.PublicKey(
  'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod',
)

const PingButton = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const onClick = () => {
    if (!connection || !publicKey) {
      alert('Connect your wallet first, bitch')
      return
    }

    const transaction = new Web3.Transaction()

    const instruction = new Web3.TransactionInstruction({
      keys: [
        {
          pubkey: PROGRAM_DATA_PUBLIC_KEY,
          isSigner: false,
          isWritable: true,
        },
      ],
      programId: PROGRAM_ID,
    })

    transaction.add(instruction)
    sendTransaction(transaction, connection).then((sig) => {
      console.log(
        `Explorer URL: https://explorer.solana.com/tx/${sig}?cluster=devnet`,
      )
    })
  }

  return (
    <Flex onClick={onClick} my="20px">
      <Button bgColor="thistle" color="black">Ping!</Button>
    </Flex>
  )
}

export default PingButton
