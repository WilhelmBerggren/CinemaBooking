import React, { useState, useEffect } from 'react';
import { fetchData } from '../helpers';
import { SeatPicker } from './SeatPicker';
import { Viewings } from './Viewings';

export const ViewingDetails = ({viewing}) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchData(`https://localhost:5001/api/viewing/${viewing.id}/ticket`, setTickets)
  }, [viewing]);

  return (
    <div>
      <h1>Viewing details:</h1>
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
      <div className="row">
        {viewings && viewings.map(viewing => <div className="item" key={viewing.id} onClick={() => setViewing(viewing)}>{viewing.salon.name} : {viewing.time}</div>)}
      </div>
      {selectedViewing && <ViewingDetails viewing={selectedViewing}/>}
    </div>
  )
}

export const Home = () => {
  return (
    <div>
      <h1>Welcome to Berra's Bio! Movies:</h1>
      <Viewings />
      {/* <div className="row">
        {films && films.map(film => <div className="item" key={film.name} onClick={() => setFilm(film)}>{film.name}</div>)}
      </div>
      {selectedFilm && <FilmDetails film={selectedFilm} />} */}
    </div>
  )
}
