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
import { db } from '../store/firebase.js';
let exampleRef = db.ref('sampledata');

export default {
  name: 'home',
  components: {},
  data () {
    return {
      newItem: '',
      apiData: '',
      bfxAuth: '',
      apiInterval: ''
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
    callCoinMarketApi() {
      // const request = new this.$bfx('5AtwitKhDZjAsbwMfFuWhaH67rtf1D8fylRHl2q4glF', 'Xr1BYSuRMZOkZTb7JnvZOZMznsecNVS3eaGnC7THV09', {version: 1,}).rest 
      // request.orderbook('BTCUSD', (err, res) => {
      //   if (err) console.log(err)
      //   console.log(res)
      // })
      const bfxRest = new this.$bfx('', '', {version: 1}).rest
      bfxRest.stats('BTCUSD', (err, res) => {
        if (err) console.log(err)
        console.log(err)
      })
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
    this.callCoinMarketApi();

    // const bws = new this.$bfx('DNQv34NxXguC', 'JrJ2KG8Q70jjzo', {version: 2,
    //   transform: true}).ws;

    // bws.on('open', () => {
    //   bws.subscribeTicker('BTCUSD')
    //   bws.subscribeOrderBook('BTCUSD')
    //   bws.subscribeTrades('BTCUSD')

    //   // authenticate
    //   // bws.auth()
    // })

    // this.apiInterval = setInterval(function(){alert("Interval reached");}, 5000);
    // clearInterval(this.apiInterval);
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
