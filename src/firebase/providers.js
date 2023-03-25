import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

  try {

    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult( result );

    const { displayName, email, photoURL, uid } = result.user;
    // console.log({ user });

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }

  } catch (error) {
    console.log(error);

    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    }
  }

}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

  try {

    const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
    const { uid, photoURL } = resp.user;

    // actualizar el displayName en firebase
    await updateProfile(FirebaseAuth.currentUser, { displayName }); // usuario actual

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
    
  } catch (error) {
    // console.log(error);
    return { ok: false, errorMessage: error.message }
  }

}