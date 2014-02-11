(function () {
	var server;

	Ember.Test.regsiterAsyncHelper('serverResponse', function (app, verb, url, body, status) {
		if (!server) createServer();

		status = status || 200;
		body = (typeof body === 'string') ? body : JSON.stringify(body);

		server.respondWith(verb, url, [
				status,
				{'Content-Type': 'application/json'},
				body
			]);

		server.respond();

		return wait(app);
	});

	function createServer () {
		server = sinon.fakeServer.create();
	}
})();
