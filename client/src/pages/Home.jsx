import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {

    const [notes, setNotes] = useState([])

    const navigate = useNavigate();

    useEffect(() =>{
        const fetchAllNotes = async ()=>{
            try{
                const res = await axios.get("http://localhost:5000/show-notes")
                setNotes(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllNotes()
    },[])

    const handleDeleteNote = async (noteId) => {
        try {
            await axios.delete(`http://localhost:5000/delete-note/${noteId}`);
            navigate(0); 
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="notes-main-page">
            <div className="notes-main-page-container">
                <div className="notes-main-page-header">
                    Notes App
                </div>
                <div className="notes-main-page-notes-list-container">

                    {/* NOTES LIST HEADER */}
                    <div className="notes-main-page-notes-list-header">
                        <div className="notes-main-page-notes-list-id">
                            ID
                        </div>
                        <div className="notes-main-page-notes-list-name">
                            Title
                        </div>
                        <div className="notes-main-page-notes-list-date">
                            Last Modified
                        </div>
                        <div className="notes-main-page-notes-list-action">
                            Action
                        </div>
                    </div>
                    {/* END OF NOTES LIST HEADER */}

                    {/* NOTES LIST */}
                    {notes.map(note =>(
                        <div className="notes-main-page-individual-notes" key={note.id}>
                            <div className="notes-main-page-notes-individual-id">
                                {note.id}
                            </div>
                            <div className="notes-main-page-notes-individual-name">
                                {note.title}
                            </div>
                            <div className="notes-main-page-notes-individual-date">
                                {new Date(note.datetime).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                                &nbsp;at&nbsp; 
                                {new Date(note.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second:'2-digit'})}
                            </div>
                            <div className="notes-main-page-notes-individual-action">
                                <button 
                                    className="notes-view-button"
                                    onClick={() => navigate(`/view-note/${note.id}`)}
                                >
                                    <i className="fa-solid fa-eye"></i>
                                </button>
                                <button 
                                    className='notes-edit-button'
                                    onClick={() => navigate(`/edit-note/${note.id}`)}
                                >
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button className='notes-delete-button' onClick={() => handleDeleteNote(note.id)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* END OF NOTES LIST */}

                    {/* ADD NOTES SECTION */}
                    <Link to="/add-notes" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="notes-main-page-add-notes">
                            <button><i className="fa-solid fa-plus"></i> Add New Note</button>
                        </div>
                    </Link>
                    {/* END OF ADD NOTES SECTION */}
                </div>
            </div>
        </div>
    )
}

export default Home