const fs = require("fs").promises;
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.resolve("contacts.json");

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
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
function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactToRemove = String(contactId);
    const index = await contacts.findIndex(contact => contact.id === contactToRemove);

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

function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    }

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
}
