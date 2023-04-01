
export const initialState = {
  status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const authenticatedState = {
  status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
  uid: 'ABC123',
  email: 'test@test.com',
  displayName: 'Test 1',
  photoURL: 'https://demo.jpg',
  errorMessage: null,
}

export const notAuthenticatedState = {
  status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const demoUser = {
  uid: 'ABC123',
  email: 'test@test.com',
  displayName: 'Test 1',
  photoURL: 'https://foto.jpg',
}