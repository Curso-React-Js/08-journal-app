import { checkingCredentials } from '../../../src/store/auth';
import { checkingAuthentication } from '../../../src/store/auth/thunks';

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
  
});