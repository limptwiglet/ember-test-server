(function () {
    var server;

    Ember.Test.registerHelper('serverResponse', function (app, verb, url, body, status) {
        if (!server) createServer();

        status = status || 200;
        body = (typeof body === 'string') ? body : JSON.stringify(body);

        server.respondWith(verb.toUpperCase(), url, [
                status,
                {'Content-Type': 'application/json'},
                body
            ]);

        server.respond();
    });


    Ember.Test.registerHelper('serverReset', function () {
        server.restore();
    });

    Ember.Test.registerHelper('serverStart', function () {
        createServer();
    });

    function createServer () {
        server = sinon.fakeServer.create();
        server.autoRespond = true;
        server.autoRespondAfter = 1;
    }
})();
