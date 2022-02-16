import { useAppSelector } from 'app/hooks'
import { INote } from 'features/notes/noteInterfaces'

interface INoteItemProps {
  note: INote
}

const NoteItem: React.FC<INoteItemProps> = ({ note }) => {
  const { user } = useAppSelector(state => state.auth)

  return (
    <div
      className='note'
      style={{
        backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
        color: note.isStaff ? '#fff' : '#000',
      }}
    >
      <h4>Note from {note.isStaff ? <span>Staff</span> : <span>{user?.name}</span>}</h4>
      <p>{note.text}</p>
      <div className='note-date'>{new Date(note.createdAt).toLocaleString('es-ES')}</div>
    </div>
  )
}

export default NoteItem
