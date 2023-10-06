import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllContacts = async () => {
  const request = await axios.get(baseUrl).then((response) => response.data);
  return request;
};

const createContact = async (newDetails) => {
  const request = await axios
    .post(baseUrl, newDetails)
    .then((response) => response.data);
  return request;
};
const updateContact = async (id, newDetails) => {
  const request = await axios
    .put(`${baseUrl}?${id}`, newDetails)
    .then((response) => response.data);
  return request;
};

const deleteContact = async (id) => {
  const request = await axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.data);
  return request;
};

export default { getAllContacts, createContact, updateContact, deleteContact };
