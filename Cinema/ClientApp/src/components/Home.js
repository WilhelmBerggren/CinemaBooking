import React, { useState, useEffect } from 'react';
import { fetchData } from '../helpers';

export const BookViewing = ({viewing, tickets}) => {
  const [seat, setSeat] = useState(null);
  const [res, setRes] = useState(null);

  const submitTicket = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://localhost:44369/api/ticket`, {
      method: 'PUT',
      body: JSON.stringify({})
    });
    const json = await response.json()
    setRes(json);
  }

  return (
    <div>
      <h1>Book ticket:</h1>
      <form> onSubmit={submitTicket}
        <input type="number" placeholder="seat number" name="seat"/>
        <input type="submit"/>
      </form>
      {res && <p>Result: {JSON.stringify(res)}</p>}
    </div>
  )
}

export const ViewingDetails = ({viewing}) => {
  const [tickets, setTickets] = useState([]);

  console.log("tickets:", tickets);

  useEffect(() => {
    fetchData(`https://localhost:44369/api/viewing/${viewing.id}/tickets`, setTickets)
  }, [viewing]);

  return (
    <div>
      <h1>Viewing details:</h1>
      <p>Tickets: {tickets && tickets.map(ticket => ticket.seat).sort((a, b) => a - b).join()}</p>
      <p>Available seats: {viewing && tickets && (viewing.salon.seats - tickets.length)}</p>
    </div>
  )
}

export const FilmDetails = ({film}) => {
  const [viewings, setViewings] = useState([]);
  const [selectedViewing, setViewing] = useState(null);

  console.log("viewing:", selectedViewing);

  useEffect(() => {
    fetchData(`https://localhost:44369/api/film/${film.id}/viewings`, setViewings);
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

  console.log("film:", selectedFilm);

  useEffect(() => {
    fetchData('https://localhost:44369/api/film', setFilms);
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
