import { styled } from '@mui/material/styles';
import DatePicker from '@mui/x-date-pickers';

export const CustomDatePicker = styled(DatePicker)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
});
