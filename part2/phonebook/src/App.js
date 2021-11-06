import React, { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Numbers from './Numbers';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newFilter, setNewFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const handleChangeFilter = (e) => {
    setNewFilter(e.target.value);
  };

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangePhoneNumber = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([...persons, { name: newName, phoneNumber: newPhoneNumber }]);
    setNewPhoneNumber('');
    setNewName('');
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.trim().toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newFilter={newFilter}
        handleChangeFilter={handleChangeFilter}
      ></Filter>
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleChangeName={handleChangeName}
        handleChangePhoneNumber={handleChangePhoneNumber}
        addPerson={addPerson}
      ></PersonForm>
      <h2>Numbers</h2>
      <Numbers filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
