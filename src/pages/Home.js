import React from 'react';
import CommandsList from '../components/CommandsList';
import SongList from '../components/SongList';
import './Home.css';

function Home() {
    return (
        <div className='home'>
            <SongList />
            <CommandsList />
        </div>
    );
}

export default Home;
