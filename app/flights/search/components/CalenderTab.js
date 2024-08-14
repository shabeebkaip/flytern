"use client";
import moment from 'moment/moment';
import React, { useState, useEffect } from 'react';

const CalenderTab = ({ onDateSelect, flightReqBody }) => {
    const [tabIndex, setTabIndex] = useState(0); 
    const [tabs, setTabs] = useState([]); 

    useEffect(() => {
        const formatDate = (date) => moment(date).format('MMM DD, YYYY');

        const getNextSevenDays = () => {
            const today = new Date();
            const days = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                days.push(formatDate(date));
            }
            return days;
        };

        setTabs(getNextSevenDays());

        // Retrieve the saved tab index from localStorage
        const savedTabIndex = localStorage.getItem('selectedTabIndex');
        if (savedTabIndex !== null) {
            setTabIndex(Number(savedTabIndex));
        }
    }, []);

    const handleTabClick = (index) => {
        setTabIndex(index);
        onDateSelect(tabs[index]);

        let requestBody = {
            ...flightReqBody,
            searchList: [
                {
                    ...flightReqBody.searchList[0],
                    departureDate: moment(tabs[index]).format('YYYY-MM-DD'),
                },
            ],
        };

        // Save the selected tab index to localStorage
        localStorage.setItem('selectedTabIndex', index);

        localStorage.setItem('searchData', JSON.stringify(requestBody));
        window.location.reload(false);
    };

    return (
        <div>
            <div className="flex flex-wrap items-center py-5 text-center bg-white rounded-lg">
                <ul className="flex flex-wrap items-center w-full px-10 text-base font-normal text-gray-400 duration-300 ease-out gap-7 justify-normal">
                    {tabs.map((tab, index) => (
                        <li
                            key={index}
                            className={`${tabIndex === index
                                ? 'border-b-2 border-orange-400 text-orange-400 font-semibold cursor-pointer'
                                : ''
                                } duration-300 ease-in-out p-4 cursor-pointer `}
                            onClick={() => handleTabClick(index)}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CalenderTab;
