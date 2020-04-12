import React, { useState } from 'react';
import { fetchData } from './helpers';
import * as S from './Styles';

export const SeatsPreview = ({viewing}) => {
  const [tickets, setTickets] = useState(null);
  const [selectedSeat, setSeat] = useState(null);

  const sortedSeats = (tickets && tickets.map(s => s.seat).sort((a, b) => a - b));

  useState(() => {
      (viewing && fetchData(`api/viewing/${viewing.id}/ticket`, setTickets));
  }, [viewing, selectedSeat])
  
  return (viewing && tickets && (
      <S.Salon>
          {[...Array(viewing.salon.seats).keys()].map(n => { // [0,1,2,...,viewing.salon.seats]
            const seat = {number: n+1, picked: (sortedSeats.indexOf(n+1) === -1) ? 0 : 1};
            return(
              seat.picked ? 
                <S.PickedSeat key={n+1} disabled>{n+1}</S.PickedSeat> : 
                <S.Seat key={n+1} onClick={() => setSeat(n+1)}>
                  {n+1}
                </S.Seat>
            )})}
          {selectedSeat && <BookViewing seatNumber={selectedSeat} viewing={viewing}/>}
      </S.Salon>
  ));
}

export const BookViewing = ({seatNumber, viewing}) => {
  const [res, setRes] = useState(null);

  const submit = async (method, body, setData) => {
    console.log("submitting:", JSON.stringify(body));
    await fetchData('api/ticket', setData, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }
  
  const submitTicket = async (event) => {
    event.preventDefault();
    console.log({seat: seatNumber, viewing: {id: viewing.id}});
    await submit('POST', {seat: seatNumber, viewing: {id: viewing.id}}, setRes);
  }

  const deleteTicket = async (event) => {
    event.preventDefault();
    await submit('DELETE', res, setRes);

    if(res && res.id) setRes(null);
  }

  return (
    <>
      <p>Book ticket:</p>
      {(res == null) && (
        <form onSubmit={submitTicket}>
          <input type="hidden" value={seatNumber} name="seat"/>
          <input type="submit" value={`Book seat ${seatNumber}`}/>
        </form>)}
      {res && res.id && (
        <form onSubmit={deleteTicket}>
          <input type="hidden" value={seatNumber} name="seat"/>
          <input type="submit" value={`Unbook seat ${seatNumber}`}/>
        </form>)}
      {res && !res.id && <p>Error: {JSON.stringify(res)}</p>}
    </>
  )
}
