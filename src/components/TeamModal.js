import React, { useState, useEffect } from 'react';
import { updateData } from '../services/firebase/firebase.utils';

function TeamModal({ selectedTeam, updateTeams }) {
    const [teamName, setTeamName] = useState(selectedTeam.name);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setTeamName(selectedTeam.name);
    }, [selectedTeam.name]);

    const handleInputChange = (event) => {
        setTeamName(event.target.value);
    };

    const handleUpdateTeamName = async () => {
        if (teamName && selectedTeam.id) {
            setUploading(true);

            await updateData('teams', selectedTeam.id, {
                name: teamName,
            });

            setUploading(false);

            updateTeams((prevTeams) =>
                prevTeams.map((team) => {
                    if (team.id === selectedTeam.id) {
                        return { ...team, name: teamName };
                    }
                    return team;
                }),
            );
        } else {
            alert('Please enter the name of the team');
        }
    };

    return (
        <div className='modal fade' id='teamModal' tabIndex='-1' aria-labelledby='teamModalLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='teamModalLabel'>
                            Название команды
                        </h5>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <div className='form-group'>
                            <input
                                type='text'
                                className='form-control'
                                id='team-name'
                                placeholder='Введите название команды'
                                value={teamName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button
                            type='button'
                            className='btn btn-success'
                            onClick={handleUpdateTeamName}
                            disabled={uploading}>
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamModal;
