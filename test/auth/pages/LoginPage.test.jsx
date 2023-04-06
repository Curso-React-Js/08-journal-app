import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockGoogleSignIn = jest.fn();

// Crear mock
jest.mock('../../../src/store/auth/thunks.js', () => ({
  startGoogleSignIn: () => mockGoogleSignIn
}));

const store = configureStore({
  reducer: { 
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState // el estado actual
  }
});

describe('Pruebas en <LoginPage/>', () => {
  
  test('debe de mostrar el componente correctamente', () => {

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();

    expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);    
  });

  test('buton de google debe de llamar el startGoogleSignIn', () => {

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // console.log(store.getState()); // not-authenticated

    // screen.debug();
    const googleBtn = screen.getByLabelText('google-btn');
    // console.log(googleBtn);

    // Ver el estado del boton disabled, y corregir poniendole un estado
    // del usuario
    fireEvent.click(googleBtn); // hacemos click

    // console.log(store.getState()); // checking

    expect( mockGoogleSignIn ).toHaveBeenCalled();    
  });
  
});