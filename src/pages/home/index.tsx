import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import Image from 'next/image'

import previewImage from '../../assets/calendario.png'
import { ClamUsernameForm } from './components/ClamUsarnameForm'
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
      <NextSeo title='Descomplique sua agenda | Ignite Call' description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre." />
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
    </>
  )
}
