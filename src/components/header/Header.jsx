import { faBed, faCalendarDays, faCar, faLandmark, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import './header.css'
import {DateRange} from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'

const Header = ({type}) => {
  const { user } = useContext(AuthContext);
  const [openDate, setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
  ]);
  const [destination, setDestination] = useState("")

  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1
  })

  const handleOption = (name, operation) => {
    setOptions(prev => {return {
      ...prev, [name] : operation === "i" ? options[name] + 1 : options[name] -1,
    }})
  }

   // context api to pass location dates and options to other pages
   const {dispatch} = useContext(SearchContext);

  // handle search button
  const navigate = useNavigate();
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options }});
    navigate('/hotels', { state: {destination, dates, options} })
  }
 
  
  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className={"headerList"}>
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Taxis</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faLandmark} />
            <span>Attractions</span>
          </div>
        </div>

        { type !== "list" && 
          <>
            <h1 className="headerTitle">A lifetime of discounts? It's Genius!</h1>
            <p className="headerDesc">Get rewarded for your travels - unlock instant savings of 10% or more with a free Booknow.com account</p>
            {!user && <button className="headerBtn">Sign In / Register</button>}
            {/* search bar */}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className='headerIcon' />
                <input 
                  type="text" 
                  placeholder='Where are you going?' 
                  className='headerSearchInput' 
                  onChange={e=>setDestination(e.target.value)}
                />
              </div>
              {/* date picker */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                {
                  openDate && 
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDates([item.selection]) }
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className='date' 
                      minDate =  {new Date()} 
                      />
                }
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                <span onClick={() => setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult(s) - ${options.children} child(ren) - ${options.room} room(s)`}</span>
                  {openOptions && <div className="options">
                    <div className="optionsItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button 
                          className="optionCounterButton" 
                          onClick={() => handleOption("adult", "d")} 
                          disabled={options.adult <= 1}
                        >-</button                    >
                        <span className="optionCounterNumber">{options.adult}</span>
                        <button 
                          className="optionCounterButton" 
                          onClick={() => handleOption("adult", "i")}
                        >+</button>
                      </div>
                      
                    </div>

                    <div className="optionsItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button className="optionCounterButton" onClick={() => handleOption("children", "d")} disabled={options.children <= 0}>-</button>
                        <span className="optionCounterNumber">{options.children}</span>
                        <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                      </div>
                    </div>

                    <div className="optionsItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button className="optionCounterButton" onClick={() => handleOption("room", "d")} disabled={options.room <= 1}>-</button>
                        <span className="optionCounterNumber">{options.room}</span>
                        <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                      </div>
                    </div>
                  </div>}
                </div>
                <div className="headerSearchItem">
                  <button className="headerBtn" onClick={handleSearch}>Search</button>
                </div>
              </div>
            </>
          }
      </div>
    </div>
  )
}

export default Header