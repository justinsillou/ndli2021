import { toast } from 'react-toastify'

class Toast {
  static defaultOps = {
    position: 'bottom-right',
  }

  /**
   * Create a success message toast
   * @param {String} message
   * @param {Object} options
   */
  static success(message, options) {
    toast.success(message, {
      ...Toast.defaultOps,
      autoClose: 3000,
      ...options,
    })
  }

  /**
   * Create an error message toast
   * @param {String} message
   * @param {Object} options
   */
  static error(message, options) {
    toast.error(message, {
      ...Toast.defaultOps,
      ...options,
    })
  }
}

export default Toast
