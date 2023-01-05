// import { eventWrapper } from '@testing-library/user-event/dist/utils'
import React,{useState} from 'react'

const Note =({note})=>{
    return(
        <li>{note.content}</li>
    )
}

export default function Notes(props) {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState(
        'a new note'
    )
    const [showAll, setShowAll] = useState(true)

    const notesToShow = showAll
    ? notes
    :notes.filter(note=>note.important === true)



    const addNote =(event)=>{
        event.preventDefault()
        console.log('button clicked',event.target)
        const noteObject ={
            content: newNote,
            date: new Date().toISOString,
            important: Math.random() < 0.5,
            id: notes.length +1
        }
        setNotes(notes.concat(noteObject))
        setNewNote('')
      
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
                <Note key={note.id} note={note}/>
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
