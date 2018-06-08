

New posts are emitted to the server from client then emitted to all clients from server to update the ui in all clients. similar way, comments too can work. No db is used here, just a fun experiment.Mongodb can be used to store the data.

to run in local:

1. NPM Install<br/>

2. NPM run dev <br/>

3. goto http://localhost:7777


##
Stack:

Express server, 

Socket.io for socket communication, 

one html file,one css file node-sass for scss to css, 

uglifyjs for minimising the js, nodemon for watch. No ES-6 used.

jQuery used for dom interactions.

minimal Handlebars for templating.

Webpack could have been used and React could be used to build this. This vanilla experiment took lesser time.

moment.js used for displaying the age of posts/comments

##
