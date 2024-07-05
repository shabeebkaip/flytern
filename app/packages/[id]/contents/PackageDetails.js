import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { Dialog, DialogActions, DialogContent, DialogContentText, Skeleton } from "@mui/material";
import { format } from "date-fns";
import TravelFlightDetails from "../components/TravelFlightDetails";
import PackagePoster from "@/app/shared/components/PackagePoster";
import PackageDecription from "../components/PackageDiscription";
import { addpackageUserApi, getPackageDetailsApi, getpackageCountryListApi } from "../../api";
import Inclusion from "../components/Inclusion";
import Exclusion from "../components/Exclusion";
import FLightAndHotelContactForm from "@/app/shared/components/FLightAndHotelContactForm";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
// import { getCountryApi,getIntialInfoApi } from "@/app/shared/api";


const PackageDetails = ({id}) => {
  const { profile,contactDc,mobileCountryList } = useSelector(state => state.sharedState)
  const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);
  const packageLoader = useSelector(state => state.packageState.packageLoader)
  const [isOpen, setOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null)
  const { packageDetails: { apiFlightDtail = {}, } } = useSelector((state) => state.packageState);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPackageDetailsApi(id.id));
    dispatch(getpackageCountryListApi());
  }, [dispatch, id]);

  const addpackage = async () => {
    const _data = {
      mobileCntry: profile?.phoneCountryCode ? profile.phoneCountryCode : contactDc?.countryCode,
      mobileNumber: profile?.phoneNumber ? profile.phoneNumber : contactDc?.mobileNumber,
      email: profile?.email ? profile?.email : contactDc?.email,
    };
    const error = !_data.mobileCntry || !_data.email || !_data.mobileNumber;
    const packageData = {
      packageID: id.id,
      _CntDc: _data,
    };
    if (!error) {
      const data = await addpackageUserApi(packageData);

      if (data?.data.statusCode === 200) {
        setBookingData(data?.data?.data.bookingRef)
        setOpen(true)
      }
    } else {
      enqueueSnackbar('Fields should not be Blank', {
        variant: 'error',
        autoHideDuration: 2000,
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
    }
  };

  const handleClose = () => {
    setOpen(false)
  }
  const { translation } = useSelector((state) => state.sharedState)



  return (
    <div  className={` ${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} mt-12 px-3 md:px-0 mb-20 container mx-auto`}>
      <div>
        {
          packageLoader ?
            <Skeleton
              sx={{ bgcolor: 'grey.300' }}
              variant="rectangular"
              className="w-1/5 h-full bg-stone-50"
              height={30}
            /> :
            <h3 className="text-xl font-bold text-black">
              {translation?.package_details}
            </h3>
        }
        {
          packageLoader ?
            <Skeleton
              sx={{ bgcolor: 'grey.300' }}
              variant="rectangular"
              className="w-1/5 h-full mt-3 bg-stone-50"
              height={30}
            /> :
            <div className="flex gap-1 mt-1 text-sm font-normal text-neutral-400">
              <div  onClick={() => window.location.href="/packages"}>
              <h3 className='cursor-pointer'  >
                {translation?.packages}
              </h3>
              </div>
              <h3>/</h3>
              <h3 className="font-medium text-black">
                {translation?.package_details}
              </h3>
            </div>
        }
        <div className="grid grid-cols-10 gap-8">
          <div className="flex flex-col col-span-10 gap-8 lg:col-span-7">
            {
              packageLoader ?
                <Skeleton
                  sx={{ bgcolor: 'grey.300' }}
                  variant="rectangular"
                  className="w-full h-full mt-3 bg-stone-50"
                  height={600}
                /> :
                <PackageDecription />
            }
            {
              packageLoader ?
                <Skeleton
                  sx={{ bgcolor: 'grey.300' }}
                  variant="rectangular"
                  className="w-full h-full mt-3 bg-stone-50"
                  height={500}
                /> :
                apiFlightDtail ? <TravelFlightDetails /> : null

            }

            {/* {
              packageLoader ?
                <Skeleton
                  sx={{ bgcolor: 'grey.300' }}
                  variant="rectangular"
                  className="w-full h-full mt-3 bg-stone-50"
                  height={300}
                /> :
                <Insurance />
            } */}
          
            {
              packageLoader ?
                <Skeleton
                  sx={{ bgcolor: 'grey.300' }}
                  variant="rectangular"
                  className="w-full h-full mt-3 bg-stone-50"
                  height={300}
                /> :
                <Inclusion />
            }
            {
              packageLoader ?
                <Skeleton
                  sx={{ bgcolor: 'grey.300' }}
                  variant="rectangular"
                  className="w-full h-full mt-3 bg-stone-50"
                  height={300}
                /> :
                <Exclusion />
            }

            {/* {
              packageLoader ?
                <Skeleton
                  sx={{ bgcolor: 'grey.300' }}
                  variant="rectangular"
                  className="w-full h-full mt-3 bg-stone-50"
                  height={300}
                /> :
                <TermsAndCondition />
            } */}
            
            {
              packageLoader ?
                <Skeleton
                  sx={{ bgcolor: 'grey.300' }}
                  variant="rectangular"
                  className="w-full h-full mt-3 bg-stone-50"
                  height={300}
                /> :
                <FLightAndHotelContactForm hideButton={true} />
            }
          </div>
          <div className="hidden mt-5 lg:block lg:col-span-3">
            {
              packageLoader ?
                <Skeleton
                  sx={{ bgcolor: 'grey.300' }}
                  variant="rectangular"
                  className="w-full h-full bg-stone-50"
                  height={600}
                /> :
                <PackagePoster />
            }
          </div>
          <Dialog open={isOpen} >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div className="my-2">
                  <p className="text-lg font-bold text-left text-black">{translation?.your_enquiry}</p>
                  <p className="text-left text-md">{translation?.our_customer}</p>
                </div>
                <div className="grid w-full gap-4 p-3 border border-solid rounded-md">
                  <div className="flex flex-col justify-start ">
                    <p className='text-[10px]  text-black font-semibold  sm:text-base'>{translation?.enquiry_number}</p>
                    <p className='text-[10px] font-medium sm:text-base  text-gray-950'>{bookingData}</p>
                  </div>
                  <div className="flex flex-col justify-start ">
                    <p className='text-[10px]  text-black font-semibold  sm:text-base'>{translation?.enquiry_date}</p>
                    <p className='text-[10px] font-medium sm:text-base  text-gray-950'>{format(new Date(), 'dd-mm-yyy')}</p>
                  </div>
                  <div className="flex flex-col justify-start ">
                    <p className='text-[10px]  text-black font-semibold  sm:text-base'>{translation?.mobile_number}</p>
                    <p className='text-[10px] font-medium sm:text-base  text-gray-950'>{contactDc?.countryCode + " " + contactDc?.mobileNumber}</p>
                  </div>
                  <div className="flex flex-col justify-start ">
                    <p className='text-[10px]  font-semibold  text-black   sm:text-base'>{translation?.email_address}</p>
                    <p className='text-[10px] font-medium sm:text-base break-words text-gray-950'>{contactDc?.email} </p>
                  </div>

                </div>
                <div className="mt-3 text-xs">
                  <p>{translation?.for_any_other}</p>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>

              <button className="h-12 text-center text-white text-base font-medium  px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center col-span-3" onClick={handleClose} >
                {translation?.close}
              </button>
            </DialogActions>
          </Dialog>

          <button
            onClick={addpackage}
            className="h-12 text-center text-white text-base font-medium  px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center sm:col-span-3 col-span-6"
          >
            {translation.continue}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
