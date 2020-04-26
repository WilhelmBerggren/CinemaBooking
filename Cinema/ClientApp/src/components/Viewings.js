import React, { useState, useEffect } from 'react';
import { fetchData } from './helpers';
import { SeatsPreview } from './SeatPicker';
import * as S from './Styles';

const sortings = {
    'time': (a, b) => (~~a.time > ~~b.time ? 1 : (~~a.time < ~~b.time) ? -1 : 0),
    'movie': (a, b) => {
        if(!a.film || !b.film) return 0;
        if((a.film.name) > (b.film.name))
            return 1; 
        else if (a.film.name < b.film.name)
            return -1; 
        else return 0;
    },
    'salon': (a, b) => {
        if(!a.salon || !b.salon) return 0;
        if((a.salon.name) > (b.salon.name))
            return 1; 
        else if (a.salon.name < b.salon.name)
            return -1; 
        else return 0;
    },
    'tickets': (a, b) => {
        if(!a.salon.seats || !b.salon.seats) return 0;
        if(!a.tickets.length || !b.tickets) return 0;
        if((a.salon.seats - a.tickets.length) > (b.salon.seats - b.tickets.length))
            return 1;
        else if ((a.salon.seats - a.tickets.length) < (b.salon.seats - b.tickets.length))
            return -1;
        return 0;
    }
}

export const Select = ({setOrderBy, setReverse}) => {
    return (
        <S.Select>
            <label>
                Order by: &nbsp;&nbsp;&nbsp;
            </label>
            <select onChange={e => setOrderBy(e.currentTarget.value)}>
                <option value='time'>Time</option>
                <option value='movie'>Movie</option>
                <option value='salon'>Salon</option>
                <option value='tickets'>Tickets</option>
            </select>
            <select onChange={e => setReverse(~~e.currentTarget.value)}>
                <option value='1'>Ascending</option>
                <option value='-1'>Descending</option>
            </select>
        </S.Select>
    );
}

export const Viewings = () => {
    const [viewings, setViewings] = useState(null);
    const [selected, setSelected] = useState(null);
    const [orderBy, setOrderBy] = useState('time');
    const [reverseOrder, setReverse] = useState(1);
    
    useEffect(() => {       
        fetchData('api/viewing', setViewings);
    }, []);

    return (
        <S.ViewingsWrapper>
            <Select setOrderBy={setOrderBy} setReverse={setReverse} />
            {viewings && viewings.sort((a, b) => sortings[orderBy](a, b) * reverseOrder).map(v => (
                <S.Viewing key={v.id}>
                    <S.ViewingDetails onClick={() => selected === v.id ? setSelected(null) : setSelected(v.id)}>
                        <p>Film: {v.film && v.film.name}</p>
                        <p>Salon: {v.salon && v.salon.name}</p>
                        <p>Time: {(v.time / 100)}:{(v.time + '').slice(-2)}</p>
                        <p>Seats: {v.salon.seats - v.tickets.length}</p>
                    </S.ViewingDetails>
                    {(selected === v.id) && <SeatsPreview viewing={v} />}
                </S.Viewing>
            ))}
        </S.ViewingsWrapper>
    )
}
