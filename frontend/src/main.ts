import { createApp } from 'vue';

// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faEye, faEyeSlash } from '@fortawesome/pro-light-svg-icons';
import { faGithub, faBitbucket } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './store';

library.add(faLock, faGithub, faBitbucket, faEye, faEyeSlash);

const app = createApp(App);
app.use(router);
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
