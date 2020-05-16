import React from 'react'
import { Container } from 'semantic-ui-react'

const AccountBar = ({ goToPage, authenticated }) => {
  let buttons;
  if ( authenticated ) {
    buttons = <a id="logout-link" onClick={() => goToPage('search')}>Logout</a>
  } else {
    buttons = (
      <nav>
        <a id="login-link" onClick={() => goToPage('login')}>Login</a> |
        <a id="signup-link" onClick={() => goToPage('signup')}> Sign Up</a>
      </nav>
    )
  }

  return (
    <Container align="right" style={{padding: "20px"}}>
      {buttons}
    </Container>
  )
}

export default AccountBar;
