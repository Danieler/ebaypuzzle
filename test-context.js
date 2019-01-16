var context = require.context('./client/spec', true, /.test\.js$/);
context.keys().forEach(context);
