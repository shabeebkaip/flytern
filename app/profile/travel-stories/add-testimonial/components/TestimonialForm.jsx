import React, { useRef, useState } from 'react';
import TitleCard from '../../../../shared/components/TitleCard';
import HeaderBorder from '../../../../shared/components/HeaderBorder';
import { Rating } from '@mui/material';
import InputField from '../../../../shared/components/InputField';
import { useSnackbar } from 'notistack';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector } from 'react-redux';
import { Textarea } from '@material-tailwind/react';
import { checkApiStatus } from '@/lib/utils';
import { addTestimonialApi } from '@/app/profile/api';
import { arabic_translation } from '@/lib/constants';
import { useAppSelector } from '@/lib/hooks';
import Image from 'next/image';


const TestimonialForm = () => {
    const [data, setData] = useState({
        File: null,
        Title: '',
        Rating: '',
        TripSummary: '',
    });
    const { enqueueSnackbar } = useSnackbar();
    const [previewImage, setPreviewImage] = useState({ File: null });
    const fileInputRef = useRef(null);
    const [errors, setErrors] = useState({})

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };
    const onFieldChange = (field, value) => {
        setData({ ...data, [field]: value });
        if (field === 'File') {
            const file = value[0];
            const previewURL = URL.createObjectURL(file);
            setPreviewImage((prev) => ({ ...prev, [field]: previewURL }));
            setErrors((prev) => ({ ...prev, File: '' }));
        }
    };

    const validateFields = () => {
        const newErrors = {};

        if (!data.File) {
            newErrors.File = 'Please select an image file.';
        }

        if (!data.Title.trim()) {
            newErrors.Title = 'Please enter a title for your testimonial.';
        }

        if (!data.Rating) {
            newErrors.Rating = 'Please provide a star rating.';
        }

        if (!data.TripSummary.trim()) {
            newErrors.TripSummary = 'Please share your experience in the trip summary.';
        }

        setErrors(newErrors);
        console.log('Errors:', errors);

        // Return true if there are no errors, false otherwise
        return Object.keys(newErrors).length === 0;
    };

    const addTestimonial = () => {

        debugger
        if (!validateFields()) {
            return;
        }
        let formData = new FormData();
        formData.append('File', data?.File[0]);
        formData.append('Title', data?.Title);
        formData.append('Rating', data?.Rating);
        formData.append('TripSummary', data?.TripSummary);
        addTestimonialApi(formData)
            .then((res) => {
                if (checkApiStatus(res)) {
                    enqueueSnackbar('Testimonial Added Successfully', {
                        variant: 'success',
                        autoHideDuration: 3000,
                        preventDuplicate: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    });
                    setData({
                        File: null,
                        Title: '',
                        Rating: '',
                        TripSummary: '',
                    });
                    setPreviewImage({ File: null });
                    setErrors({});
                } else {
                    enqueueSnackbar('Something went wrong', {
                        variant: 'error',
                        autoHideDuration: 3000,
                        preventDuplicate: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    });
                }
            })
            .catch((err) => {
                console.error('Error adding testimonial:', err);
            });
    };

    const updateErrorField = (key) => {
        setErrors((prevErrors) => ({ ...prevErrors, [key]: "" }));
    };

    const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
    const handleClear = () => {
        setData({
            ...data,
            File: null
        })
        setPreviewImage({
            File: null
        })
    }

    return (
        <TitleCard title={selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.add_testmonial : 'Add Testimonials'} topMargin="0">
            <div className="relative">
                <div
                    className="flex justify-center items-center h-[280px] md:h-[409px] bg-stone-50 border-dashed border-orange-400 mt-8 border-2 rounded-sm"
                    onClick={handleFileInputClick}
                >
                    {previewImage.File ? (
                        <img className="w-full h-full" src={previewImage.File} alt="" />
                    ) : (
                        <Image width={1000} height={1000} className="w-16 h-16 cursor-pointer" src="/imageAdd.png" alt="" />
                    )}
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => onFieldChange('File', e.target.files)}
                />
                {errors.File && (
                    <p className="mt-1 text-sm text-red-500">{errors.File}</p>
                )}
            </div>
            {
                data.File ?
                    <div className="flex gap-1 cursor-pointer" onClick={() => { handleClear() }}>
                        <h4 className="text-base font-semibold text-orange-500 font-">
                            {selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.filter_by : "Clear"}
                        </h4>
                        <CancelIcon className="text-orange-500" />
                    </div> : null

            }

            <div className="z-10 mt-8">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-black ">{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.star_rating : 'Give Star Rating'}</h3>
                </div>
                <div>
                    <HeaderBorder />
                </div>
                <div className="py-10">
                    <Rating
                        style={{ fontSize: '50px' }}
                        name="simple-controlled"
                        value={data.Rating}
                        error={errors.Rating}
                        onChange={(event, newValue) => {
                            setData({ ...data, Rating: newValue })
                        }}
                        onFocus={() => updateErrorField('Rating')}
                    />
                    {errors.Rating && <p className="mt-1 text-sm text-red-500">{errors.Rating}</p>}
                </div>
            </div>
            <div className="z-10 mt-8">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-black ">{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.share_your_review : 'Share your Review'}</h3>
                </div>
                <div>
                    <HeaderBorder />
                </div>
                <div className="grid grid-cols-10 gap-5 mt-5">
                    <div className="col-span-10">
                        <InputField
                            type="text"
                            placeholder={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.title : 'Title'}
                            value={data.Title}
                            onChange={(e) => {
                                setData({ ...data, Title: e.target.value });
                                updateErrorField('Title');
                            }}
                            error={errors.Title}
                            styles="w-full  bg-white"
                            onFocus={() => updateErrorField('Title')}
                        />
                        {errors.Title && <p className="mt-1 text-sm text-red-500">{errors.Title}</p>}
                    </div>
                    <div className="col-span-10">
                        <Textarea
                            styles="w-full bg-white "
                            type="text"
                            rows={4}
                            className='flex focus:outline-none'
                            placeholder={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.testmonial_content : 'It was a great experience to travel with Air Canada, the flight was comfortable and the crew was very humble.'}
                            value={data.TripSummary}
                            error={errors.TripSummary}
                            onChange={(e) => setData({ ...data, TripSummary: e.target.value })}
                            onFocus={() => updateErrorField('TripSummary')}
                        />
                        {errors.TripSummary && <p className="mt-1 text-sm text-red-500">{errors.TripSummary}</p>}
                    </div>
                    <div className=''>
                        <button className="cursor-pointer col-span-4 h-[46px] px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center gap-1 inline-flex text-white mt-5 z-10000 relative" onClick={() => addTestimonial()}>
                            {selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.submit : 'Submit'}
                        </button>
                    </div>
                </div>

            </div>
        </TitleCard>
    );
};

export default TestimonialForm;

