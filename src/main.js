import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'


const app = createApp(App)

app.use(store)

app.mount('#app')

/*var ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=50b76cbff49405615ac5929bbdddb21f6f21879cf6447688bd4f17397bf9bfb7');
ccStreamer.onopen = function onStreamOpen() {
    var subRequest = {
        "action": "SubAdd",
        "subs": ["2~Coinbase~BTC~USD"]
    };
    ccStreamer.send(JSON.stringify(subRequest));
}

ccStreamer.onmessage = function onStreamMessage(message) {
    var message = event.data;
    message = JSON.parse(message)
    console.log(message)
}*/

