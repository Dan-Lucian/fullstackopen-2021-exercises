import Person from './Person';

const Persons = ({ persons, newFilter }) => {

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.trim().toLowerCase())
  );

  return filteredPersons.map((person) => (
    <Person key={person.name} person={person}></Person>
  ));
};

export default Persons;
