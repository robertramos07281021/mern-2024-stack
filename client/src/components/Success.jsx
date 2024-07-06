/* eslint-disable react/prop-types */

import { useState } from "react"


const Success = ({msg}) => {

  const [show, setShow] = useState(true)

  setTimeout(() => setShow(false),2000)

  return (
    <div>
      {show && <div className="success flex gap-2 items-center">
        <i className="fa-solid fa-circle-check"></i>
        {msg}
      </div>}
    </div>

  )
}

export default Success
