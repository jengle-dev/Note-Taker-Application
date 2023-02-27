const noteList = require('express').Router();

// Render the list of note titles
const renderNoteList = async (notes) => {
    let jsonNotes = await notes.json();
    if (window.location.pathname === '/notes') {
      noteList.forEach((el) => (el.innerHTML = ''));
    }
  
    let noteListItems = [];
  
    // Returns HTML element with or without a delete button
    const createLi = (text, delBtn = true) => {
      const liEl = document.createElement('li');
      liEl.classList.add('list-group-item');
  
      const spanEl = document.createElement('span');
      spanEl.classList.add('list-item-title');
      spanEl.innerText = text;
      spanEl.addEventListener('click', handleNoteView);
  
      liEl.append(spanEl);
  
      if (delBtn) {
        const delBtnEl = document.createElement('i');
        delBtnEl.classList.add(
          'fas',
          'fa-trash-alt',
          'float-right',
          'text-danger',
          'delete-note'
        );
        delBtnEl.addEventListener('click', handleNoteDelete);
  
        liEl.append(delBtnEl);
      }
  
      return liEl;
    };
  
    if (jsonNotes.length === 0) {
      noteListItems.push(createLi('No saved Notes', false));
    }
  
    jsonNotes.forEach((note) => {
      const li = createLi(note.title);
      li.dataset.note = JSON.stringify(note);
  
      noteListItems.push(li);
    });
  
    if (window.location.pathname === '/notes') {
      noteListItems.forEach((note) => noteList[0].append(note));
    }
  };
  renderNoteList();
module.exports = noteList;
