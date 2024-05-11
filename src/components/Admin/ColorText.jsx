import { Box } from '@mui/material'
import React from 'react'

function ColorText({color,children}) {
  return (
    <Box sx={{color}} component='span'>{children}</Box>
  )
}

export default ColorText