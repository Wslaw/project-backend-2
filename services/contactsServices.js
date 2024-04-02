import Contact from "../models/Contact.js";

export const listContacts = (filter={}) => Contact.find(filter, "-createdAt -updatedAt");

export const addContact = (data) => Contact.create(data);

export const getContactByFilter = (filter) => Contact.findOne(filter);

export const removeContact = (filter) => Contact.findOneAndDelete(filter);

export const upgradeContact = (filter, data) => Contact.findOneAndUpdate(filter, data);

// export const updateStatusById = (id, data) => Contact.findByIdAndUpdate(id, data);
