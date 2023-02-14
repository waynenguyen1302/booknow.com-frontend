import React, { useContext, useState } from 'react'
import './hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve.jsx'

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false)

  const {data, loading, error} = useFetch(`/api/hotels/find/${id}`);

  // context api to pass location dates and options to other pages
  const {dates, options} = useContext(SearchContext);
  
  // Calculate the number of dates from our date range
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpenModal = (index) => {
    setSlideNumber(index)
    setOpenModal(true)
  }

  const handleChangeSlide = (direction) => {
    let newSlideNumber;

    if(direction ==='left') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  }

  // book now button
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openBookingModal, setOpenBookingModal] = useState(false);

  const handleClick = () => {
    if (user) {
      setOpenBookingModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type='list'/>
      {loading ? ("loading") : (
      <div className="hotelContainer"> 
        {openModal &&
          <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpenModal(false)} />
            <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow left' onClick={() => handleChangeSlide("left")} />
            <div className="sliderWrapper">
              <img 
                src={data.photos[slideNumber]} 
                alt="fullscreen" 
                className="sliderImg" 
              />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className='arrow right' onClick={() => handleChangeSlide("right")}/>            
          </div>}   
        <div className="hotelWrapper">
          <button onClick={handleClick} className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">Excellent location - {data.distance}m from center</span>
          <span className="hotelPriceHighlight">Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi</span>
          <div className="hotelImages">
            {data.photos?.map((photo, index) => (
              <div className="hotelImgWrapper">
                <img 
                  key={index}
                  onClick={() => handleOpenModal(index)}
                  src={photo} 
                  alt="room" 
                  className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
            <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">
                  {data.desc}
                </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>)}
      {openBookingModal && <Reserve setOpen={setOpenBookingModal} hotelId={id}/>}
    </div>
  )
}

export default Hotel