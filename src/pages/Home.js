import React, { useState, useEffect } from 'react';
import { fetchData, updateData } from '../services/firebase/firebase.utils';

import Loader from '../components/Loader';
import TeamModal from '../components/TeamModal';
import AudioPlayer from '../components/AudioPlayer';
import './Home.css';

function Home() {
    const [categories, setCategories] = useState([]);
    const [songs, setSongs] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTeam, setSelectedTeam] = useState({ id: '', name: '' });
    const [selectedSong, setSelectedSong] = useState({ id: '', name: '' });

    const handleSongClick = async (song) => {
        setSelectedSong(song.url);

        await updateData('songs', song.id, {
            isActive: false,
        });

        setSongs((prevSongs) =>
            prevSongs.map((prevSong) => {
                if (prevSong.id === song.id) {
                    return { ...prevSong, isActive: false };
                }
                return prevSong;
            }),
        );
    };

    const handleTeamClick = (team) => {
        setSelectedTeam(team);
    };

    const handlePointsChange = async (event, teamId) => {
        const newPoints = parseInt(event.target.value);

        if (!isNaN(newPoints)) {
            const updatedTeams = teams.map((team) => {
                if (team.id === teamId) {
                    return { ...team, points: newPoints };
                }
                return team;
            });

            setTeams(updatedTeams);

            await updateData('teams', teamId, {
                points: newPoints,
            });
        }
    };

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true);
            const categoriesData = await fetchData('categories');
            const songsData = await fetchData('songs');
            const teamsData = await fetchData('teams');
            setCategories(categoriesData.data);
            setSongs(songsData.data);
            setTeams(teamsData.data);
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

    return (
        <div>
            <div className='home'>
                <div className='team-block'>
                    {teams.map((team, index) => (
                        <div key={team.id} className='team-card'>
                            <span className='team-badge badge bg-primary'>Команда {++index}</span>
                            <button
                                className='team-name'
                                data-bs-toggle='modal'
                                data-bs-target='#teamModal'
                                onClick={() => handleTeamClick(team)}>
                                {team.name}
                            </button>
                            <div className={`team-group ${index % 2 === 0 ? 'team-group-even' : 'team-group-odd'}`}>
                                <input
                                    type='number'
                                    className='team-rate'
                                    min={0}
                                    max={300}
                                    step={10}
                                    value={team.points}
                                    onChange={(event) => handlePointsChange(event, team.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className='song-list-wrapper'>
                    {songsByCategory.map((category) => (
                        <div key={category.id} className='song-list-row'>
                            <div className='song-list-cell' style={{ backgroundColor: `${category.color}` }}>
                                {category.name}
                            </div>
                            {category.songs.map((song) => (
                                <div
                                    key={song.id}
                                    className='song-list-cell song-list-animation'
                                    style={{ backgroundColor: `${song.isActive ? category.color : '#d4d4d4'}` }}>
                                    <button
                                        className='song-list-link'
                                        data-bs-toggle='modal'
                                        data-bs-target='#audioPlayerModal'
                                        onClick={() => handleSongClick(song)}>
                                        <img
                                            className='song-list-icon'
                                            src={song.isActive ? 'assets/icons/melody.svg' : 'assets/icons/stop.svg'}
                                            alt='icon'
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <TeamModal selectedTeam={selectedTeam} updateTeams={setTeams} />
            <AudioPlayer audioSrc={selectedSong} />
        </div>
    );
}

export default Home;
