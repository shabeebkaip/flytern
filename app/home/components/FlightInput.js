import React from 'react'
import { IconButton, InputAdornment } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppSelector } from '@/lib/hooks';
import Image from 'next/image';

const FlightInput = ({ label, defaultValue, image, ulta, value, onFieldChange, inputRef, id, onClearInput }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (e.key === 'Backspace') {
      // Handle backspace key: remove the last character
      const newValue = inputValue.slice(0, -1);
      onFieldChange(newValue);
    } else {
      const isAlphabetic = /^[A-Za-z\s]+$/.test(inputValue);

      if (isAlphabetic) {
        onFieldChange(inputValue);
      } else {
        // Show error message using notistack
        console.error('Please enter only alphabetical letters');
      }
    }
  };
  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)


  const handleClearInput = () => {

    onFieldChange('');
    // Notify the parent component to reset fields
  };

  return (
    <div className='relative cursor-pointer flex items-center'>
      {/* <label className="absolute text-sm top-2 left-8 text-zinc-600 font-normal font-['Inter'] focus:outline-none">{label}</label> */}
      <label className={`absolute text-sm top-2 ${selectedLanguageAndCountry?.language?.code === "ar" ? 'right-8' : 'left-8'}  text-zinc-600 font-normal font-['Inter'] focus:outline-none`}>{label}</label>
      <input
        type='text'
        placeholder='Search...'
        defaultValue={defaultValue}
        className={`w-full h-[70px] pt-7 ${selectedLanguageAndCountry?.language?.code === "ar" ? 'pr-7' : 'pl-7'} border-2 rounded-md text-black text-[15px] font-medium border-solid focus:outline-none placeholder:text-black `}
        onChange={handleInputChange}
        onKeyDown={handleInputChange}
        value={value}
        ref={inputRef}
        id={id}
        autoComplete="off"
      />
      {value && (
        <InputAdornment position="end" className={`absolute ${selectedLanguageAndCountry?.language?.code === 'ar' ? 'left-2 top-4' : 'right-2 md:top-4 top-4'}`}>
          <IconButton onClick={handleClearInput} size="small">
            <CancelIcon className='text-orange-500' />
          </IconButton>
        </InputAdornment>
      )}
      <div className={`absolute flex ${ulta ? 'flex-col-reverse' : 'flex-col'} ${selectedLanguageAndCountry?.language?.code === 'ar' ? 'right-2 top-2' : 'left-2 top-2'}  items-center gap-3 `}>
        <Image width={24} height={24} src={image} alt='' className=' h-7 w-5' />
        <Image width={2} height={12} className='w-1 h-2' src={"/misc/dottedLine.png"} alt='' />
        
      </div>
    </div>
  );
};

export default FlightInput;
