import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Page1 = () => import('../views/page1.vue');
const Page2 = () => import('../views/page2.vue');
const Page3 = () => import('../views/page3.vue');

console.log('Page1.name: ', Page1.name);

export default function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            { path: '/', component: Page1 }
        ]
    });
};
