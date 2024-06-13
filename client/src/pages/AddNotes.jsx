import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNotes = () => {

    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/add-note', { title, note });
            setTitle(''); 
            setNote('');
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="notes-main-page">
            <div className="notes-main-page-container">
                <div className='notes-add-note-wrapper'>
                    <div className="notes-add-note-header">
                        Add New Note
                    </div>

                    <div className='notes-add-note-input-container'>
                        <div className="notes-add-note-input-label">
                            Name
                        </div>
                        <div className="notes-add-note-input">
                            <input 
                                type='text' 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className='notes-add-note-input-container'>
                        <div className="notes-add-note-input-label">
                            Contents
                        </div>
                        <div className="notes-add-note-input">
                            <textarea 
                                value={note} 
                                onChange={(e) => setNote(e.target.value)}
                            />  
                        </div>
                    </div>

                    <div className='notes-add-note-input-container'>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNotes