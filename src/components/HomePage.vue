<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
<!--       <div class="right">
        <v-ons-toolbar-button @click="actionSheetVisible = true">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div> -->
    </v-ons-toolbar>

    <div class="header">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bitcoin_logo.svg/2000px-Bitcoin_logo.svg.png">
    </div>
    <v-ons-list>
      <v-ons-list-header>
        Card
      </v-ons-list-header>
      <v-ons-list-item v-for="(itam, index) in example">
        <div class="center">
          {{itam.text}}
        </div>
        <div class="right">
          <v-ons-button @click="removeItem(itam['.key'])">
            Remove
          </v-ons-button>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <v-ons-input placeholder="Enter smth" float
                     v-model="newItem"
                     @keyup.enter="addItem()">
        </v-ons-input>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyBj6t1vuQtKcOtIhr4DNLRpl9Slcupo1IE",
  authDomain: "hunt-bitwhale.firebaseapp.com",
  databaseURL: "https://hunt-bitwhale.firebaseio.com",
  projectId: "hunt-bitwhale",
  storageBucket: "hunt-bitwhale.appspot.com",
  messagingSenderId: "1093868288427"
};
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.database()
let exampleRef = db.ref('sampledata');

export default {
  name: 'home',
  components: {},
  data () {
    return {
      newItem: '',
    }
  },
  firebase: {
    example: exampleRef
  },
  methods: {
    removeItem(key) {
      exampleRef.child(key).remove();
    },
    addItem (item) {
      if (this.newItem) {
        exampleRef.push({
          text: this.newItem
        })
        this.newItem = '';
      }
    },
    onOffline() {
      this.$ons.notification.alert(`
        Seems like there is no Internet Connection. There might by problems with loading images.
      `);
    }
  },
  computed: {
  },
  created() {
    document.addEventListener("offline", this.onOffline, false);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  text-align: center;
  img {
    max-width: 300px;
    padding: 30px 0;
  }
}

ons-list-title:not(:first-of-type) {
  margin-top: 30px;
}

ons-card {
  text-align: center;
}

ons-list-item, ons-card {
  cursor: pointer;
}
</style>
