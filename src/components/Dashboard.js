// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import axios from 'axios';
// import './Dashboard.css';

// const Dashboard = () => {
//   const { user, logout } = useAuth();
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch notes on component mount
//   useEffect(() => {
//     fetchNotes();
//   }, []);
//   useEffect(() => {
//   console.log('Dashboard rendered. User:', user);
// }, [user]);


//   const fetchNotes = async () => {
//     try {
//       setIsLoading(true);
//       // Since there's no GET endpoint for notes, we'll handle this differently
//       // For now, we'll show an empty list and let users create notes
//       setNotes([]);
//       setError('');
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//       setError('Failed to fetch notes');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const createNote = async () => {
//     if (!newNote.trim()) return;

//     try {
//       setIsLoading(true);
//       const response = await axios.post('https://noteapp-0eu4.onrender.com/api/notes/add', {
//         content: newNote.trim()
//       });
      
//       // Create a temporary note object with generated ID
//       const tempNote = {
//         id: Date.now(), // Temporary ID for display
//         content: newNote.trim(),
//         ...response.data
//       };
      
//       setNotes(prev => [...prev, tempNote]);
//       setNewNote('');
//       setError('');
//     } catch (error) {
//       console.error('Error creating note:', error);
//       setError('Failed to create note');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const deleteNote = async (noteId) => {
//     try {
//       setIsLoading(true);
//       await axios.delete(`https://noteapp-0eu4.onrender.com/api/notes/delete/${noteId}`);
      
//       setNotes(prev => prev.filter(note => note.id !== noteId));
//       setError('');
//     } catch (error) {
//       console.error('Error deleting note:', error);
//       setError('Failed to delete note');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       createNote();
//     }
//   };

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Mobile View */}
//       <div className="dashboard-mobile">
//         <div className="dashboard-header">
//           <div className="hd-logo">HD</div>
//           <h1>Dashboard</h1>
//           <button onClick={handleLogout} className="signout-button">
//             Sign out
//           </button>
//         </div>

//         <div className="dashboard-content">
//           <div className="welcome-section">
//             <h2>Welcome, {user?.fullName || 'User'}!</h2>
//             <p className="user-email">{user?.email || 'user@example.com'}</p>
//           </div>

//           <div className="create-note-section">
//             <button 
//               onClick={createNote} 
//               className="create-note-button"
//               disabled={isLoading || !newNote.trim()}
//             >
//               Create Note
//             </button>
//           </div>

//           <div className="notes-section">
//             <h3>Notes</h3>
//             {error && <div className="error-message">{error}</div>}
            
//             {isLoading ? (
//               <div className="loading">Loading notes...</div>
//             ) : notes.length === 0 ? (
//               <div className="no-notes">No notes yet. Create your first note!</div>
//             ) : (
//               <div className="notes-list">
//                 {notes.map((note) => (
//                   <div key={note.id} className="note-item">
//                     <span className="note-content">{note.content}</span>
//                     <button
//                       onClick={() => deleteNote(note.id)}
//                       className="delete-note-button"
//                       disabled={isLoading}
//                     >
//                       🗑️
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Desktop View */}
//       <div className="dashboard-desktop">
//         <div className="dashboard-header">
//           <div className="hd-logo">HD</div>
//           <h1>Dashboard</h1>
//           <button onClick={handleLogout} className="signout-button">
//             Sign out
//           </button>
//         </div>

//         <div className="dashboard-content">
//           <div className="welcome-section">
//             <h2>Welcome, {user?.fullName || 'User'}!</h2>
//             <p className="user-email">{user?.email || 'user@example.com'}</p>
//           </div>

//           <div className="create-note-section">
//             <div className="note-input-container">
//               <textarea
//                 value={newNote}
//                 onChange={(e) => setNewNote(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Type your note here..."
//                 className="note-input"
//                 rows="3"
//               />
//               <button 
//                 onClick={createNote} 
//                 className="create-note-button"
//                 disabled={isLoading || !newNote.trim()}
//               >
//                 Create Note
//               </button>
//             </div>
//           </div>

//           <div className="notes-section">
//             <h3>Notes</h3>
//             {error && <div className="error-message">{error}</div>}
            
//             {isLoading ? (
//               <div className="loading">Loading notes...</div>
//             ) : notes.length === 0 ? (
//               <div className="no-notes">No notes yet. Create your first note!</div>
//             ) : (
//               <div className="notes-list">
//                 {notes.map((note) => (
//                   <div key={note.id} className="note-item">
//                     <span className="note-content">{note.content}</span>
//                     <button
//                       onClick={() => deleteNote(note.id)}
//                       className="delete-note-button"
//                       disabled={isLoading}
//                       title="Delete note"
//                     >
//                       🗑️
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for redirect after logout
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Setup axios auth header whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Fetch notes for the user on mount or when user changes
  useEffect(() => {
    if (user?.email) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://noteapp-0eu4.onrender.com/api/notes/all/${user.email}`);
      setNotes(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('Failed to fetch notes');
    } finally {
      setIsLoading(false);
    }
  };

  const createNote = async () => {
    if (!newContent.trim()) return;

    setIsLoading(true);
    try {
      const body = {
        title: newTitle.trim() || 'Untitled',
        content: newContent.trim(),
      };

      const response = await axios.post('https://noteapp-0eu4.onrender.com/api/notes/add', body);
      
      // Add new note from response (assuming response.data has the created note)
      setNotes(prev => [...prev, response.data]);
      setNewTitle('');
      setNewContent('');
      setError('');
    } catch (err) {
      console.error('Error creating note:', err);
      setError('Failed to create note');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (noteId) => {
    setIsLoading(true);
    try {
      await axios.delete(`https://noteapp-0eu4.onrender.com/api/notes/delete/${noteId}`);
      setNotes(prev => prev.filter(note => note.id !== noteId));
      setError('');
    } catch (err) {
      console.error('Error deleting note:', err);
      setError('Failed to delete note');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/signin'); // redirect to signin page
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-mobile">
        <div className="dashboard-header">
          <div className="hd-logo">HD</div>
          <h1>Dashboard</h1>
          <button onClick={handleLogout} className="signout-button">
            Sign Out
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
              placeholder="Note Title (optional)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="note-title-input"
            />
            <textarea
              placeholder="Type your note here..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={3}
              className="note-input"
            />
            <button 
              onClick={createNote} 
              className="create-note-button"
              disabled={isLoading || !newContent.trim()}
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
                {notes.map(note => (
                  <div key={note.id} className="note-item">
                    <div>
                      <strong>{note.title || 'Untitled'}</strong>
                      <p className="note-content">{note.content}</p>
                    </div>
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

      {/* You can add desktop view if needed based on your CSS */}
    </div>
  );
};

export default Dashboard;
