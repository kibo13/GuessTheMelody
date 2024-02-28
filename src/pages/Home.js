import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/firebase/firebase.utils';

import Loader from '../components/Loader';
import './Home.css';

function Home() {
    const [categories, setCategories] = useState([]);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true);
            const categoriesData = await fetchData('categories');
            const songsData = await fetchData('songs');
            setCategories(categoriesData.data);
            setSongs(songsData.data);
            setLoading(false);
        };

        fetchDataAsync();
    }, []);

    if (loading) {
        return <Loader />;
    }

    const songsByCategory = categories.map((category) => ({
        ...category,
        songs: songs.filter((song) => song.categoryId === category.id),
    }));

    console.log(songsByCategory);

    return (
        <div className='home'>
            <div className='song-list-wrapper'>
                {songsByCategory.map((category) => (
                    <div key={category.id} className='song-list-row'>
                        <div className='song-list-cell'>{category.name}</div>
                        {category.songs.map((song) => (
                            <div key={song.id} className='song-list-cell'>
                                <a className='song-list-link' href={song.url}>
                                    10
                                </a>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className='command-list-wrapper'>CommandsList</div>
        </div>
    );
}

export default Home;
