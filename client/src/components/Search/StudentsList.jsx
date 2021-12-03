import { BsListUl } from 'react-icons/bs'
import { MdDelete, MdEdit } from 'react-icons/md'
import StudentsTable from './StudentsTable'

const StudentsList = ({ students, onDelete, onEdit }) => {
  const actions = id => [
    <button
      onClick={() => onEdit(id)}
      className="btn btn-primary me-2"
      title="Éditer"
      key="edit"
    >
      <MdEdit />
    </button>,
    <button
      onClick={() => onDelete(id)}
      title="Supprimer"
      className="btn btn-outline-danger"
      key="delete"
    >
      <MdDelete />
    </button>,
  ]

  return (
    <>
      <h2>
        <BsListUl />
        Liste des sauveteurs
      </h2>
      {students?.length ? (
        <StudentsTable students={students} actions={actions} />
      ) : (
        <p>La liste est vide.</p>
      )}
    </>
  )
}

export default StudentsList
