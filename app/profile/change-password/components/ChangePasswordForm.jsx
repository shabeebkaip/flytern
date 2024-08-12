import React, { useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSnackbar } from 'notistack'
import { updatePasswordApi } from '../api';
import { useAppSelector } from '@/lib/hooks';
import TitleCard from '@/app/shared/components/TitleCard';
import InputField from '@/app/shared/components/InputField';
const ChangePasswordForm = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [showPassword, setShowPassword] = useState({
        stateOne: false,
        stateTwo: false,
        stateThree: false
    })
    const [data, setData] = useState({
        oldPassword: '',
        newPassword: '',
        reEnteredPassword: ''
    })
    const [error, seterror] = useState({
        fieldBlank: "",
        doesntMatch: "",
        repeatingPassword: "",
    })
    const noError = {
        fieldBlank: "",
        doesntMatch: "",
        repeatingPassword: "",
    }

    useEffect(() => {

    }, [data])
    const changePassword = async () => {
        if (!data.newPassword || !data.oldPassword || !data.reEnteredPassword) {
            seterror({
                ...error,
                fieldBlank: "Fields should not be blank"
            })
        } else if (data.newPassword.trim() === data.oldPassword.trim()) {
            seterror({
                ...error,
                repeatingPassword: "New password should not be as same as the old one "
            })
        } else if (data.newPassword.trim() !== data.reEnteredPassword.trim()) {
            seterror({
                ...error,
                doesntMatch: "Passwords should match"
            })
        } else if (!error.doesntMatch && !error.repeatingPassword && !error.fieldBlank) {
            const status = await updatePasswordApi(data)
            status === true && enqueueSnackbar('Success', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            });
            setData({
                oldPassword: '',
                newPassword: '',
                reEnteredPassword: ''
            });
        }
    }


    const { translation } = useAppSelector((state) => state.sharedState)
    const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
    return (
        <div className={`${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'}`}>
            <TitleCard title={translation?.change_password} topMargin="0">
                <div className="grid grid-cols-10 mt-8">
                    <div className='flex flex-col col-span-10 gap-2 sm:col-span-6'>
                        <label>{translation?.current_password}</label>
                        <div className="relative">
                            <InputField styles={'w-full'} type={`${showPassword.stateOne ? "text" : "password"}`} placeholder={translation?.enter_password} value={data.oldPassword} onChange={(e) => { seterror({ ...noError }); setData({ ...data, oldPassword: e.target.value }) }} />
                            <RemoveRedEyeIcon
                                onClick={() => setShowPassword({ ...showPassword, stateOne: !showPassword.stateOne })}
                                className={`absolute z-40 top-[12px] ${selectedLanguageAndCountry?.language?.code === "ar" ? 'left-4' : 'right-4'} text-slate-500`}
                            />
                            {showPassword.stateOne && <VisibilityOffIcon
                                className={`absolute z-40 top-[12px] ${selectedLanguageAndCountry?.language?.code === "ar" ? 'left-4' : 'right-4'} text-slate-500`}
                                onClick={() => setShowPassword({ ...showPassword, stateOne: !showPassword.stateOne })}
                            />}
                        </div>
                        <label>{selectedLanguageAndCountry?.language?.code === "ar" ? "كلمة المرور الجديدة" : "New password"}</label>
                        <div className="relative">
                            <InputField styles={'w-full '} type={`${showPassword.stateTwo ? "text" : "password"}`} placeholder={translation?.enter_new_password} value={data.newPassword} onChange={(e) => { seterror({ ...noError }); setData({ ...data, newPassword: e.target.value }) }} />
                            {error.repeatingPassword && <p className='text-red-800 cursor-pointer'> {error.repeatingPassword}</p>}
                            <RemoveRedEyeIcon
                                className={`absolute z-40 top-[12px] ${selectedLanguageAndCountry?.language?.code === "ar" ? 'left-4' : 'right-4'} text-slate-500`}
                                onClick={() => setShowPassword({ ...showPassword, stateTwo: !showPassword.stateTwo })}
                            />
                            {showPassword.stateTwo && <VisibilityOffIcon
                                className={`absolute z-40 top-[12px] ${selectedLanguageAndCountry?.language?.code === "ar" ? 'left-4' : 'right-4'} text-slate-500`}
                                onClick={() => setShowPassword({ ...showPassword, stateTwo: !showPassword.stateTwo })}
                            />}
                        </div>
                        <label>{translation?.re_enter_new_password}</label>
                        <div className="relative">
                            <InputField styles={'w-full'} type={`${showPassword.stateThree ? "text" : "password"}`} placeholder={translation?.re_enter_new_password} value={data.reEnteredPassword} onChange={(e) => { seterror({ ...noError }); setData({ ...data, reEnteredPassword: e.target.value }) }} />
                            {error.doesntMatch && <p className='text-red-800 cursor-pointer'> {error.doesntMatch}</p>}
                            {error.fieldBlank && <p className='text-red-800 cursor-pointer'> {error.fieldBlank}</p>}
                            <RemoveRedEyeIcon
                                className={`absolute z-40 top-[12px] ${selectedLanguageAndCountry?.language?.code === "ar" ? 'left-4' : 'right-4'} text-slate-500`}
                                onClick={() => setShowPassword({ ...showPassword, stateThree: !showPassword.stateThree })}
                            />
                            {showPassword.stateThree && <VisibilityOffIcon
                                className={`absolute z-40 top-[12px] ${selectedLanguageAndCountry?.language?.code === "ar" ? 'left-4' : 'right-4'} text-slate-500`}
                                onClick={() => setShowPassword({ ...showPassword, stateThree: !showPassword.stateThree })}
                            />}
                        </div>
                        <button
                            className='text-center text-white text-base font-medium   px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center h-12 w-full'
                            onClick={changePassword}>{translation?.update_password}</button>
                    </div>
                </div>
            </TitleCard>
        </div>
    )
}

export default ChangePasswordForm