const Vue = require('vue');

const createApp = (data) => {
    const { content } = data;
    return new Vue({
        data: {
            content
        },
        template: `<div>{{ content }}</div>`
    });
};

module.exports = createApp;
