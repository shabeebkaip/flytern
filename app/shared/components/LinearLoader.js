import React from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import AlertMessage from '@/app/shared/components/AlertMessage';

export default function LinearLoader({text}) {
  return (
    <Box sx={{ width: '100%' }}>
      <AlertMessage message={text} />
      <LinearProgress style={{backgroundColor:'#f0e5dc'}} />
    </Box>
  );
}