import React, { useState, useEffect } from 'react';
import { fetchData } from '../helpers';
import styled from 'styled-components';
import { SeatsPreview } from './SeatsPreview';

const StyledViewing = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    margin: 1em 0;
    border: 1px solid black;
`;

const ViewingDetails = styled.div`
    display: flex;
    flex-direction: row;
    > p {
        margin: 1em;
    }
`;

export const Viewing = ({viewing}) => {
    const [isToggled, setToggled] = useState(false);
    const toggle = () => setToggled(!isToggled);

    return ( 
        viewing.film &&
        <StyledViewing>
            <ViewingDetails onClick={toggle}>
                <p>{viewing.film && viewing.film.name}</p>
                <p>{viewing.salon && viewing.salon.name}</p>
                <p>{viewing.time}</p>
                <p>{viewing.tickets && viewing.tickets.length}</p>
            </ViewingDetails>
            {isToggled && <SeatsPreview viewing={viewing}/>}
        </StyledViewing>
    );
}