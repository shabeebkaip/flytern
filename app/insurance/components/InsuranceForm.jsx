import { useAppSelector } from '@/lib/hooks';
import React from 'react';

const InsuranceForm = ({ tabIndex, setTabIndex }) => {
    const { insuranceFormList: { _lstPolicyHeaderType } = {} } = useAppSelector(state => state.insuranceState);


    return (
        <div>
            <div className="flex items-center h-16 overflow-hidden bg-white rounded-lg">
                <ul className="flex items-center w-full gap-10 px-10 text-xs duration-300 ease-out sm:text-base justify-normal">
                    {_lstPolicyHeaderType &&
                        _lstPolicyHeaderType.map((item, index) => (
                            <li
                                key={index}
                                className={`${
                                    ( tabIndex === index)
                                        ? 'border-b-2 border-orange-400 text-orange-400  cursor-pointer'
                                        : ''
                                } duration-300 ease-in-out p-4 cursor-pointer `}
                                onClick={() => {
                                    setTabIndex(index); 
                                }}
                            >
                                {item.information}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default InsuranceForm;

