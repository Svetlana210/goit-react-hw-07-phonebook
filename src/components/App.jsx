import { useEffect } from 'react';

import styles from './app.module.css';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/filter/filter-slice';

import { getFilteredContacts } from '../redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';
import {
  fetchAllContacts,
  fetchAddContact,
  fetchDeleteContact,
} from '../redux/contacts/contacts-operations';

const App = () => {
  const filteredContacts = useSelector(getFilteredContacts);

  const filter = useSelector(getFilter);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const onAddContact = ({ name, number }) => {
    dispatch(fetchAddContact({ name, number }));
  };

  const handleChangeFilter = e => {
    const { value } = e.currentTarget;
    dispatch(setFilter(value));
  };

  const onDeleteContact = id => {
    const action = fetchDeleteContact(id);
    dispatch(action);
  };

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <Form onSubmit={onAddContact} />
      <h2>Contacts</h2>
      <Filter onChange={handleChangeFilter} filter={filter} />
      <ContactList
        contacts={filteredContacts}
        deleteContact={onDeleteContact}
      />
    </div>
  );
};

export default App;
