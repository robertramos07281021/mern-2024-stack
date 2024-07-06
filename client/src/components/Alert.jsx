/* eslint-disable react/prop-types */
const Alert = ({msg}) => {
  return (
    <div className="login-error flex gap-2 items-center">
      <i className="fa-solid fa-triangle-exclamation"></i>
      {msg}
    </div>
  )
}

export default Alert
