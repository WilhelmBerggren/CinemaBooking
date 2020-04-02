import React, { useState, useEffect } from 'react';
import { fetchData } from '../helpers';
import styled from 'styled-components';
import { Viewing } from './Viewing';

const ViewingsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Viewings = () => {
    const [viewings, setViewings] = useState(null);
    const [orderBy, setOrderBy] = useState('time');

    const sortings = {
        'time': (a, b) => (~~a.time - ~~b.time),
        'movie': (a, b) => ((a.film && a.film.name) - (b.film && b.film.name)),
        'salon': (a, b) => ((a.salon && a.salon.name) - (b.salon && b.salon.name))
    }
    
    useEffect(() => {       
        fetchData(`https://localhost:5001/api/viewing`, setViewings);
    }, [orderBy]);

    return (
        <ViewingsWrapper>
            <div>
                <label>
                    Order by: &nbsp;&nbsp;&nbsp;
                </label>
                    <select onChange={e => setOrderBy(e.currentTarget.value)}>
                        <option value='time'>Time</option>
                        <option value='movie'>Movie</option>
                        <option value='salon'>Salon</option>
                    </select>
            </div>
            {viewings && viewings.sort(sortings[orderBy]).map(v => (
                <Viewing key={v.id} viewing={v} />
            ))}
        </ViewingsWrapper>
    )
}