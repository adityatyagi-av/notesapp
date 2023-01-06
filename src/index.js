import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import axios from 'axios'
import Notes from './components/Notes';

// axios.get('http://localhost:3001/notes')
// const promise2=axios.get('http://localhost:3001/foobar')
axios
  .get('http://localhost:3001/notes')
  .then(response=>{
   const notes = response.data
   console.log(notes)
   const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Notes notes={notes}/>
  </React.StrictMode>
);
  })

// console.log(promise2)

