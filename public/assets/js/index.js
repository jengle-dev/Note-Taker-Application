// dont forget to install npm install for NODE and npm install express for express
const express = require('express');

const noteRouter = require('./notes');
const noteListRouter = require('./noteList')

// DELETE CALL
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
deleteNote();
