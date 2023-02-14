import React from 'react'
import './mailList.css'

const MailList = () => {
  return (
    <div className='mail'>
        <h1 className="mailTitle">Save time, save money!</h1>
        <span className="mailDesc">Sign up for the best deals every week</span>
        <div className="mailInputContainer">
            <input type="text" placeholder='Your Email Address' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default MailList