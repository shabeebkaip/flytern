import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { MobileDatePicker } from '@mui/x-date-pickers';

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1px solid #EEE',
    },
    '&:hover fieldset': {
      border: '1px solid #EEE',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #EEE',
    },
  },
  '& .MuiInputLabel-outlined': {
    color: 'black', // Change label color when focused
  },
};

export const CustomTextField = styled(TextField)(inputStyles);
export const CustomDatePicker = styled(MobileDatePicker)(inputStyles);