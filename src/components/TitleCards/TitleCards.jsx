import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import Cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {
  const [apiData, setApiData] = useState ([]);
  const cardsRef = useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTQwMTA5ZTU4NmM2Mzg3MDA4MDRkN2ZkOGRhYjM2ZiIsInN1YiI6IjY2NDVmN2U5NmIxYTI2MzViYTgyZTNlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5THQtT4l7pK1Ln_PHyofqYjXQTeo-95fzG3ry54P3o0'
    }
  };
  
  
  const handleWheel = (event)=> {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
}
useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel', handleWheel);
},[])
  return (
    <div className='titlecards'>
      <h2>{title?title:'Popular On Netflix'}</h2>
      <div className="cards-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
