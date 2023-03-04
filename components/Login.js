import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';


const Login = () => {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId: '73469770005-kcol0q1sass1q5496tp4rt3p7obf36l0.apps.googleusercontent.com',
  });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userInfo = auth().signInWithCredential(googleCredential)

    userInfo.then((user) => {
      console.log(user)
    })
      .catch((err) => {
        console.log(err)
      })
  }
  

  // sign out function
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess()
      await auth().signOut()
    } catch (err) {
    console.log(err)
  }
}
  if (initializing) return null;
  

  if (!user) {
    return (
      <View className='flex justify-center items-center'>
        <Text className='font-bold text-2xl text-center mb-5 uppercase'>sign in with google</Text>
        <GoogleSigninButton style={{ padding: 30, width: 200, marginTop: 25 }}
          onPress={onGoogleButtonPress}  />
      </View>
    )
  }

  return (
    <View className='flex justify-center items-center'>
      <Text className='font-bold text-2xl text-center mb-4'>
        Welcome, { user.displayName }  
      </Text>
      <Image source={{ uri: user.photoURL }} className='rounded mt-5 w-80 h-80' />
      
      <TouchableOpacity onPress={signOut}>
        <Text className='uppercase bg-green-300 p-3 mt-5 rounded'>sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login