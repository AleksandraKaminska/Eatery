import React from 'react'
import './style.css'

export default function Bookmark({ rating }) {
  return rating && parseFloat(rating.aggregate_rating) ? (
    <div className="bookmark">
      <p className="rating">{rating.aggregate_rating}</p>
      <p className="star">{String.fromCharCode(9733)}</p>
    </div>
  ) : null
}
