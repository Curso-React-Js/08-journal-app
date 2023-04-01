import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { authenticatedState, demoUser, initialState } from '../../fixtures/authFixtures';

describe('Pruebas en authSlice', () => {
  
  test('debe de regresar el estado inicial y llamarse "auth"', () => {  
    const state = authSlice.reducer(initialState, {});
    // console.log(state);
    
    expect( authSlice.name ).toBe('auth');
    expect( state ).toEqual( initialState );
  });

  test('debe de realizar la autenticación', () => {
    // console.log(login( demoUser )); // el payload
    const state = authSlice.reducer(initialState, login(demoUser));
    // console.log(state); // objeto authenticated

    expect( state ).toEqual({
      status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
    
  });

  test('debe de realizar el logout sin argumentos', () => {
    const state = authSlice.reducer(authenticatedState, logout());
    
    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined
    });
  });
  
  test('debe de realizar el logout y mostrar mensaje de error', () => {
    const errorMessage = 'Credenciales no son correctas';
    const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
    // console.log(state);

    expect( state ).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage
    });
  });

  test('debe de cambiar el estado a checking', () => {
    const state = authSlice.reducer( authenticatedState, checkingCredentials() );
    // console.log(state);
    expect( state.status ).toBe('checking');
  });
  
});