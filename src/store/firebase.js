import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: "AIzaSyBj6t1vuQtKcOtIhr4DNLRpl9Slcupo1IE",
	authDomain: "hunt-bitwhale.firebaseapp.com",
	databaseURL: "https://hunt-bitwhale.firebaseio.com",
	projectId: "hunt-bitwhale",
	storageBucket: "hunt-bitwhale.appspot.com",
	messagingSenderId: "1093868288427"
});

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database();