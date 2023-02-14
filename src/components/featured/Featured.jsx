import React from 'react'
import useFetch from '../../hooks/useFetch'
import './featured.css'

const Featured = () => {

  const { data, loading, error, reFetch } = useFetch(
    "/api/hotels/countByCity?cities=toronto,niagara falls, barrie, ottawa, mississauga"
  );


  return (
    <div className='featured'>
        {loading ? "Loading, please wait." : <><div className="featuredItem large">
          <img src="https://images.unsplash.com/photo-1603466182843-75f713ba06b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="featuredImg" />  
          <div className="featuredTitle">
            <h1>Toronto</h1>
            <h2>{data[0]} properties</h2>
          </div>
        </div>
        <div className="featuredItem large">
          <img src="https://images.unsplash.com/photo-1463695970743-ae65cca05743?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="featuredImg" />  
          <div className="featuredTitle">
            <h1>Niagara Falls</h1>
            <h2>{data[1]} properties</h2>
          </div>
        </div>
        <div className="featuredItem small">
          <img src="https://www.tourismbarrie.com/images/default-source/photo-gallery---barrie-all-seasons/_mg_7087.jpg?sfvrsn=a0d42c13_2" alt="" className="featuredImg" />  
          <div className="featuredTitle">
            <h1>Barrie</h1>
            <h2>{data[2]} properties</h2>
          </div>
        </div>
        <div className="featuredItem small">
          <img src="https://images.unsplash.com/photo-1613059713171-13462f7fff92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="" className="featuredImg" />  
          <div className="featuredTitle">
            <h1>Ottawa</h1>
            <h2>{data[3]} properties</h2>
          </div>
        </div>
        <div className="featuredItem small">
          <img src="https://media.gettyimages.com/id/1130742901/photo/downtown-mississauga-ontario-canada.jpg?s=2048x2048&w=gi&k=20&c=qgLc5MizMeNECng6xCkLkkvgsMwB03bcYAt497Dl7JY=" alt="" className="featuredImg" />  
          <div className="featuredTitle">
            <h1>Mississauga</h1>
            <h2>{data[4]} properties</h2>
          </div>
        </div></>}
    </div>
  )
}

export default Featured