const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeTheme: {
                    "@primary-color": "#b92020",
                    "@link-color": "#b92020",
                    "@border-radius-base": "5px",
                },
            },
        },
    ],
};
