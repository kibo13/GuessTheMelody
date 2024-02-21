import React from 'react';
import { Table } from 'react-bootstrap';
import './SongList.css';

function SongList() {
    const categories = [
        { name: 'Песни из мультфильмов', color: 'orange' },
        { name: 'Песни 90-х', color: 'green' },
        { name: 'Хиты- 21 века', color: 'red' },
        { name: 'Из бабушкиного сундучка', color: 'blue' },
        { name: 'Времена года', color: 'purple' },
    ];

    return (
        <div className='song-list-container'>
            {categories.map((category, index) => (
                <div key={index} className='song-list-row'>
                    {[...Array(6)].map((_, colIndex) => (
                        <div key={colIndex} className='song-list-cell'>
                            {colIndex === 0 ? category.name : 100 * colIndex}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default SongList;
