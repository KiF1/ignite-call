import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
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

interface ConfirmStapProps {
  schedulingDate: Date;
  onCancelConfirmation: () => void;
}

export function ConfirmStap({ schedulingDate, onCancelConfirmation }: ConfirmStapProps){
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema)
  })
  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY');
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]');
  const router = useRouter();
  const username = router.query.username;
  
  async function handleConfirmScheduling(data: ConfirmFormData){
    const { name, email, observations } = data;
    await api.post(`/users/${username}/schedule`, { name, email, observations, date: schedulingDate })
    onCancelConfirmation();
  }
  
  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text><CalendarBlank />{describedDate}</Text>
        <Text><Clock />{describedTime}</Text>
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
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>Cancelar</Button>
        <Button type="submit" disabled={isSubmitting}>Enviar</Button>
      </FormActions>
    </ConfirmForm>
  )
}