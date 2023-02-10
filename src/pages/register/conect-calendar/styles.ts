import { Box, styled, Text } from "@ignite-ui/react";

export const ConectBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
})

export const ConectItem = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid $gray600',
  padding: '$4 $6',
  borderRadius: '$md',
  marginBottom: '$4',
})

export const AuthError = styled(Text, {
  color: '#f75a68',
  marginBottom: '$4'
})