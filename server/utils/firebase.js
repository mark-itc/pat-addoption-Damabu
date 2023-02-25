const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
  apiKey: 'AIzaSyCkAQujR6Smwq-WEoLBHEhOvgTE4BDnB-k',
  authDomain: 'pet-adoption-cd445.firebaseapp.com',
  projectId: 'pet-adoption-cd445',
  storageBucket: 'pet-adoption-cd445.appspot.com',
  messagingSenderId: '93191705724',
  appId: '1:93191705724:web:dfab6a4ff573941857e5f9',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = { storage };
