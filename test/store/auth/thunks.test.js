import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
  
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks() );

  test('debe de invocar el checkingCredentials', async() => {
    // console.log( checkingCredentials() );

    // () => el primero es el llamado de la funcion y el segundo
    // () => es el valor de llamada de la funcion
    await checkingAuthentication()( dispatch );
    // expect( dispatch ).toHaveBeenCalledWith({
    //   "payload": undefined, 
    //   "type": "auth/checkingCredentials"
    // });
    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
  });

  test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async() => {
    const loginData = { ok: true, ...demoUser }
    await signInWithGoogle.mockResolvedValue( loginData );

    // thunk de prueba
    await startGoogleSignIn()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
  });
  
  test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => {
    const loginData = { ok: false, errorMessage: 'Un error en Google' }
    await signInWithGoogle.mockResolvedValue( loginData );

    // thunk de prueba
    await startGoogleSignIn()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    expect(logout( loginData.errorMessage ).payload ).toBe( loginData.errorMessage );
  });

  test('startLoginWithEmailPassword debe de llamar checkingCredentiasl y login - Exito', async() => {
    const loginData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: '12345678' }

    await loginWithEmailPassword.mockResolvedValue( loginData );

    await startLoginWithEmailPassword( formData )( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( login( loginData ).payload ).toEqual( loginData );
  });

  test('startLoginWithEmailPassword debe de llamar checkingCredentiasl y logout - Error', async() => {
    const loginData = { ok: false, errorMessage: 'Credenciales incorrectas' }
    const formData = { email: 'noSoyUnCorreo', password: '' }

    await loginWithEmailPassword.mockResolvedValue( loginData );

    await startLoginWithEmailPassword( formData )( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( logout( loginData.errorMessage ).payload ).toBe( loginData.errorMessage );
  });

  test('startLogout debe de llamar logoutfirebase, clearNotes y logout', async() => {
    await startLogout()( dispatch );

    expect( logoutFirebase ).toHaveBeenCalled();
    expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
    expect( dispatch ).toHaveBeenCalledWith( logout({}) );

    // console.log(logout({}));
  });
  
});