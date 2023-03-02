export const getAllContacts = ({ contacts }) => contacts.items;

export const getFilteredContacts = ({ contacts, filter }) => {
  if (!filter) {
    return contacts.items;
  }
  const result = contacts.items.filter(({ name }) => {
    return name.toLowerCase().includes(filter.toLowerCase());
  });
  return result;
};
