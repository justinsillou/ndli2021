import { HiUserGroup } from 'react-icons/hi'

const students = [
  {
    firstName: 'Anouk',
    lastName: 'Bachelet',
  },
  {
    firstName: 'Damien',
    lastName: 'Gournay',
  },
  {
    firstName: 'Mathilde',
    lastName: 'Minaud',
  },
  {
    firstName: 'Antoine',
    lastName: 'Nollet',
  },
  {
    firstName: 'Justin',
    lastName: 'Sillou',
  },
]

const Equipe = () => (
  <>
    <h3>
      <HiUserGroup /> L'Équipe
    </h3>
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th className="col-2">Nom</th>
          <th className="col-2">Prénom</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.email}>
            <td>{student.lastName}</td>
            <td>{student.firstName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)

export default Equipe
