import React from 'react';
const SignedInStudents = (props) => {
  let list = props.students.map(element => {
    return (<li>Student: {element.student} Phone Id: {element.phone_id} Timestamp: {element.timest}</li>);
  });
  return (
    <ul>
      {list}
    </ul>
  );
}

export default SignedInStudents;