const Input = ({
  label,
  onChange,
  value,
  placeholder,
  name,
  disabled = false,
}) => (
  <label className="input-group input-group mb-2 text-center">
    <span className="input-group-text col-2 d-inline-block">{label}</span>
    <input
      type="text"
      name={name}
      required={true}
      onChange={onChange}
      value={value}
      className="form-control"
      placeholder={placeholder}
      disabled={disabled}
    />
  </label>
)

export default Input
