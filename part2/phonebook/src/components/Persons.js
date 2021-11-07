import Person from './Person';

const Persons = ({ persons, newFilter, removeContact }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.trim().toLowerCase())
  );

  return filteredPersons.map((person) => (
    <Person
      key={person.name}
      person={person}
      removeContact={() => removeContact(person)}
    ></Person>
  ));
};

export default Persons;
