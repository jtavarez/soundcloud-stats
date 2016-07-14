var context = require.context('./src', true, /_test\.js$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);