import { useState } from "react";

import "./App.css";

const Filter = ({ getName, filterName }) => {
  return (
    <div>
      Filter shown with: <input value={getName} onChange={filterName} />
    </div>
  );
};
const Persons = ({ filteredPersons }) => {
  console.log(filteredPersons);
  // filteredPersons.map((person) => {
  //   return (
  //     <p key={Math.random()}>
  //       {person.name}: {person.number}
  //     </p>
  //   );
  // });
};

const PersonForm = ({
  addNumber,
  newName,
  getPersonName,
  newNumber,
  getPersonNumber,
}) => {
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
  </form>;
};
function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [getName, setGetName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const addNumber = (e) => {
    e.preventDefault();

    const checkExistingName = persons.some((person) => person.name === newName);
    if (checkExistingName) {
      alert(`${newName} is already in the phonebook.`);
      return;
    }
    setPersons([
      ...persons,
      { name: newName, number: newNumber, id: persons.length },
    ]);
    setNewName("");
    setNewNumber("");
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
  return (
    <div>
      <h2>Phonebook</h2>

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
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
}

export default App;
