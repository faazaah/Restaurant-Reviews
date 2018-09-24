// Register the Service Worker

if (navigator.serviceWorker) {
	navigator.serviceWorker.register('/sw.js').then(function() {
		console.log("Registration Successful");
	}).catch(function() {
		console.log("Registration Unsuccessful");
	});
}
else {
	console.log("Service Worker is not supported");
}