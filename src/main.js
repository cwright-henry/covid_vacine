import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'animate.css/animate.css'
import { GA, numberFormat } from "@/utils";

Vue.config.productionTip = false;

Vue.filter('number', function (value, precision) {
	return numberFormat(value, precision);
});

Vue.config.errorHandler = function (err, vm, info) {
	GA.methods.gaError("Vue Error Handler", `Vue Error - ${err} - ${info}`);
	console.log(err)
}

window.onerror = function (msg, url, line, col, error) {
	GA.methods.gaError("Window Error Handler", `Window Error - ${msg} - ${line} - ${col} - ${error}`);
	console.log(error)
}

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
