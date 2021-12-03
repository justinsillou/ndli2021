import { HiUserGroup } from 'react-icons/hi'

const students = [
  {
    firstName: 'Ludovic',
    lastName: 'Chombeau',
    email: 'ludovic.chombeau.etu@univ-lille.fr',
    favoriteFood: '🍝 Pâtes',
  },
  {
    firstName: 'Antoine',
    lastName: 'Nollet',
    email: 'antoine.nollet.etu@univ-lille.fr',
    favoriteFood: '🍕 Pizza',
  },
  {
    firstName: 'Mohamad-Ammar',
    lastName: 'Said',
    email: 'mohamadammar.said.etu@univ-lille.fr',
    favoriteFood: '🌯 Shawarma',
  },
]

const Trinome = () => (
  <>
    <h3>
      <HiUserGroup /> Trinôme
    </h3>
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th className="col-2">Nom</th>
          <th className="col-2">Prénom</th>
          <th className="col-4">Adresse mail</th>
          <th className="col-4">Nourriture préférée</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.email}>
            <td>{student.lastName}</td>
            <td>{student.firstName}</td>
            <td>
              <a href={`mailto:${student.email}`}>{student.email}</a>
            </td>
            <td>{student.favoriteFood}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)

export default Trinome
