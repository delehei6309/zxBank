import Vue from 'vue';
import App from './App';
import router from './router';
import 'flex.css/dist/flex.css';
import './less/base.less';

new Vue({
    el: '#app',
    router:router,
    render: h => h(App)
});

