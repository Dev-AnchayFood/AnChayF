import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD1zL5NB2xxP0nhyMdi21g6FVlUQBNlfZA",
  authDomain: "anchafoodanalyticsv2.firebaseapp.com",
  projectId: "anchafoodanalyticsv2",
  storageBucket: "anchafoodanalyticsv2.firebasestorage.app",
  messagingSenderId: "443078286132",
  appId: "1:443078286132:web:3c3a0c96f6a9f9afb72361",
  measurementId: "G-CFSC6L20M4"
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey: "BKwMQsL9mNLR0Q6rJpv-8853k7w0yALFLxPscwAY7N0W_IlKYiKnCgqpjaYQFqBaFvPRbeIB81M5uuAzUYq-NXM",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
export const auth = getAuth(firebaseApp);
