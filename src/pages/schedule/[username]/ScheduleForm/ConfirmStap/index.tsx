import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { CalendarBlank, Clock } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ConfirmForm, FormActions, FormHeader, FormError } from "./styles";

const confirmFormSchema = z.object({
  name: z.string().min(3, {message: 'O nome precisa no mínimo 3 caracteres'}),
  email: z.string().email({ message: 'Digite um email válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStap(){
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema)
  })

  function handleConfirmScheduling(data: ConfirmFormData){
    
  }
  
  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text><CalendarBlank /> 14 de fevereiro de 2023</Text>
        <Text><Clock /> 18:00h</Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome Completo</Text>
        <TextInput placeholder="Seu Nome" {...register('name')} />
        {errors.name && (<FormError size="sm">{errors.name.message}</FormError>)}
      </label>
      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput type="email" placeholder="abner.kif1@gmail.com" {...register('email')} />
        {errors.email && (<FormError size="sm">{errors.email.message}</FormError>)}
      </label>
      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>
      <FormActions>
        <Button type="button" variant="tertiary">Cancelar</Button>
        <Button type="submit" disabled={isSubmitting}>Enviar</Button>
      </FormActions>
    </ConfirmForm>
  )
}