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
    setPhotosToActiveNote: ( state, action ) => {
      // Preservamos las imagenes anteriores y agregamos las nuevas al arreglo
      state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
      state.isSaving = false;
    },
    clearNotesLogout: ( state ) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: ( state, action ) => {
      state.active = null;
      state.notes = state.notes.filter( note => note.id !== action.payload );
    },
  }
});

export const { 
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
 } = journalSlice.actions;