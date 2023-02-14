import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import './reserve.css'

const Reserve = ({setOpen, hotelId}) => {
    const {data, loading, error} = useFetch(`/api/hotels/room/${hotelId}`);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const {dates} = useContext(SearchContext)

    const getDatesInRanges = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate)
        const date = new Date(start.getTime());
        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }

        return dates;
    }

    const allDates = getDatesInRanges(dates[0].startDate, dates[0].endDate);

    //check if room is available on selected dates
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date => 
            allDates.includes(new Date(date).getTime())
        )

        return !isFound
    }

    // select room
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms (
          checked
            ? [...selectedRooms, value]
            : selectedRooms.filter((item) => item !== value)
        );
    };
    
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                  const res = axios.put(`/api/rooms/availability/${roomId}`, {
                    dates: allDates,
                  });
                  return res.data;
                })
              );
            setOpen(false);
            navigate("/");
        } catch (error) {
            console.log(error)
        } 
    }

  return (
    <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
            <span>Select Your Room:</span>
            {data?.map((item, i) => (
                <div className="rItem" key={i}>
                    <div className="rItemInfo">
                        <div className="rTitle">{item.title}</div>
                        <div className="rDesc">{item.desc}</div>
                        <div className="rMax">
                            Max people: <b>{item.maxPeople}</b>
                        </div>
                        <div className="rPrice">{item.price}</div>
                    </div>       
                    <div className="rSelectRooms">
                        {item.roomNumbers.map((roomNumber) => (
                            <div className="room">
                                <label>{roomNumber.number}</label> 
                                <input 
                                    type="checkbox" 
                                    value={roomNumber._id} 
                                    onChange={handleSelect} 
                                    disabled = {!isAvailable(roomNumber)}
                                />                            
                            </div> 
                        ))} 
                    </div>                                      
                </div>
            ))}
            <button onClick={handleClick} className="rButton">
                 Reserve Now!
            </button>  
        </div>
    </div>
  )
}

export default Reserve