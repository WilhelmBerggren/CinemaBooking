import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSalon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledRow = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledSeat = styled.button`
  font-weight: bold;
`;

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
        <StyledSeat onClick={setSeat} className={`seat ${picked ? 'picked' : 'unpicked'}`}>
             {number}
        </StyledSeat>
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
        <StyledSalon>
            {rows.map(row => (<StyledRow>
                <Row key={row[0].number} row={row} setSeat={setSeat}/>
            </StyledRow>))}
            {selectedSeat && <BookViewing seatNumber={selectedSeat} viewing={viewing}/>}
        </StyledSalon>
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