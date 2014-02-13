(function () {
    var server;

    window.serverResponse = function (verb, url, body, status) {
        if (!server) createServer();

        status = status || 200;
        body = (typeof body === 'string') ? body : JSON.stringify(body);

        server.respondWith(verb.toUpperCase(), url, [
                status,
                {'Content-Type': 'application/json'},
                body
            ]);

        server.respond();
    };


	// Clear the server responses
    window.serverReset = function () {
        if (server) {
            server.responses = [];
        }
    };

    Ember.Test.registerHelper('serverRestore', function () {
        server.restore();
    });

    Ember.Test.registerHelper('serverStart', function () {
        createServer();
    });

    function createServer () {
        server = sinon.fakeServer.create();
        server.autoRespond = true;
    }
})();
