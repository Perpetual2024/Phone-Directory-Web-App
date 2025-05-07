import axios from 'axios';

const BASE_URL = 'http://localhost:8080/contact-registry'

export const getAllContacts = async () => await axios.get(`${BASE_URL}/contacts?format=json`);
export const getContactByPhone = (phone) => axios.get(`${BASE_URL}/contacts/phone/${phone}`);
export const getContactsByCounty = (county) => axios.get(`${BASE_URL}/contacts/county/${county}`);
export const createContact = (contactData) => axios.post(`${BASE_URL}/contacts`, contactData);
export const updateContact = (id, contactData) => axios.put(`${BASE_URL}/contacts/${id}`, contactData);
export const deleteContact = (id) => axios.delete(`${BASE_URL}/contacts/${id}`);
