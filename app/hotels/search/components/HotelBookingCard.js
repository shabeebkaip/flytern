import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorageInfo } from "../../../utils";
import { getHotelDestinationAutoSearchApi } from "../apiServices";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import person from "../../../assets/icons/User Rounded.svg";
import moment from "moment";
import HotelRecentSearch from "./HotelRecentSearch";
import HotelSearchField from "./HotelSearchField";
import CheckInOutInput from "./CheckInOutInput";
import NationalityInput from "./NationalityInput";
import RoomsPopoever from "./RoomsPopoever";
import CheckOutMobile from "./CheckOutMobile";
import CheckInMobile from "./CheckInMobile";
import Image from "next/image";

const HotelBookingCard = () => {
  const doneTypingInterval = 500;
  const [anchorEl, setAnchorEl] = useState(null);
  const [typingTimer, setTypingTimer] = useState(null);
  const [nationalityAnchorEl, setNationalityAnchorEl] = useState(null);
  const [destinationError, setDestinationError] = useState(false); // New state for destination error
  const [openSearch, setOpenSearch] = useState(false);
  const location = useLocation();
  const hotelSearch = getLocalStorageInfo("hotelSearch");
  const [data, setData] = useState({
    destinationLabel: "",
    destination: "",
    HotelCode: '',
    CityCode: '',
    checkInDate: format(new Date(), "yyyy-MM-dd"),
    checkOutDate: moment(new Date()).add(1, 'days').format("YYYY-MM-DD"),
    CountryCode: 'KW',
    countryName: "Kuwait",
    NationalityCode: 'KW'
  });
  const [rooms, setRooms] = useState([{
    adults: 2,
    children: 0,
    childAges: [],
  }]);
  const [destinationList, setDestinationList] = useState([]);
  const [destinationLoader, setDestinationLoader] = useState(false); // New state for destination loader
  const navigate = useNavigate();
  const { translation } = useSelector((state) => state.sharedState)

  const handleInputChange = (value) => {
    clearTimeout(typingTimer); // Clear existing timer
    setTypingTimer(setTimeout(() => doneTyping(value), doneTypingInterval)); // Start a new timer
    setData({ ...data, destinationLabel: value });
  };
  const clearTypingTimer = () => {
    clearTimeout(typingTimer); // Clear timer when component unmounts or changes
  };

  const doneTyping = (value) => {
    // Perform necessary actions after typing is completed
    getHotelDestinationAutoSearchApi(value, setDestinationList, setDestinationLoader);
    setOpenSearch(true);
  };
  useEffect(() => {
    if (data.destinationLabel) {
      setOpenSearch(true);
    } else {
      setOpenSearch(false);
    }
  }, [data.destinationLabel]);
  useEffect(() => {
    return () => {
      clearTypingTimer(); // Cleanup function to clear timer
    };
  }, []);

  const onNatinalChange = value => {
    setData({ ...data, countryName: value });
  };
  const handleRoomPopoever = target => {
    setAnchorEl(document.getElementById(target));
  };
  const handleNationalityPopover = target => {
    setNationalityAnchorEl(document.getElementById(target));
  }
  const updateChildAge = (value, index) => {
    setRooms(rooms.map((item, i) => i === index ?
      {
        ...item,
        childAges: item.childAges.map((age, childIndex) => childIndex === index ? value
          : age)
      }
      : item))
  }
  const addChildren = (value, index) => {
    setRooms(rooms.map((item, i) => i === index ? { ...item, children: value, childAges: Array(value).fill(1) } : item))
  }
  const handleSubmit = () => {
    if (!data.destination) {
      setDestinationError(true);
      return;
    }


    setDestinationError(false);
    let payload = {
      ...data,
      rooms: rooms
    }
    if (location?.pathname.includes("/search")) {
      localStorage.setItem("hotelSearch", JSON.stringify(payload));
      if (typeof window !== 'undefined') {
        window.location.reload(false);
      }
    } else {
      localStorage.setItem("hotelSearch", JSON.stringify(payload));
      navigate(`/hotel/search`);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
      if (location?.pathname === '/hotel/search') {
        setData(hotelSearch);
        setRooms(hotelSearch.rooms);
      }
    }
  }, []);

  const removeRoom = (indexToRemove) => {
    // Implement the logic to remove the room at the specified index
    setRooms((prevRooms) => prevRooms.filter((room, index) => index !== indexToRemove));
  };

  const open = Boolean(anchorEl);
  const nationalityOpen = Boolean(nationalityAnchorEl);
  const adults = rooms.reduce((acc, room) => acc + room.adults, 0);
  const children = rooms.reduce((acc, room) => acc + room.children, 0);
  const dateDiff = moment(data.checkOutDate).diff(moment(data.checkInDate), 'days');
  const totalNights = dateDiff > 0 ? dateDiff : 1;

  return (
    <div className="relative w-full p-2 duration-300 ease-in-out bg-white rounded-lg">
      <RoomsPopoever
        open={open}
        anchorEl={anchorEl}
        closePopover={() => setAnchorEl(null)}
        rooms={rooms}
        setRooms={(key, value, index) => setRooms(rooms.map((room, i) => i === index ? { ...room, [key]: value } : room))}
        addRoom={() => setRooms([...rooms, { adults: 1, children: 0, childAges: [] }])}
        updateChildAge={updateChildAge}
        addChildren={addChildren}
        removeRoom={removeRoom}
      />
      <div className="grid gap-5 p-2 ">
        <HotelSearchField
          data={data}
          destinationList={destinationList}
          onSearchChange={handleInputChange}
          setData={setData}
          setDestinationList={setDestinationList}
          destinationError={destinationError}
          destinationLoader={destinationLoader}
          setDestinationLoader={setDestinationLoader}
          openSearch={openSearch}
          setOpenSearch={setOpenSearch}

        />
      </div>
      <div className="grid gap-5 p-2 sm:grid-cols-2 " id="users">
        <div className=" p-2 bg-white rounded-[5px] border border-zinc-100 justify-start items-center gap-2.5 inline-flex cursor-pointer" onClick={() => handleRoomPopoever("users")}>
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-[7px] inline-flex">
            <div className="justify-start items-center gap-2.5 inline-flex">
              <div className="w-5 h-5 relative">
                <Image src={person} alt="" width={50} height={50} />
              </div>
              <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                <div className="text-gray-500 text-[10px] md:text-xs xl:text-sm  font-normal">
                  {translation?.rooms_guests}
                </div>
                <div className="text-black text-[10px] md:text-xs xl:text-sm  font-medium">
                  {rooms.length} {translation?.room}, {adults}  {translation?.adults}{children ? `, ${children} Children` : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
        <NationalityInput
          setData={(value) => setData({ ...data, NationalityCode: value.countryISOCode, countryName: value.countryName })}
          data={data}
          anchorEl={nationalityOpen}
          setAnchorEl={setNationalityAnchorEl}
          onNatinalChange={onNatinalChange}
          handleRoomPopoever={(value) => handleNationalityPopover(value)}
        />
      </div>
      <div className="grid gap-5 p-2 sm:grid-cols-3 ">


        <CheckInOutInput
          data={data}
          target="checkIn"
          setData={setData}
          keyValue="checkInDate"
          label={translation?.checkin}
        />

        <CheckInOutInput
          data={data}
          target="checkOut"
          setData={setData}
          keyValue="checkOutDate"
          label={translation?.checkout}
        />
        <div className="flex flex-col gap-4 sm:hidden">
          <CheckInMobile
            data={data}
            target="checkIn"
            setData={setData}
            keyValue="checkInDate"
            label={translation?.checkin}
          />

          <CheckOutMobile
            data={data}
            target="checkOut"
            setData={setData}
            keyValue="checkOutDate"
            label={translation?.checkout}
          />
        </div>
        <div>
          <button
            className={` h-10 sm:h-14  px-3 sm:px-6 py-1.5  bg-emerald-800   rounded-md justify-center items-center gap-1 inline-flex w-full`}
            onClick={handleSubmit}
          >
            <div className="text-center text-white text-[10px] md:text-xs xl:text-sm  font-medium capitalize">
              {
                location?.pathname === '/hotel/search' ? translation?.modify_search : translation?.search
              } {" "}
              ({translation.with}  {totalNights} {totalNights > 1 ? translation?.nights : translation?.nights})
            </div>
          </button>
        </div>
      </div>
      {
        location?.pathname === '/hotel/search' ? null :
          <HotelRecentSearch />
      }
    </div>
  );
};

export default HotelBookingCard;
