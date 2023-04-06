import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

// Crear mocks
jest.mock('../../../src/store/auth/thunks.js', () => ({
  startGoogleSignIn: () => mockGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
}));

// sobreescribir cualquier libreria para hacer pruebas
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(), // una funcion que regresa una funcion
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

  beforeEach(() => jest.clearAllMocks());
  
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
  
  test('submit debe de llamar el startLoginWithEmailPassword', () => {

    const email = 'test1@test.com';
    const password = '12345678';

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Correo' });
    // console.log(emailField);
    // screen.debug();
    fireEvent.change( emailField, { target: { name: 'email', value: email } } );
    
    const passwordField = screen.getByTestId('password');
    fireEvent.change( passwordField, { target: { name: 'password', value: password } } );
    
    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit(loginForm);

    expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
      email,
      password
    });

  });

});