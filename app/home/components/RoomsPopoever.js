import { Autocomplete, Popover, TextField } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';


const RoomsPopoever = ({ open, anchorEl, closePopover, rooms, setRooms, addRoom, updateChildAge, addChildren, removeRoom }) => {
  const { translation } = useSelector(state => state.sharedState)

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={closePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      fullWidth={true}
    >
      <div className="grid w-full grid-cols-1 gap-5 p-2" >
        {rooms.map((room, index) => (
          <div className="flex flex-col justify-start gap-5" key={index}>
            <div className="flex items-center justify-between w-full">
              <h4 className="font-semibold font-inter">{translation.room} {index + 1}</h4>
              {index === rooms.length - 1 && (
                rooms.length > 1 ?
                  <div className="text-red-400 cursor-pointer font-inter" onClick={() => removeRoom(index)}>
                    {translation.remove}
                  </div> : null
              )}
            </div>
            <Autocomplete
              id="combo-box-demo"
              label={translation.adults}
              options={[1, 2, 3, 4, 5, 6]}
              sx={{ width: 300 }}
              value={room.adults}
              onChange={(event, value) => setRooms('adults', value, index)}
              renderInput={(params) => <TextField {...params} label={translation.adults} />}
            />
            <Autocomplete
              id="combo-box-demo"
              label={translation.children}
              options={[1, 2, 3, 4]}
              sx={{ width: 300 }}
              value={room.children}
              onChange={(event, value) => { addChildren(value, index) }}
              renderInput={(params) => <TextField {...params} label={translation.children} />}
            />
            {
              room.childAges.map((age, childIndex) => (
                <div key={childIndex}>
                  <h4 className="mb-4">{translation.child_age} </h4>
                  <div className="grid grid-cols-1 gap-5">
                    <Autocomplete
                      id="combo-box-demo"
                      label="Child Age"
                      options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
                      sx={{ width: 300 }}
                      value={age}
                      onChange={(event, value) => updateChildAge(value, childIndex)}
                      renderInput={(params) => <TextField {...params} label={translation.child_age} />}
                      key={childIndex}
                    />
                  </div>
                </div>
              ))
            }
          </div>
        ))}

        <div className="text-orange-400 cursor-pointer font-inter" onClick={addRoom} >
          + {translation.add_room}
        </div>
        <div >
          <button onClick={closePopover} className="inline-flex items-center justify-center w-full gap-1 px-3 py-1.5 text-white rounded-md font-inter sm:px-6 bg-emerald-800">{translation.apply}</button>
        </div>
      </div>
    </Popover>
  );
};

export default RoomsPopoever