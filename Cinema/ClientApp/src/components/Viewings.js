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
    }
}

export const Select = ({setOrderBy}) => {
    return (
        <S.Select>
            <label>
                Order by: &nbsp;&nbsp;&nbsp;
            </label>
            <select onChange={e => setOrderBy(e.currentTarget.value)}>
                <option value='time'>Time</option>
                <option value='movie'>Movie</option>
                <option value='salon'>Salon</option>
            </select>
        </S.Select>
    );
}

export const Viewings = () => {
    const [viewings, setViewings] = useState(null);
    const [selected, setSelected] = useState(null);
    const [orderBy, setOrderBy] = useState('time');
    
    useEffect(() => {       
        fetchData('api/viewing', setViewings);
    }, []);

    return (
        <S.ViewingsWrapper>
            <Select setOrderBy={setOrderBy} />
            {viewings && viewings.sort(sortings[orderBy]).map(v => (
                <S.Viewing key={v.id} onClick={() => setSelected(v.id === selected ? null : v.id)}>
                    <S.ViewingDetails>
                        <p>{v.film && v.film.name}</p>
                        <p>{v.salon && v.salon.name}</p>
                        <p>{v.time}</p>
                    </S.ViewingDetails>
                    {(selected === v.id) && <SeatsPreview viewing={v}/>}
                </S.Viewing>
            ))}
        </S.ViewingsWrapper>
    )
}
