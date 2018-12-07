import Vue from 'vue'
import App from './App.vue'
import createRouter from './router';
import createStore from './store';
import { sync } from 'vuex-router-sync';
import titleMixin from './util/title';

// mixin for handling title
Vue.mixin(titleMixin);

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
const createApp = () =>{
    // 创建 router 和 store 实例
    const router = createRouter();
    const store = createStore();

    // 同步路由状态(route state)到 store
    sync(store, router);

    // 创建应用程序实例，将 router 和 store 注入
    const app = new Vue({
        // 注入 router 到根 Vue 实例
        router,
        store,
        // 根实例简单的渲染应用程序组件。
        render: h => h(App)
    });

    // 暴露 app, router 和 store
    return {
        app,
        router,
        store
    };
};

export default createApp;