import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { ArrowRight, Check } from "phosphor-react";
import { Container, Header } from "../styles";
import { AuthError, ConectBox, ConectItem } from "./styles";
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

export default function ConectCalendar(){
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedId = session.status === 'authenticated'

  async function handleConectCalendar(){
    await signIn('google')
  }
  async function handleNavigateToNextStep() {
    await router.push('/register/time-intervals')
  }
  
  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados.</Text>
        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConectBox>
        <ConectItem>
          <Text>Google Calendar</Text>
          {isSignedId ? (
            <Button size="sm" disabled>Conectado <Check /></Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={handleConectCalendar}>Conectar <ArrowRight /></Button>
          ) }
        </ConectItem>
        {hasAuthError && (<AuthError size="sm">Falha ao se conectar com o Google, verifique se você habilitou as permissões de acesso ao Google Calendar</AuthError>)}
        <Button onClick={handleNavigateToNextStep} type="submit" disabled={!isSignedId}>Próximo passo <ArrowRight /></Button>
      </ConectBox>
    </Container>
  )
}