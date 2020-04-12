import React, { useState, useEffect } from 'react';
import { fetchData } from './helpers';
import { SeatsPreview } from './SeatPicker';
import * as S from './Styles';

export const Viewings = () => {
    const [viewings, setViewings] = useState(null);
    const [orderBy, setOrderBy] = useState('time');

    const sortings = {
        'time': (a, b) => (~~a.time > ~~b.time ? 1 : -1),
        'movie': (a, b) => ((a.film && a.film.name) > (b.film && b.film.name) ? 1 : -1),
        'salon': (a, b) => ((a.salon && a.salon.name) > (b.salon && b.salon.name) ? 1 : -1)
    }
    
    useEffect(() => {       
        fetchData('api/viewing', setViewings);
    }, [orderBy]);

    return (
        <S.ViewingsWrapper>
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
            {viewings && viewings.sort(sortings[orderBy]).map(v => (
                <Viewing key={v.id} viewing={v} />
            ))}
        </S.ViewingsWrapper>
    )
}

export const Viewing = ({viewing}) => {
    const [isToggled, setToggled] = useState(false);
    const toggle = () => setToggled(!isToggled);

    return ( 
        viewing.film &&
        <S.Viewing>
            <S.ViewingDetails onClick={toggle}>
                <p>{viewing.film && viewing.film.name}</p>
                <p>{viewing.salon && viewing.salon.name}</p>
                <p>{viewing.time}</p>
            </S.ViewingDetails>
            {isToggled && <SeatsPreview viewing={viewing}/>}
        </S.Viewing>
    );
}
