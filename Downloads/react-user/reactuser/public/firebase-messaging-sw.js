importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyD1zL5NB2xxP0nhyMdi21g6FVlUQBNlfZA",
  authDomain: "anchafoodanalyticsv2.firebaseapp.com",
  projectId: "anchafoodanalyticsv2",
  storageBucket: "anchafoodanalyticsv2.firebasestorage.app",
  messagingSenderId: "443078286132",
  appId: "1:443078286132:web:3c3a0c96f6a9f9afb72361",
  measurementId: "G-CFSC6L20M4"
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
