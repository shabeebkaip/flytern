import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material';

const OtpModal = ({ isOtpModalOpen, handleClose, verifyOtpFn }) => {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleInput = (e, index) => {
    const value = e.target.value;

    if (!isNaN(value) && value !== '') {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (index < 5 && value !== '') {
        inputRefs[index + 1].current.focus();
      }
    } else if (value === '') {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = '';
      setOtpValues(newOtpValues);
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handleSubmit = () => {
    const otp = otpValues.join(''); // Concatenate OTP values
    verifyOtpFn(otp);

   
  };

  return (
    <Dialog open={isOtpModalOpen} onClose={handleClose}>
      <DialogTitle>OTP Verification</DialogTitle>
      <DialogContent>
        <div className="flex flex-row items-center justify-between w-full gap-3 lg:max-w-sm">
          {inputRefs.map((inputRef, index) => (
            <div className="w-10 h-10 sm:w-16 sm:h-16" key={index}>
              <input
                ref={inputRef}
                className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                maxLength={1}
                onChange={(e) => handleInput(e, index)}
                autoFocus={index === 0}
              />
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Verify</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OtpModal;
