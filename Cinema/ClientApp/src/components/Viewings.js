import React, { useState, useEffect } from 'react';
import { fetchData } from '../helpers';
import styled from 'styled-components';
import { Viewing } from './Viewing';

const ViewingsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledSelect = styled.div`
    border: 1px solid black;
`;

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
        <ViewingsWrapper>
            <StyledSelect>
                <label>
                    Order by: &nbsp;&nbsp;&nbsp;
                </label>
                <select onChange={e => setOrderBy(e.currentTarget.value)}>
                    <option value='time'>Time</option>
                    <option value='movie'>Movie</option>
                    <option value='salon'>Salon</option>
                </select>
            </StyledSelect>
            {viewings && viewings.sort(sortings[orderBy]).map(v => (
                <Viewing key={v.id} viewing={v} />
            ))}
        </ViewingsWrapper>
    )
}