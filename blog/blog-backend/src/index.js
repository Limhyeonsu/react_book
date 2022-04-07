//이 파일에서만 no-global-assign ESLint 옵션을 비활성화 한다.
require = require('esm')(module);
module.exports = require('./main.js');
