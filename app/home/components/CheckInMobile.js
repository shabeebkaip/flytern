import React, { useState } from 'react'
import FlightDateInput from './FlightDateInput';
import { format, parse } from 'date-fns';
import { Popover } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';
const CheckInMobile = ({ data, target, setData, keyValue, label }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = event => {
        setAnchorEl(document.getElementById(target));
    };
    const open = Boolean(anchorEl);
    return (
        <div className="relative ">
            <div className="">
                <FlightDateInput
                    label={label}
                    value={
                        data[keyValue]
                            ? format(new Date(data[keyValue]), "dd MMM yyyy")
                            : null
                    }
                    openCalendar={() => handleClick()}
                    id={target}
                />
            </div>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <div className="flex items-center justify-between gap-3  ">
                    <div className="flex flex-col gap-2 mt-2 border-r ">
                        <p className="pl-5 font-semibold">Check In</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateCalendar
                                value={parse(data.checkInDate, "yyyy-MM-dd", new Date())}
                                onChange={newValue => {
                                    setData({
                                        ...data,
                                        checkInDate: format(newValue, "yyyy-MM-dd"),
                                        checkOutDate: moment(newValue).add(1, 'days').format("YYYY-MM-DD")
                                    });
                                    setAnchorEl(null);
                                }}
                                minDate={new Date()}
                            />
                        </LocalizationProvider>
                    </div>

                </div>
            </Popover>
        </div>
    )
}

export default CheckInMobile