import React from 'react'
import { Container } from 'semantic-ui-react'

const AccountBar = ({goToLoginPage}) => {
  return (
    <Container align="right" style={{padding: "20px"}}>
      <a onClick={goToLoginPage}>Login</a>
    </Container>
  )
}

export default AccountBar
