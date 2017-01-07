require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        console.log("RELOAD")
        // emit browsersync event here
        // (event.action === 'reload') && emit(__HMR_FULL_RELOAD__)
    }
})
