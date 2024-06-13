import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditNote = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/show-notes`);
                const selectedNote = res.data.find(n => n.id === parseInt(id));

                if (selectedNote) {
                    setTitle(selectedNote.title);
                    setNote(selectedNote.note);
                } else {
                    console.error("Note not found");
                }
            } catch (err) {
                console.error("Error fetching notes:", err);
            }
        };

        fetchNote();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/update-note/${id}`, { title, note });
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
                        Edit Note
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className='notes-add-note-input-container'>
                            <div className="notes-add-note-input-label">Title</div>
                            <div className="notes-add-note-input">
                            <input 
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            </div>
                        </div>

                        <br></br>

                        <div className='notes-add-note-input-container'>
                            <div className="notes-add-note-input-label">Note Contents</div>
                            <div className="notes-add-note-input">
                                <textarea 
                                    value={note} 
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='notes-add-note-input-container'>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditNote;