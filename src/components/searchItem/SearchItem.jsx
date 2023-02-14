import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext';
import './searchItem.css'

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
        <img className='siImg' src={item.photos[0]} alt="" />
        <div className="siDesc">
            <h1 className="siTitle">{item.name}</h1>
            <span className="siDistance">{item.distance}m from the beach</span>
            <span className="siTaxiOp">Free airport taxi</span>
            <span className="siSubtitle">{item.subtitle}</span>
            <span className="siFeatures">{item.desc}</span>
            <span className="siCancelOp">Free cancelation</span>
            <span className="siCancelOpSubtitle">You can cancel later, lock in this great price today!</span>
        </div>
        {/* Details part */}
        <div className="siDetails">
          {item.rating && <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>}
          <div className="siDetailTexts">
            <span className="siPrice">${item.cheapestPrice}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <Link to={`/hotels/${item._id}`}>
              <button className="siCheckButton">See availabillity</button>
            </Link>            
          </div>
        </div>
    </div>
  )
}

export default SearchItem