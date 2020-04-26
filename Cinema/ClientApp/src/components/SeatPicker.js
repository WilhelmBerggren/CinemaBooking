import React, { useState } from 'react';
import { fetchData } from './helpers';
import * as S from './Styles';

export const SeatsPreview = ({viewing}) => {
  const [tickets, setTickets] = useState(null);
  const [selectedSeats, setSeats] = useState([]);

  const sortedSeats = (tickets && tickets.map(s => s.seat).sort((a, b) => a - b));

  useState(() => {
      (viewing && fetchData(`api/viewing/${viewing.id}/ticket`, setTickets));
  }, [viewing, selectedSeats])
  
  return (viewing && tickets && (
      <S.Salon>
          {[...Array(viewing.salon.seats).keys()].map(n => n+1).map(n => { // [0, 1, 2, ..., (viewing.salon.seats - 1)]
            const seat = {number: n, picked: (sortedSeats.indexOf(n) === -1) ? 0 : 1};
            return(
              seat.picked ? 
                <S.PickedSeat key={n} disabled>{n}</S.PickedSeat> : 
                selectedSeats.includes(n) ?
                  <S.PendingSeat key={n} onClick={() => setSeats(selectedSeats.filter(s => s !== n))}>{n}</S.PendingSeat> :
                  <S.Seat key={n} onClick={() => selectedSeats.length < 12 ? setSeats([...selectedSeats, n]) : null}> {n} </S.Seat>
            )})}
          {selectedSeats && <BookViewing selectedSeats={selectedSeats} setSeats={setSeats} viewing={viewing}/>}
      </S.Salon>
  ));
}

export const BookViewing = ({selectedSeats, setSeats, viewing}) => {
  const [res, setRes] = useState(null);

  const submit = async (method, body, setData) => {
    await fetchData('api/ticket', setData, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }
  
  const submitTickets = async (event) => {
    event.preventDefault();
    await submit('POST', selectedSeats.map(n => ({seat: n, viewing: {id: viewing.id}})), setRes);
  }

  const deleteTickets = async (event) => {
    event.preventDefault();
    await submit('DELETE', res, setRes);

    if(res && Array.isArray(res)) {
      setRes(null);
      setSeats([]);
    }
  }

  if(selectedSeats.length === 0) return <></>;

  return (
    <>
      <p>Selected seats:</p>
      {(selectedSeats !== []) && (res == null) && (
        <form onSubmit={submitTickets}>
          <input type="hidden" value={selectedSeats} name="seat"/>
          <input type="submit" value={`Book: ${selectedSeats.join(', ')}`}/>
        </form>)}
      {Array.isArray(res) && (
        <form onSubmit={deleteTickets}>
          <input type="hidden" value={selectedSeats} name="seat"/>
          <input type="submit" value={`Unbook: ${res.map(s => s.seat).join(', ')}`}/>
        </form>)}
      {res && !Array.isArray(res) && <p>Error: {JSON.stringify(res)}</p>}
    </>
  )
}
