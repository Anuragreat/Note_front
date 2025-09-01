import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);
  useEffect(() => {
  console.log('Dashboard rendered. User:', user);
}, [user]);


  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      // Since there's no GET endpoint for notes, we'll handle this differently
      // For now, we'll show an empty list and let users create notes
      setNotes([]);
      setError('');
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to fetch notes');
    } finally {
      setIsLoading(false);
    }
  };

  const createNote = async () => {
    if (!newNote.trim()) return;

    try {
      setIsLoading(true);
      const response = await axios.post('https://noteapp-0eu4.onrender.com/api/notes/add', {
        content: newNote.trim()
      });
      
      // Create a temporary note object with generated ID
      const tempNote = {
        id: Date.now(), // Temporary ID for display
        content: newNote.trim(),
        ...response.data
      };
      
      setNotes(prev => [...prev, tempNote]);
      setNewNote('');
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
      setError('');
    } catch (error) {
      console.error('Error deleting note:', error);
      setError('Failed to delete note');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      createNote();
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      {/* Mobile View */}
      <div className="dashboard-mobile">
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
            <button 
              onClick={createNote} 
              className="create-note-button"
              disabled={isLoading || !newNote.trim()}
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
                    <span className="note-content">{note.content}</span>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="delete-note-button"
                      disabled={isLoading}
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

      {/* Desktop View */}
      <div className="dashboard-desktop">
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
            <div className="note-input-container">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your note here..."
                className="note-input"
                rows="3"
              />
              <button 
                onClick={createNote} 
                className="create-note-button"
                disabled={isLoading || !newNote.trim()}
              >
                Create Note
              </button>
            </div>
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
                    <span className="note-content">{note.content}</span>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="delete-note-button"
                      disabled={isLoading}
                      title="Delete note"
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
    </div>
  );
};

export default Dashboard;
