const Person = ({ person, removeContact }) => (
  <p>
    {person.name} {person.phoneNumber}
    <button onClick={removeContact}>Remove</button>
  </p>
);

export default Person;
