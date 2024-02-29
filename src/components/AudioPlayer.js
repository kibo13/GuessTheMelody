import React, { useEffect, useRef, useState } from 'react';
import './AudioPlayer.css';

function AudioPlayer({ audioSrc }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(null);

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handlePlay = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const handlePause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const handlePlayerPause = () => {
        if (isPlaying) {
            handlePause();
        } else {
            handlePlay();
        }
    };

    function formatDuration(durationSeconds) {
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = Math.floor(durationSeconds % 60);
        const formattedSeconds = seconds.toString().padStart(2, '0');
        return `${minutes}:${formattedSeconds}`;
    }

    useEffect(() => {
        const audio = audioRef.current;

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
        });

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', () => {
                setDuration(audio.duration);
            });
        };
    }, []);

    return (
        <div
            className='modal fade'
            id='audioPlayerModal'
            tabIndex='-1'
            aria-labelledby='audioPlayerLabel'
            aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='player-card'>
                        <img src='/cover-image.jpg' alt='Cover Image' />

                        <input type='range' min={0} max={duration} value={currentTime} onChange={handleSeek} />

                        <audio ref={audioRef} src={audioSrc} />

                        <div className='track-duration'>
                            <p>{formatDuration(currentTime)}</p>
                            <p>{formatDuration(duration)}</p>
                        </div>

                        <div className='track-control'>
                            <button className='btn btn-primary' onClick={handlePlayerPause}>
                                {isPlaying ? 'Стоп' : 'Играть'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;
