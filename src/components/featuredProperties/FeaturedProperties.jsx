import React from 'react'
import useFetch from '../../hooks/useFetch';
import './featuredProperties.css'
import {Link} from 'react-router-dom'

const FeaturedProperties = () => {
    const { data, loading, error, reFetch } = useFetch(
        `${process.env.REACT_APP_URL}/hotels?featured=true&limit=4` //set limit here
    );

  return (
    <div className='fp'>
        
        { loading ? "Loading" : (  
            <>      
                {data.map((item) => (
                    <div className="" key={item._id}>
                        <Link className='fpItem' to={`/hotels/${item._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <img className='fpImg' src={item.photos[0]} alt="property" /> 
                            <span className="fpName">{item.name}</span>
                            <span className="fpCity">{item.city}</span>
                            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                            {item.rating && <div className="fpRating">
                                <button>{item.rating}</button>
                                <span>Excellent - 506 reviews</span>
                            </div>}
                        </Link>
                    </div>
                ))}
            </>
        )}
    
               
    </div>
  )
}

export default FeaturedProperties