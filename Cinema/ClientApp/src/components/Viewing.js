import React, { useState } from 'react';
import styled from 'styled-components';
import { SeatsPreview } from './SeatsPreview';

const StyledViewing = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    margin: 1em 0;
    box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
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