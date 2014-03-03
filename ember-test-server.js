(function () {
    var server;

    window.serverResponse = function (verb, url, body, status) {
    	var fnResponse = false;
        if (!server) createServer();

        status = status || 200;

        if (typeof verb !== 'function' && typeof body !== 'function') {
			body = (typeof body === 'string') ? body : JSON.stringify(body);
			verb = verb.toUpperCase();

			server.respondWith(verb.toUpperCase(), url, [
					status,
					{'Content-Type': 'application/json'},
					body
				]);
        } else if (typeof verb === 'function') {
       		server.respondWith(method);
        } else if (typeof body === 'function') {
       		server.respondWith(verb.toUpperCase(), url, body);

        }


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
