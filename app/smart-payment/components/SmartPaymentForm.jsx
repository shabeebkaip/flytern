import React, { useState } from "react";
import { useSnackbar } from "notistack";
import TitleCard from "@/app/shared/components/TitleCard";
import InputField from "@/app/shared/components/InputField";
import { encryptId, encryptUrl } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";
import { postSmartPaymentApi } from "../api";

const SmartPaymentForm = () => {
  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
  const [value, setValue] = useState({
    bookingRef: "",
  });
  const [aleart, setAleart] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { enqueueSnackbar } = useSnackbar()

  const handleClose = () => {
    setAleart({ ...aleart, open: false });
  };

  const handleFieldChange = (key, value) => {
    const data = { [key]: value };
    setValue(data);
  };

  const handleSubmit = () => {
    postSmartPaymentApi(value).then((response) => {
      if (response.data.statusCode === 200) {
        const encryptedBookingRef = encryptId(value.bookingRef);
        if (typeof window !== 'undefined') {
          window.location.href = `/payment-method/?ref=${encryptedBookingRef}`;
        }
      } else if (response.data.statusCode === 204) {
        enqueueSnackbar(response.data.data, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    });
  };
  const { translation } = useAppSelector((state) => state.sharedState)
  return (
    <TitleCard
      topMargin="0"
      title={
        translation?.smart_payment
      }
    >
      <div className="grid grid-cols-6 gap-4 mt-8 sm:gap-8">
        <div className="col-span-6 sm:col-span-4">
          <InputField
            styles={"w-full"}
            type="text"
            placeholder={
              translation?.enter_booking_id
            }
            value={value.bookingRef}
            onChange={(e) => {
              handleFieldChange("bookingRef", e.target.value);
            }}
          />
        </div>

        <div className="col-span-6 sm:col-span-4">
          <div className=" col-span-10 p-2.5 bg-orange-400 bg-opacity-10 rounded-[10px] justify-start items-center gap-2.5 ">
            <p className="text-orange-400 text-[11px] sm:text-sm font-medium ">
              {translation?.enter_booking_id_message}
            </p>
          </div>
        </div>
        <div className="col-span-6 sm:col-span-3 sm:mt-8">
          <button
            className="px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center text-center w-full h-12 text-white text-base font-medium "
            onClick={handleSubmit}
          >
            {translation?.submit}
          </button>
        </div>
      </div>
    </TitleCard>
  );
};

export default SmartPaymentForm;
