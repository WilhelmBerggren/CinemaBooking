import React, { useState } from 'react';

export const BookViewing = ({seatNumber, viewing}) => {
    //const [seat, setSeat] = useState(null);
    const [res, setRes] = useState(null);
  
    console.log("res:", res);
    console.log("seat: ", seatNumber);
  
    const submitTicket = async (event) => {
      event.preventDefault();
      console.log("submitting:", JSON.stringify({seat: seatNumber, viewing: {id: viewing.id}}));
      const response = await fetch(`https://localhost:5001/api/ticket`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({seat: seatNumber, viewing: {id: viewing.id}})
      });
      const json = await response.json()
      setRes(json);
    }

    const deleteTicket = async (event) => {
      event.preventDefault();
      console.log("deleting:", JSON.stringify({seat: seatNumber, viewing: {id: viewing.id}}));
      const response = await fetch(`https://localhost:5001/api/ticket`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({seat: seatNumber, viewing: {id: viewing.id}})
      });
      const json = await response.json();
      setRes(json);
    }
  
    return (
      <div>
        <h1>Book ticket:</h1>
        <form onSubmit={submitTicket}>
          <input type="hidden" value={seatNumber} name="seat"/>
          <input type="submit" value={`Book seat ${seatNumber}`}/>
        </form>
        {res && <p>Result: {JSON.stringify(res)}</p>}
        {res && <form onSubmit={deleteTicket}>
          <input type="hidden" value={seatNumber} name="seat"/>
          <input type="submit" value={`Unbook seat ${seatNumber}`}/>
        </form>}
      </div>
    )
  }
  
export const Seat = ({ number, picked, setSeat }) => {
    return (
        <button onClick={setSeat} className={`seat ${picked ? 'picked' : 'unpicked'}`}>
             {number}
        </button>
    )
}

export const Row = ({ row, setSeat }) => {
    return (
        <div className="row">
            {row.map(seat => (
                <Seat key={seat.number} 
                      number={seat.number} 
                      picked={seat.picked} 
                      setSeat={() => !seat.picked ? setSeat(seat.number) : null}
                />
            ))}
        </div>
    )
}

export const SeatPicker = ({ viewing, tickets }) => {
    const [selectedSeat, setSeat] = useState(null);
    const rows = getLayout(viewing.salon.seats, tickets);
    //console.log("rows: ", rows);
    console.log("seleced seat: ", selectedSeat);

    return (
        <div className="Salon">
            {rows.map(row => <Row key={row[0].number} row={row} setSeat={setSeat}/>)}
            {selectedSeat && <BookViewing seatNumber={selectedSeat} viewing={viewing}/>}
        </div>
    );
}

function getLayout(capacity, tickets) {
  const sortedSeats = tickets.map(s => s.seat).sort((a, b) => a - b);
  const seats = [...Array(capacity).keys()].map(n => {
      return {number: n+1, picked: (sortedSeats.indexOf(n+1) === -1) ? 0 : 1}
  });

  const rowSize = ~~(capacity / 5);
  const rows = Array.from(
    {length: ~~(capacity / rowSize)}, 
    (v, i) => seats.slice(i * rowSize, i * rowSize + rowSize)
  );

  return rows;
}