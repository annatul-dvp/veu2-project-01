import { createApp } from 'vue';
import App from './App.vue';

import { data } from './firstTask';
import messagedata from './secondTask';

createApp(App).mount('#app');

alert(data.message);
alert(messagedata.message);
