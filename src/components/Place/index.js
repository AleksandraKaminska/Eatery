import React from 'react';
import Bookmark from 'components/Bookmark'
import './style.css';

const Place = ({ el, el: {
  id,
  featured_image: featuredImage,
  name,
  cuisines,
  location: { address },
  user_rating: userRating,
  price_range: priceRange
}}) => {
  const price = [ ...Array(priceRange).keys() ].reduce((prev, curr) => prev + '$', '')
  return (
    <li className="place">
      <a href={`/restaurant/${id}`} className="place__container">
        <img src={featuredImage} alt={name} className="place__image" />
        <div className="place__info">
          <Bookmark rating={userRating} />
          <p className="place__categories">{cuisines}</p>
          <h3 className="place__title">
            {name}
            <span className="place__price"> | {price}</span>
          </h3>
          <p className="place__location">{address}</p>
        </div>
      </a>
    </li>
  )
}

export default Place