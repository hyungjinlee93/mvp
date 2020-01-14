import React from 'react';
const SignInForm = (props) => {
  return (
    <form onSubmit={props.fn}>
      <input type="text" placeholder="Enter Username" />
      <input type="password" placeholder="Enter Password" />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default SignInForm;