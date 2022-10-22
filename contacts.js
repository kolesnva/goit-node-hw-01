const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactToGet = String(contactId);
    const result = contacts.find((contact) => contact.id === contactToGet);
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactToRemove = String(contactId);
    const index = await contacts.findIndex(
      (contact) => contact.id === contactToRemove
    );

    if (index === -1) {
      return null;
    }

    const [result] = contacts.splice(index, 1);

    await updateContacts(contacts);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await updateContacts(contacts);

    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
