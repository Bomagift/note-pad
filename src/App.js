import { useState } from "react";
import './App.css'

function NotepadApp() {
  const [notes, setNotes] = useState([]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1);
  const [textNote, setTextNote] = useState('');
  const [mediaNote, setMediaNote] = useState(null);
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleTextChange = (e) => {
    setTextNote(e.target.value);
  };

  const handleMediaChange = (e) => {
    setMediaNote(e.target.files[0]);
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const saveNote = () => {
    const newNote = {
      textNote,
      mediaNote,
      selectedFont,
    };
    if (currentNoteIndex !== -1) {
      
      const updatedNotes = [...notes];
      updatedNotes[currentNoteIndex] = newNote;
      setNotes(updatedNotes);
    } else {
      
      setNotes([...notes, newNote]);
    }
    setCurrentNoteIndex(-1);
    setTextNote('');
    setMediaNote(null);
    alert('Note saved successfully!');
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    setCurrentNoteIndex(-1);
    setTextNote('');
    setMediaNote(null);
    alert('Note deleted successfully!');
  };

  const handleNoteClick = (index) => {
    setCurrentNoteIndex(index);
    const { textNote, mediaNote, selectedFont } = notes[index];
    setTextNote(textNote);
    setMediaNote(mediaNote);
    setSelectedFont(selectedFont);
  };

  const handleSearch = () => {
    
    console.log('Search keyword:', searchKeyword);
    alert('Search functionality not implemented yet!');
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <h1>Notepad</h1>
      <div>
        <h2>Text Note</h2>
        <textarea
          value={textNote}
          onChange={handleTextChange}
          style={{ fontFamily: selectedFont }}
        />
        <select value={selectedFont} onChange={handleFontChange}>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          
        </select>
      </div>
      <div>
        <h2>Media Note</h2>
        <input type="file" onChange={handleMediaChange} />
        {mediaNote && <img src={URL.createObjectURL(mediaNote)} alt="Media" />}
      </div>
      <div>
        <button onClick={saveNote}>Save</button>
        {currentNoteIndex !== -1 && (
          <button onClick={() => deleteNote(currentNoteIndex)}>Delete</button>
        )}
      </div>
      <div>
        <h2>Notes</h2>
        <ul>
          {notes.map((note, index) => (
            <li key={index} onClick={() => handleNoteClick(index)}>
              Note {index + 1}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <button onClick={handleDarkModeToggle}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
}

export default NotepadApp;