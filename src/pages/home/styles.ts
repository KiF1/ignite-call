import { styled, Heading, Text } from '@ignite-ui/react'

export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  height: '100vh',
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',

  '@media(max-width: 680px)': {
    flexDirection: 'column',
    margin: 'auto',
    gap: '1rem',
    padding: '1rem',
  }
});

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',
  '@media(max-width: 680px)': {
    padding: '$2',
  },

 [`> ${Heading}`]: {
  '@media(max-width: 600px)': {
    fontSize: '$6xl',
  }
  },

 [`> ${Text}`]: {
  marginTop: '$2',
  color: '$gray200',
  },
})

export const Preview = styled('div', {
  paddingRight: '$8',
  '@media(max-width: 600px)': {
    width: '100%',
    padding: 0,

    img: {
      width: '100%',
      height: 'fit-content',
    }
  }
});