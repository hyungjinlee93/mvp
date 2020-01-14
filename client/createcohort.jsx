import React from 'react';
const CreateCohort = (props) => {
  return (
    <form onSubmit={props.fn}>
      <input type="text" placeholder="New Cohort Name" id="CreateCohort"/>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default CreateCohort;