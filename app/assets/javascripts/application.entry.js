// Frameworks
window.$ = window.jQuery = require('jquery');

// Helpers
const helpers = require.context('./helpers', true, /\.js$/);
helpers.keys().forEach(helpers);

// Libs
require('jquery-ujs');

// Components
const components = require.context('./../../concepts', true, /\.js$/);
components.keys().forEach(components);
