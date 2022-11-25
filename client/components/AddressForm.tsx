import { Input, Flex, Text, Button, Heading } from '@chakra-ui/react'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import PingButton from './PingButton'

type AddressFormProps = {
  address: string
  handler: (address: string) => void
  balance: number
  isExecutable: boolean | undefined;
}

const AddressForm = ({
  address,
  balance,
  handler,
  isExecutable,
}: AddressFormProps) => {
  const [values, setValues] = useState({
    address: '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handler(values.address)
  }

  const handleAddressInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()
    setValues((values) => ({
      ...values,
      address: event.target.value,
    }))
  }

  return (
    <Flex
      flexDir="column"
      align="center"
      bgColor="black"
      color="white"
      w="100%"
      paddingY="20px"
    >
      <Heading h="50px">Start Your Solana Journey</Heading>
      <PingButton />
      <form onSubmit={handleSubmit}>
        <Input
          id="public-key"
          type="text"
          placeholder="Public Address, e.g. 7C4jsPZpht42Tw6MjXWF56Q5RQUocjBBmciEjDa8HRtp"
          name="firstName"
          value={values.address}
          onChange={handleAddressInputChange}
        />
        <Button type="submit" w="100%" my="50px"  bgColor="thistle" color="black">
          Check SOL Balance
        </Button>
      </form>
      <Text>{`Address: ${address}`}</Text>
      <Text>{`Balance: ${balance} SOL`}</Text>
      <Text>{`Is it executable? ${isExecutable ? 'Yep' : 'Nope'}`}</Text>
    </Flex>
  )
}

export default AddressForm
