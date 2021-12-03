import { MdClear } from 'react-icons/md'

const isZero = n => n === 0

const GroupActions = (numberOfGroups, activeGroup, moveGroup) => {
  const generateClassName = n => {
    let className = `btn btn-sm btn-${isZero(n) ? 'danger' : 'primary'}`

    if (n === activeGroup) className = `${className} disabled`

    return className
  }

  const createButtons = studentId => {
    const buttons = []

    for (let i = 0; i <= numberOfGroups; i++)
      buttons.push(
        <button
          className={generateClassName(i)}
          onClick={() => moveGroup(studentId, activeGroup, i)}
          key={i}
        >
          {isZero(i) ? <MdClear /> : i}
        </button>,
      )

    return buttons
  }

  return studentId => [
    <div className="btn-group" key={studentId}>
      {createButtons(studentId)}
    </div>,
  ]
}

export default GroupActions
