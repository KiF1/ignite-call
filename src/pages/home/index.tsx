import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import Image from 'next/image'

import previewImage from '../../assets/calendario.png'
import { ClamUsernameForm } from './components/ClamUsarnameForm'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">Agendamento Descomplicado</Heading>
        <Text size="xl">Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.</Text>
        <ClamUsernameForm />
      </Hero>
      <Preview>
        <Image src={previewImage} height={400} priority alt="Calendário simbolizando aplicação em funcionamento" />
      </Preview>
    </Container>
  )
}
