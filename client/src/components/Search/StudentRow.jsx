const StudentRow = ({ student, actions }) => {
  const { nip, lastName, firstNames, id } = student

  return (
    <tr className="align-middle">
      <td>{nip}</td>
      <td>{lastName}</td>
      <td>{firstNames}</td>
      {actions && <td>{actions(id)}</td>}
    </tr>
  )
}

export default StudentRow
