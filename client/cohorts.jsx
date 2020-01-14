import React from 'react';
const Cohorts = (props) => {
  let list = props.cohorts.map(element => {
    return (
      <option value={element}>{element}</option>
  )});
  return (
    <form onSubmit={props.fn}>
      <select name="cohorts" id="cohort-select">
        <option value="">--Please choose an option--</option>
        {list}
      </select>
      <input type="text" placeholder="mm/dd/yyyy"/>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Cohorts;