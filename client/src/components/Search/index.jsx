import { useContext, useEffect, useState } from 'react'
import StudentForm from './StudentForm'
import axios from 'axios'
import StudentsList from './StudentsList'
import Toast from 'utils/Toast'
import Student from 'utils/Student'
import { isOk } from 'utils/http'
import ApiContext from 'components/ApiContext'

const Students = () => {
  const [students, setStudents] = useState([])
  const [studentToEdit, setStudentToEdit] = useState(null)
  const API_URL = useContext(ApiContext)

  const deleteStudent = async studentId => {
    try {
      const res = await axios.delete(`${API_URL}/students/${studentId}`)

      if (isOk(res.status)) {
        setStudents(oldStudents =>
          oldStudents.filter(student => student.id !== studentId),
        )
        Toast.success("L'étudiant a été supprimé !")
      } else {
        throw new Error(res.data.message)
      }
    } catch (e) {
      Toast.error(e.message)
    }
  }

  const setEdit = async studentId => {
    try {
      const res = await axios.get(`${API_URL}/students/${studentId}`)

      if (isOk(res.status)) {
        const newStudent = new Student(res.data)
        setStudentToEdit(newStudent)
      } else {
        throw new Error(res.data.message)
      }
    } catch (e) {
      Toast.error(e.message)
    }
  }

  const editStudent = async student => {
    try {
      const res = await axios.put(`${API_URL}/students/${student.id}`, student)

      if (isOk(res.status)) {
        const newStudent = new Student(res.data)

        setStudents(oldStudents => {
          const newStudents = [...oldStudents]
          const newIndex = newStudents.findIndex(s => s.id === newStudent.id)
          newStudents[newIndex] = newStudent
          return newStudents
        })

        Toast.success("L'étudiant a été mis à jour !")
        return true
      } else {
        throw new Error(res.data.message)
      }
    } catch (e) {
      Toast.error(e.message)
      return false
    }
  }

  const addStudent = async student => {
    try {
      const res = await axios({
        url: `${API_URL}/students`,
        method: 'POST',
        data: student,
        validateStatus: false,
      })

      console.log(res.status)

      if (isOk(res.status)) {
        const newStudent = new Student(res.data)
        setStudents(oldStudents => [...oldStudents, newStudent])
        Toast.success("L'étudiant a été ajouté !")
      } else {
        throw new Error(res.data.message)
      }

      return true
    } catch (e) {
      Toast.error(e.message)
      return false
    }
  }

  useEffect(() => {
    axios.get(`${API_URL}/students`).then(res => {
      const students = res.data.map(Student.create)
      setStudents(students)
    })
  }, [])

  return (
    <>
      <StudentForm
        onAdd={addStudent}
        onEdit={editStudent}
        student={studentToEdit}
      />
      <StudentsList
        students={students}
        onDelete={deleteStudent}
        onEdit={setEdit}
      />
    </>
  )
}

export default Students
