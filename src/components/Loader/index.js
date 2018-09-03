import React from 'react';
import './style.css';

export default function Loader() {
  return (
    <main className="wrapper">
      <div className="loader">
        <img className="loader__animated" src="https://image.flaticon.com/icons/svg/561/561071.svg" alt="" />
        <img src="https://image.flaticon.com/icons/svg/560/560969.svg" alt="" />
      </div>
    </main>
  )
}
