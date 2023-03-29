import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    // active: {
    //   id: 'ABC123',
    //   title: '',
    //   body: '',
    //   date: 12123467,
    //   imageUrls: [], // https://foto1.jpg, https://foto2.jpg
    // }
  },
  reducers: {
    savingNewNote: ( state ) => {
      state.isSaving = true;
    },
    addNewEmptyNote: ( state, action ) => {
      state.notes.push( action.payload );
      state.isSaving = false;
    },
    setActiveNote: ( state, action ) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: ( state, action ) => {
      state.notes = action.payload;
    },
    setSaving: ( state, action ) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updateNote: ( state, action ) => {
      state.isSaving = false;

      state.notes = state.notes.map(note => {

        if (action.payload.id === note.id) {
          return action.payload;
        }

        return note;
      });

      // Mostrar mensaje de actualizacion
      state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
    },
    deleteNoteById: ( state, action ) => {

    },
  }
});

export const { 
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
 } = journalSlice.actions;