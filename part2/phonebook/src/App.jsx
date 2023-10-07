/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./App.css";
import contactService from "./services/contacts";
import Notifications from "./components/Notifications";

const Filter = (props) => {
  const { getName, filterName } = props;
  return (
    <div>
      Filter shown with: <input value={getName} onChange={filterName} />
    </div>
  );
};

const Persons = ({ filteredPersons, deleteContact }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name}: {person.number}{" "}
          <button onClick={() => deleteContact(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

const PersonForm = ({
  addNumber,
  newName,
  getPersonName,
  newNumber,
  getPersonNumber,
}) => (
  <form onSubmit={addNumber}>
    <div>
      name: <input value={newName} onChange={getPersonName} />
    </div>
    <div>
      number: <input value={newNumber} onChange={getPersonNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [getName, setGetName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [notMsg, setNotMsg] = useState("Notification");

  useEffect(() => {
    contactService.getAllContacts().then((response) => {
      setPersons(response);
      setFilteredPersons(response);
    });
  }, []);

  const addNumber = async (e) => {
    e.preventDefault();

    const checkExistingName = persons.some((person) => person.name === newName);
    if (checkExistingName) {
      alert(`${newName} is already in the phonebook.`);
      return;
    }
    const newContact = {
      name: newName,
      number: newNumber,
    };

    try {
      await contactService.createContact(newContact).then((response) => {
        setPersons([...persons, response]);
        setFilteredPersons([...filteredPersons, response]);
        setNotMsg(`Added ${response.name}`);
        setTimeout(() => {
          setNotMsg(null);
        }, 3000);
        setNewName("");
        setNewNumber("");
      });
    } catch (error) {
      console.log("This is the err", error);
    }
  };

  const filterName = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredItems = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm)
    );

    setGetName(e.target.value);
    setFilteredPersons(filteredItems);
  };

  const getPersonName = (e) => {
    setNewName(e.target.value);
  };

  const getPersonNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const deleteContact = async (id) => {
    const getIdOfContact = persons.find((person) => person.id === id);
    const idToRemove = getIdOfContact.id;

    if (!getIdOfContact) return;
    const message = `Delete ${getIdOfContact.name}`;

    if (window.confirm(message)) {
      try {
        await contactService.deleteContact(id);
        const updatedContact = persons.filter(
          (person) => person.id !== idToRemove
        );
        setNotMsg(`Deleted ${getIdOfContact.name}`);
        setTimeout(() => {
          setNotMsg(null);
        }, 3000);
        setNewName("");
        setNewNumber("");
        setPersons(updatedContact);
        setFilteredPersons(updatedContact);
      } catch (error) {
        console.error("Error deleting contact: ", error);
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notifications message={notMsg} />
      <Filter getName={getName} filterName={filterName} />

      <h3>Add a new</h3>

      <PersonForm
        addNumber={addNumber}
        newName={newName}
        newNumber={newNumber}
        getPersonName={getPersonName}
        getPersonNumber={getPersonNumber}
      />

      <h3>Numbers</h3>
      <Persons
        filteredPersons={filteredPersons}
        deleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
