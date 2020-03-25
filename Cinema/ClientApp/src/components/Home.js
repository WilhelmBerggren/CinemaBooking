import React, { useState, useEffect } from 'react';
import { fetchData } from '../helpers';

export const Home = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchData('https://localhost:44369/api/film', setFilms);
  }, []);

  return (
    <div>
      <h1>Welcome to Berra's Bio!</h1>
      <ul>
        {films && films.map(film => <li key={film.name}>{film.name}</li>)}
      </ul>
    </div>
  )
}
