const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "@primary-color": "#b92020",
                            "@link-color": "#b92020",
                            "@border-radius-base": "5px",
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};