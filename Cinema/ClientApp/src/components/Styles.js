import styled from 'styled-components';

export const Salon = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-left: -0.5em;
  margin-right: -0.5em;
`;

export const Seat = styled.button`
  font-weight: bold;
  background: lightgreen;
  color:black;
  padding: 0;
  flex: 1 1 9.99%;
`;

export const PickedSeat = styled.button`
  font-weight: bold;
  background: grey;
  color:black;
  padding: 0;
  flex: 1 1 9.99%;
`;

export const Viewing = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    margin: 1em 0;
    box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
`;

export const ViewingDetails = styled.div`
    display: flex;
    flex-direction: row;
    > p {
        margin: 1em;
    }
`;

export const ViewingsWrapper = styled.div`
display: flex;
flex-direction: column;
`;

export const Select = styled.div`
box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
`;
