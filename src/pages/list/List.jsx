import React, { useState } from 'react'
import { DateRange } from 'react-date-range'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import './list.css'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'


const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  const [options, setOptions] = useState(location.state.options)
  const [openDate, setOpenDate] = useState(false)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { data, loading, error, reFetch } = useFetch(
    `${process.env.REACT_APP_URL}/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
    console.log(destination)
  }

  return (
    <div>
      <Navbar />
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input type="text" placeholder={destination} onChange ={(e) => {setDestination(e.target.value)}}/>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span className='checkInDate' onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                onChange={(item) => setDates([item.selection])}
                minDate={new Date()}
                ranges={dates}
                className='calendar'
                />
              )}         
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptionsWrapper">
                {/* set min price */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input className='lsOptionInput' onChange={e => setMin(e.target.value)} type="number" />
                </div>
                {/* set max price */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input className='lsOptionInput' onChange={e => setMax(e.target.value)} type="number" min={0}/>
                </div>
                {/* number of guests option */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Adult
                  </span>
                  <input className='lsOptionInput' type="number" placeholder={options.adult} min={1}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Children
                  </span>
                  <input className='lsOptionInput' type="number" placeholder={options.children} min={0}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Room
                  </span>
                  <input className='lsOptionInput' type="number" placeholder={options.room} min={1}/>
                </div>
              </div>
            </div>
            <button className='lsSearchBtn' onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item, _id) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List