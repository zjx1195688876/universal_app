<template>
    <div class="page-container">
        <div>{{ count }}</div>
    </div>
</template>

<script>
// 在这里导入模块，而不是在 `store/index.js` 中
import indexStoreModule from '../store/modules/index';

export default {
    asyncData ({ store }) {
        store.registerModule('index', indexStoreModule);
        return store.dispatch('index/inc');
    },

    // 重要信息：当多次访问路由时，
    // 避免在客户端重复注册模块。
    destroyed () {
        this.$store.unregisterModule('index');
    },

    computed: {
        count () {
            return this.$store.state.index.count;
        }
    },
    title () {
        return this.count
        ? this.count
        : 'page1';
    }
}
</script>