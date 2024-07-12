"use client"
import moment from 'moment/moment';
import React, { useState, useEffect } from 'react';

const CalenderTab = ({ onDateSelect, flightReqBody }) => {
    const [tabIndex, setTabIndex] = useState(0); // State to track the active tab
    const [tabs, setTabs] = useState([]); // State to store the tabs
    useEffect(() => {
        // Function to format dates as "Wed July 5, 2023"
        const formatDate = (date) => {
            return moment(date).format('MMM DD, YYYY');
        };

        // Function to get dates for the next seven days
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

        // Set the tabs with the next seven days
        setTabs(getNextSevenDays());
    }, []);

    const handleTabClick = (index) => {
        setTabIndex(index);
        // Pass the selected date to the parent component
        onDateSelect(tabs[index]);
        let requestBody = {
            ...flightReqBody,
            searchList: [
                {
                    ...flightReqBody.searchList[0],
                    departureDate: moment(tabs[index]).format('YYYY-MM-DD')
                }
            ]
        }
        localStorage.setItem('searchData', JSON.stringify(requestBody))
        window.location.reload(false)
        // dispatch(getFlightSearchApi(requestBody))
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
