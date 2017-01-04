'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.VUE_ENV = 'server';

var server = (0, _express2.default)();
server.use(_express2.default.static('/app'));

var PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
    console.log('The server is running at http://localhost:' + PORT + '/');
});
