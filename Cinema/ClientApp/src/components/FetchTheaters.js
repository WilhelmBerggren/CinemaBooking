import React, { Component } from 'react';

export class FetchTheaters extends Component {
    static displayName = FetchTheaters.name;

    constructor(props) {
        super(props);
        this.state = { theaters: [], salons: [], loading: true };
    }

    componentDidMount() {
        this.populateTheaterData();
    }

    static renderTheatersTable(theaters) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {theaters.map(theater =>
                        <tr key={theater.name}>
                            <td>{theater.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchTheaters.renderTheatersTable(this.state.theaters);

        return (
            <div>
                <h1 id="tabelLabel" >Theaters</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateTheaterData() {
        const theaterResponse = await fetch('api/theater');
        const salonsResponse = await fetch('api/salons');
        const filmsResponse = await fetch('api/films');
        const ticketsResponse = await fetch('api/tickets');
        const viewingsResponse = await fetch('api/viewings');

        const theaterData = await theaterResponse.json();
        const salonsData = await salonsResponse.json();
        const filmsData = await filmsResponse.json();
        const ticketsData = await ticketsResponse.json();
        const viewingsData = await viewingsResponse.json();

        console.log(JSON.stringify(theaterData, null, 4));
        console.log(JSON.stringify(salonsData, null, 4));
        console.log(JSON.stringify(filmsData, null, 4));
        console.log(JSON.stringify(ticketsData, null, 4));
        console.log(JSON.stringify(viewingsData, null, 4));

        this.setState({ theaters: theaterData, salons: salonsData, loading: false });
    }
}
