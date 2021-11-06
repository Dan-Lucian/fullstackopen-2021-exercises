import Person from './Person';

const Numbers = ({ filteredPersons }) => {
  return filteredPersons.map((person) => (
    <Person key={person.name} person={person}></Person>
  ));
};

export default Numbers;
