import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.email) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `https://noteapp-0eu4.onrender.com/api/notes/all/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes(Array.isArray(response.data) ? response.data : response.data.notes || []);
      setError('');
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to fetch notes');
    } finally {
      setIsLoading(false);
    }
  };

  const createNote = async () => {
    if (!content.trim()) return;
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://noteapp-0eu4.onrender.com/api/notes/add',
        { title, content }
      );

      const newNote = {
        id: response.data.id || Date.now(),
        title: title || 'Untitled',
        content,
      };

      setNotes(prev => [...prev, newNote]);
      setTitle('');
      setContent('');
      setError('');
    } catch (error) {
      console.error('Error creating note:', error);
      setError('Failed to create note');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      setIsLoading(true);
      await axios.delete(`https://noteapp-0eu4.onrender.com/api/notes/delete/${noteId}`);
      setNotes(prev => prev.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
      setError('Failed to delete note');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      
        <div className="dashboard-header">
          <div className="hd-logo">HD</div>
          <h1>Dashboard</h1>
          <button onClick={handleLogout} className="signout-button">
            Sign out
          </button>
        </div>

        <div className="dashboard-content">
          <div className="welcome-section">
            <h2>Welcome, {user?.fullName || 'User'}!</h2>
            <p className="user-email">{user?.email || 'user@example.com'}</p>
          </div>

          <div className="create-note-section">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (optional)"
              className="note-title-input"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your note here..."
              rows="4"
              className="note-input"
            />
            <button
              onClick={createNote}
              className="create-note-button"
              disabled={isLoading || !content.trim()}
            >
              Create Note
            </button>
          </div>

          <div className="notes-section">
            <h3>Notes</h3>
            {error && <div className="error-message">{error}</div>}
            {isLoading ? (
              <div className="loading">Loading notes...</div>
            ) : notes.length === 0 ? (
              <div className="no-notes">No notes yet. Create your first note!</div>
            ) : (
              <div className="notes-list">
                {notes.map((note) => (
                  <div key={note.id} className="note-item">
                    <div>
                      {note.title && <strong>{note.title}</strong>}
                      <div className="note-content">{note.content}</div>
                    </div>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="delete-note-button"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
