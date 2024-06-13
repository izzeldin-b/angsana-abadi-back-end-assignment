import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ViewNote = () => {
    const { id } = useParams();
    const [note, setNote] = useState({}); 

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/show-notes`);
                const foundNote = res.data.find(n => n.id === parseInt(id));

                if (foundNote) {
                    setNote(foundNote);
                } else {
                    console.error("Note not found");
                }
            } catch (err) {
                console.error("Error fetching notes:", err);
            }
        };

        fetchNote();
    }, [id]);

    return (
        <div className="view-note-page">
            <div className="view-note-container">
                <div className='view-note-wrapper'>
                    <div className="view-note-title">
                        {note.title}
                    </div>
                    <div className="view-note-contents">
                        {note.note}
                    </div>
                    <div className="view-note-date">
                        Last Modified: {new Date(note.datetime).toLocaleDateString()} at {new Date(note.datetime).toLocaleTimeString()}
                    </div>
                    <div className="view-note-actions">
                        <Link to={`/`}>
                            <button className="view-note-return-button" id='longer'>
                                Back
                            </button>
                        </Link>
                        <Link to={`/edit-note/${note.id}`}>
                            <button className="notes-edit-button" id='longer'>
                                <i className="fa-solid fa-pen"></i> Edit
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewNote;
