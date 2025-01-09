import { Task } from "../../types";
import AddNotesForm from "./AddNotesForm";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
    notes: Task['notes']
}

export default function NotesPanel( {notes} : NotesPanelProps ) {
    console.log(notes);
    
  return (
    <div>
      <AddNotesForm />

      <div className="divide-y divide-gray-100 mt-0">
            {notes.length ? (
                <>
                    <p className="font-bold text-2xl text-slate-600 my-5">Notas: </p>
                        {notes.map(note => <NoteDetail key={note._id} note={note} />)
                            
                        }
                </> 
            ) : <p className="text-gray-500 text-center pt-3"> No hay notas</p>}
      </div>


    </div>
  )
}
