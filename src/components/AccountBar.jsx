import React from 'react'

const AccountBar = ({goToLoginPage}) => {
  return (
    <div>
      <a onClick={goToLoginPage}>Login</a>
    </div>
  )
}

export default AccountBar
