import React from 'react'
import useFetch from '../../hooks/useFetch';
import './propertyList.css'


const PropertyList = () => {

    const { data, loading, error, reFetch } = useFetch(
        "/api/hotels/countByType"
      );

    const images = [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    ];

  return (
    <div className="pList">
        {/* We can use loading component here */}
        {loading? 
        "loading" : 
        <>
            {data && images.map( (img, i) => (
                <div className="pListItem" key={i}>
                <img 
                    className='pListImg' 
                    src={img}
                    alt="featured-listing-type" 
                    />
                <div className="pListTitle">
                    <h1>{data[i]?.type}</h1>
                    <p>{data[i]?.count} {data[i]?.type}</p>
                </div>
            </div>))
            }
        </>}
    </div>
  )
}

export default PropertyList