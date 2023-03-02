import {
  getAllContacts,
  addContact,
  deleteContact,
} from '../../services/contacts';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetch-all',
  async (_, thunkAPI) => {
    try {
      const data = await getAllContacts();
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);

export const fetchAddContact = createAsyncThunk(
  'contacts/add',
  async (data, { rejectWithValue }) => {
    try {
      const result = await addContact(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  },
  {
    condition: ({ name }, { getState }) => {
      const { contacts } = getState();
      const normalizedName = name.toLowerCase();

      const result = contacts.items.find(({ name }) => {
        return name.toLowerCase() === normalizedName;
      });
      if (result) {
        alert(`Name: ${name} is already exist`);
        return false;
      }
    },
  }
);

export const fetchDeleteContact = createAsyncThunk(
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteContact(id);
      return id;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);
