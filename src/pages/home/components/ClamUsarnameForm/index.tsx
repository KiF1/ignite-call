import { Button, Text, TextInput } from "@ignite-ui/react";
import { Form, FormAnnotation } from "./styles";
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form' 
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from "next/router";

const claimUsernameFormSchema = z.object({
  username: z.string().min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' }).regex(/^([a-z\\-]+)$/i, { message: 'O usuário pode ter apenas letras e hifens.' }).transform((username) => username.toLowerCase()),
})

type ClaimUsernameForm = z.infer<typeof claimUsernameFormSchema>

export function ClamUsernameForm(){
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClaimUsernameForm>({
    resolver: zodResolver(claimUsernameFormSchema)
  })

  const router = useRouter()
  
  async function handleProRegister(data: ClaimUsernameForm){
    const { username } = data
    await router.push(`/register?username=${username}`)
  }

  return(
    <>
      <Form as="form" onSubmit={handleSubmit(handleProRegister)}>
        <TextInput size="sm" prefix="ignite.com/" placeholder="seu-usuario" {...register('username')} />
        <Button disabled={isSubmitting} size="sm" type="submit">Reservar <ArrowRight /></Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">{errors.username ? errors.username.message : 'Digite o nome do usuário desejado'}</Text>
      </FormAnnotation>
    </>
  )
}