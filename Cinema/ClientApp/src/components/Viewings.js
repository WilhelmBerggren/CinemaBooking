import React, { useState, useEffect } from 'react';

export const Viewings = () => {
    const [viewings, setViewings] = useState(null);

    const fetchViewings = async () => {
        const res = await fetch('api/viewing');
        const data = await res.json();
        setViewings(data); 
    }

    useEffect(() => {
        fetchViewings();
    }, []);

    return (
        <div>
            {viewings && viewings.map(viewing => <p key={viewing.id}>{JSON.stringify(viewing)}</p>) }
        </div>
    )
}