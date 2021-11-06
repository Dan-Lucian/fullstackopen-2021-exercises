import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newFilter, setNewFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => setPersons(res.data));
  }, []);

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
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  );
};

export default App;
