const GroupBtn = ({ n, activeGroup, onClick }) => {
  const activeClass = n === activeGroup ? 'active' : ''
  const label = n > 0 ? `Groupe ${n}` : 'Aucun groupe'

  return (
    <button
      className={`btn btn-outline-primary ${activeClass}`}
      onClick={() => onClick(n)}
    >
      {label}
    </button>
  )
}

export default GroupBtn
