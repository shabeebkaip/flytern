import React from 'react'
import HistoryIcon from '@mui/icons-material/History';
import  HeaderBorder  from '@/app/shared/components/HeaderBorder';
import { connect } from 'react-redux';

const HotelRecentSeach = (props) => {
  const { hotelRecentSearch } = props
  const searchRecent = (search) => {
    if (typeof window !== "undefined") {
      let payload = { ...search }; // Create a shallow copy of the search object
      localStorage.setItem('hotelSearch', JSON.stringify(payload)); // Store payload in localStorage
      window.location.href = '/hotels/search'; // Redirect to the hotels search page
    }
  };
  
  return (
    <div className='px-4'>

      {
        hotelRecentSearch?.length ?
          <div className='mt-4'>
            <div>
              <div className='flex gap-3 flex-start'>
                <HistoryIcon className='text-orange-400' />
                <h4>Recent Search</h4>
              </div>
              <HeaderBorder />
            </div>
            <div className='flex flex-wrap justify-start gap-2 mt-4 '>
              {
                hotelRecentSearch?.map((item, index) => (
                  <div key={index} onClick={() => searchRecent(item)} className='flex-wrap px-2 py-1 transition-all duration-300 border border-orange-400 cursor-pointer rounded-xl hover:bg-orange-400 hover:text-white'>
                    {item?.destination}
                  </div>
                ))
              }
            </div>
          </div>
          : null
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    hotelRecentSearch: state.exploresState?.hotelQuickSearch
  }
}

export default connect(mapStateToProps)(HotelRecentSeach)