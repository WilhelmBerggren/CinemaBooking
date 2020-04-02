import React, { useState, useEffect } from 'react';
import { fetchData } from '../helpers';
import { SeatPicker } from './SeatPicker';

export const SeatsPreview = ({viewing}) => {
    const [tickets, setTickets] = useState(null);

    useState(() => {
        (viewing && fetchData(`https://localhost:5001/api/viewing/${viewing.id}/ticket`, setTickets));
    }, [viewing])

    console.log(tickets);
    
    return (viewing && tickets && <SeatPicker viewing={viewing} tickets={tickets} />);
}