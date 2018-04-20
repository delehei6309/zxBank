/**
 * Created by hekk on 2017/5/23.
 */
var path = require('path');
var express = require('express');
var app = express();
app.use('/static', express.static(path.resolve('./dist')));
var port = 8088;
app.get('*', function (req, res) {
    res.sendFile(path.resolve('./html/index.html'))
})
app.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {

        console.info("==>  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});
