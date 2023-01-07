// import { eventWrapper } from '@testing-library/user-event/dist/utils'
import axios from 'axios'
import React,{useState, useEffect} from 'react'
import noteServices from './note'

const Note =({note,toggleImportance})=>{
    const label=note.important
    ?'make not important':'make important'
    return(
        <li>{note.content}
        <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

export default function Notes() {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(
        ''
    )
    const [showAll, setShowAll] = useState(true)
        useEffect(() => {
          console.log('effect')
          noteServices
          .getAll()
          .then(response => {
            setNotes(response.data)
          }) 
        }, [])
        
    console.log('render',notes.length,'notes')
    



    const notesToShow = showAll
    ? notes
    :notes.filter(note=>note.important === true)

//toggle importance
    const toggleImportanceOf =(id)=>{
           const note=notes.find(n=> n.id ===id)
        const changedNote={...note,important: !note.important}
        console.log(changedNote)
        
        noteServices
        .update(id,changedNote)
        .then(response=>{
            setNotes(notes.map(n=>n.id !==id ? n: response.data))
        })
    }


    const addNote =(event)=>{
        event.preventDefault()
        console.log('button clicked',event.target)
        const noteObject ={
            content: newNote,
            date: new Date().toISOString,
            important: Math.random() < 0.5,
            
        }

        noteServices
        .create(noteObject)
        .then(response=>{
                console.log(response)
                setNotes(notes.concat(noteObject))
                setNewNote('')
              
            })
      
    }

    const handleNoteChange=(event)=>{
        console.log(event.target.value)
        setNewNote(event.target.value)
    }
  return (
    <div>

        <h1>Notes</h1>
        <button onClick={()=> setShowAll(!showAll)}>show {showAll?'important':'all'}</button>
        <ul>
            {notesToShow.map(note =>
            { return(
                <Note key={note.id} note={note}
                toggleImportance={()=> toggleImportanceOf(note.id)}
                />
            )})
            }
        </ul>
        <form onSubmit={addNote}>
            
            <input value={newNote} onChange={handleNoteChange}/>
            <button type='submit'>Save</button>
        </form>
    </div>
  )
}
