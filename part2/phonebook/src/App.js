import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import contacts from './services/contacts';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newFilter, setNewFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('success');

  useEffect(() => {
    contacts.getAll().then((contacts) => setPersons(contacts));
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

    const newContact = { name: newName, phoneNumber: newPhoneNumber };
    const foundCopy = persons.find((person) => person.name === newName);

    if (foundCopy) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, ` +
            `replace the new number with the new one?`
        )
      ) {
        contacts
          .update(foundCopy.id, newContact)
          .then((returnedContact) => {
            setPersons(
              persons
                .filter((person) => person.id !== foundCopy.id)
                .concat(returnedContact)
            );
            setNewPhoneNumber('');
            setNewName('');
            setNotificationType('success');
            setNotificationMessage(`Updated ${newContact.name}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch((err) => {
            setNotificationType('error');
            setNotificationMessage(`${err.response.data.error}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
      }
      return;
    }

    contacts
      .create(newContact)
      .then((returnedContact) => {
        setPersons(persons.concat(returnedContact));
        setNewPhoneNumber('');
        setNewName('');
        setNotificationType('success');
        setNotificationMessage(`Added ${newContact.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        console.log(newContact);
      })
      .catch((err) => {
        setNotificationType('error');
        setNotificationMessage(`${err.response.data.error}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
  };

  const removeContact = (contact) => {
    if (!window.confirm(`Delete ${contact.name} ?`)) return;

    contacts.remove(contact.id).then(() => console.log('contact deleted'));
    setPersons(persons.filter((person) => person.id !== contact.id));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
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
      <Persons
        persons={persons}
        newFilter={newFilter}
        removeContact={removeContact}
      />
    </div>
  );
};

export default App;
