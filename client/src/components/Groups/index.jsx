import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { MdGroup } from 'react-icons/md'
import StudentsTable from 'components/Search/StudentsTable'
import Student from 'utils/Student'
import Toast from 'utils/Toast'
import GroupActions from './GroupActions'
import GroupBtn from './GroupBtn'
import ApiContext from 'components/ApiContext'

const N_GROUPS = 6

const Groups = () => {
  const [activeGroup, setActiveGroup] = useState(0)
  const [groups, setGroups] = useState([])
  const API_URL = useContext(ApiContext)

  const fetchGroups = async () => {
    let res

    res = await axios.get(`${API_URL}/groups`)
    const fetchedGroups = res.data
    const newGroups = Array.from({ length: N_GROUPS + 1 }, () => [])

    res = await axios.get(`${API_URL}/students`)
    let allStudents = res.data.map(s => new Student(s))

    fetchedGroups.forEach(group => {
      const student = new Student(group.student)
      newGroups[group.number].push(student)
      allStudents = allStudents.filter(s => s.nip !== student.nip)
    })

    newGroups[0] = allStudents

    setGroups(newGroups)
  }

  const moveGroup = async (id, prevGroup, nextGroup) => {
    const student = groups[prevGroup].find(s => s.id === id)

    if (prevGroup !== 0) {
      try {
        await axios.delete(`${API_URL}/groups/${prevGroup}/${id}`)
      } catch {
        Toast.error("Une erreur est survenue lors du déplacement de l'étudiant")
        return
      }
    }

    if (nextGroup !== 0) {
      try {
        await axios.post(`${API_URL}/groups/${nextGroup}`, { id })
      } catch {
        Toast.error("Une erreur est survenue lors du déplacement de l'étudiant")
        return
      }
    }

    setGroups(oldGroups => {
      const newGroups = [...oldGroups]
      newGroups[nextGroup] = [...newGroups[nextGroup], student]
      newGroups[prevGroup] = newGroups[prevGroup].filter(s => s.id !== id)
      return newGroups
    })

    Toast.success(`L'étudiant a bien été déplacé !`)
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <>
      <h2>
        <MdGroup />
        Groupes
      </h2>
      <div className="container d-flex align-items-start mt-4">
        <div className="btn-group-vertical col-2 pe-2">
          {groups.map((_, n) => (
            <GroupBtn
              n={n}
              activeGroup={activeGroup}
              onClick={setActiveGroup}
              key={n}
            />
          ))}
        </div>
        <StudentsTable
          students={groups[activeGroup] ?? []}
          actions={GroupActions(N_GROUPS, activeGroup, moveGroup)}
        />
      </div>
    </>
  )
}

export default Groups
