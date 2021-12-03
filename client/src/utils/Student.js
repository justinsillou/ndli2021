class Student {
  /**
   * Create a student from an object
   * @param {Object} studentObject
   * @param {String} studentObject._id
   * @param {String} studentObject.nip
   * @param {String[]} studentObject.firstNames
   * @param {String} studentObject.lastName
   */
  constructor(studentObject) {
    this.id = studentObject?._id || studentObject?.id || ''
    this.nip = studentObject?.nip || ''
    this.firstNames = studentObject?.firstNames || ''
    this.lastName = studentObject?.lastName || ''

    if (studentObject?.firstNames?.join)
      this.firstNames = studentObject.firstNames.join(',')
  }

  /**
   * Statically create a new student from an object
   * @param {Object} studentObject
   * @param {String} studentObject._id
   * @param {String} studentObject.nip
   * @param {String[]} studentObject.firstNames
   * @param {String} studentObject.lastName
   * @returns {Student}
   */
  static create(studentObject) {
    return new Student(studentObject)
  }

  /**
   * Create a new student without an object.
   * @returns {Student}
   */
  static get INIT() {
    return Student.create()
  }

  /**
   * Return true if the Student has a valid id, thus is not null.
   * @returns {Boolean}
   */
  isNotNull() {
    return Boolean(this.id)
  }

  /**
   * Convert a Student to an object. This is useful for creating a
   * copy of an instance (convert it to an object, then create a
   * new Student from that object)
   * @returns {Object}
   */
  toObject() {
    return JSON.parse(JSON.stringify(this))
  }
}

export default Student
