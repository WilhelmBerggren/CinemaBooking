import React, { useState } from 'react';
import { fetchData } from '../helpers';
import styled from 'styled-components';

const StyledSalon = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

// const StyledRow = styled.div`
//   display:flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: normal;
//   width: 100%;
// `;

const StyledSeat = styled.button`
  font-weight: bold;
  padding: 0;
  flex: 1 1 9.99%;
`;

export const BookViewing = ({seatNumber, viewing}) => {
    //const [seat, setSeat] = useState(null);
    const [res, setRes] = useState(null);
  
    const submit = async (method, body) => {
      await fetchData(`api/ticket`, setRes, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      console.log('res:', res);
    }
    
    const submitTicket = async (event) => {
      event.preventDefault();
      console.log('body', JSON.stringify({seat: seatNumber, viewing: {id: viewing.id}}));
      submit('POST', {seat: seatNumber, viewing: {id: viewing.id}});
    }

    const deleteTicket = async (event) => {
      event.preventDefault();
      console.log('body:', res);
      await submit('DELETE', res);

      if(res && res.id) {
        setRes(null);
      }
    }
  
    return (
      <>
        <p>Book ticket:</p>
        {(res == null) && <form onSubmit={submitTicket}>
          <input type="hidden" value={seatNumber} name="seat"/>
          <input type="submit" value={`Book seat ${seatNumber}`}/>
        </form>}
        {res && res.id && (
          <form onSubmit={deleteTicket}>
            <input type="hidden" value={seatNumber} name="seat"/>
            <input type="submit" value={`Unbook seat ${seatNumber}`}/>
          </form>)}
        {res && !res.id && <p>Result: {JSON.stringify(res)}</p>}
      </>
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
        <>
            {row.map(seat => (
                <Seat key={seat.number} 
                      number={seat.number} 
                      picked={seat.picked} 
                      setSeat={() => !seat.picked ? setSeat(seat.number) : null}
                />
            ))}
        </>
    )
}

export const SeatPicker = ({ viewing, tickets }) => {
    const [selectedSeat, setSeat] = useState(null);
    const rows = getLayout(viewing.salon.seats, tickets);

    return (
        <StyledSalon>
            {/* {rows.map(row => (<StyledRow key={row[0].number}>
                <Row row={row} setSeat={setSeat}/>
            </StyledRow>))} */}
            {rows.map(seat => (
              <Seat key={seat.number} 
                      number={seat.number} 
                      picked={seat.picked} 
                      setSeat={() => !seat.picked ? setSeat(seat.number) : null}
                />))}
            {selectedSeat && <BookViewing seatNumber={selectedSeat} viewing={viewing}/>}
        </StyledSalon>
    );
}

function getLayout(capacity, tickets) {
  const sortedSeats = tickets.map(s => s.seat).sort((a, b) => a - b);
  const seats = [...Array(capacity).keys()].map(n => {
      return {number: n+1, picked: (sortedSeats.indexOf(n+1) === -1) ? 0 : 1}
  });
  return seats;

  // const rowSize = ~~(capacity / 5);
  // const rows = Array.from(
  //   {length: ~~(capacity / rowSize)}, 
  //   (v, i) => seats.slice(i * rowSize, i * rowSize + rowSize)
  // );

  // return rows;
}