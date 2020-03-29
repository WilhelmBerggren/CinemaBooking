import React, { useState, useEffect } from 'react';
import { fetchData } from '../helpers';
import { SeatPicker } from './SeatPicker';

export const ViewingDetails = ({viewing}) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchData(`https://localhost:5001/api/viewing/${viewing.id}/ticket`, setTickets)
  }, [viewing]);

  return (
    <div>
      <h1>Viewing details:</h1>
      <p>Tickets: {tickets && tickets.map(ticket => ticket.seat).sort((a, b) => a - b).join()}</p>
      <p>Available seats: {viewing && tickets && (viewing.salon.seats - tickets.length)}</p>
      {viewing && tickets && <SeatPicker viewing={viewing} tickets={tickets}/>}
    </div>
  )
}

export const FilmDetails = ({film}) => {
  const [viewings, setViewings] = useState([]);
  const [selectedViewing, setViewing] = useState(null);

  useEffect(() => {
    fetchData(`https://localhost:5001/api/film/${film.id}/viewings`, setViewings);
    setViewing(null);
  }, [film]);

  return (
    <div>
      <h1>Film details:</h1>
      {film && <h2>{film.name}</h2>}
      {viewings && viewings.map(viewing => <li key={viewing.id} onClick={() => setViewing(viewing)}>{viewing.salon.name} : {viewing.time}</li>)}
      {selectedViewing && <ViewingDetails viewing={selectedViewing}/>}
    </div>
  )
}

export const Home = () => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setFilm] = useState(null);

  useEffect(() => {
    fetchData('https://localhost:5001/api/film', setFilms);
  }, []);

  return (
    <div>
      <h1>Welcome to Berra's Bio!</h1>
      <ul>
        {films && films.map(film => <li key={film.name} onClick={() => setFilm(film)}>{film.name}</li>)}
        {selectedFilm && <FilmDetails film={selectedFilm} />}
      </ul>
    </div>
  )
}
