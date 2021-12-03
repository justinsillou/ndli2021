import { useEffect, useState } from 'react'
import { BsPersonPlusFill } from 'react-icons/bs'
import Student from 'utils/Student'
import Input from './Input'

const StudentForm = ({ onAdd, onEdit, student }) => {
  const [newStudent, setNewStudent] = useState(Student.INIT)
  const [edit, setEdit] = useState(student?.isNotNull())

  const handleSubmit = async e => {
    const handler = edit ? onEdit : onAdd
    e.preventDefault()

    if (await handler(newStudent)) {
      setNewStudent(Student.INIT)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setNewStudent(oldStudent => {
      const updatedStudent = oldStudent.toObject()
      updatedStudent[name] = value
      return new Student(updatedStudent)
    })
  }

  useEffect(() => {
    setEdit(newStudent.isNotNull())
  }, [newStudent])

  useEffect(() => {
    setNewStudent(student ?? Student.INIT)
  }, [student])

  return (
    <div className="mb-5">
      <h2>
        <BsPersonPlusFill />
        {edit ? 'Éditer' : 'Ajouter'} un sauveteur
      </h2>
      <form onSubmit={handleSubmit} method={edit ? 'PUT' : 'POST'}>
        <Input
          label="A compléter"
          placeholder="1638"
          name="nip"
          onChange={handleChange}
          value={newStudent.nip}
          disabled={edit}
        />

        <Input
          label="Prénom(s)"
          placeholder="Elon,Reeve"
          name="firstNames"
          onChange={handleChange}
          value={newStudent.firstNames}
        />

        <Input
          label="Nom de famille"
          placeholder="Musk"
          name="lastName"
          onChange={handleChange}
          value={newStudent.lastName}
        />

        <button type="submit" className="btn btn-primary me-2">
          {edit ? 'Éditer' : 'Ajouter'}
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setNewStudent(Student.INIT)}
        >
          Nettoyer
        </button>
      </form>
    </div>
  )
}

export default StudentForm
