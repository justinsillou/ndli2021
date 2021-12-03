import StudentRow from './StudentRow'

const StudentsTable = ({ students, actions }) => (
  <>
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th className="col-2">Nip</th>
          <th className="col-3">Nom</th>
          <th className="col-3">Prénom</th>
          {actions && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <StudentRow student={student} actions={actions} key={student.id} />
        ))}
      </tbody>
    </table>
  </>
)

export default StudentsTable
