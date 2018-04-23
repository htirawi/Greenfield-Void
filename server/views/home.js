// replace these values with those generated in your TokBox Account
var apiKey = "46104572";
var sessionId = "1_MX40NjEwNDU3Mn5-MTUyNDM5NTY5NjY4Nn42endUa2xkWWlpbVk1ZE50S2J1ekhxOTZ-fg";
var token = "T1==cGFydG5lcl9pZD00NjEwNDU3MiZzaWc9ZTQxYTVkNTQ4MGQ5MmM1OTk4YzhmMzU5NmM0MjgwOGQ2NjBiMjBlYzpzZXNzaW9uX2lkPTFfTVg0ME5qRXdORFUzTW41LU1UVXlORE01TlRZNU5qWTRObjQyZW5kVWEyeGtXV2xwYlZrMVpFNTBTMkoxZWtoeE9UWi1mZyZjcmVhdGVfdGltZT0xNTI0Mzk1OTc4JnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MjQzOTU5NzguMDUzMzIxMDYyMzQ1MDA=";
var apiSecret = "c6566dac4aefec4e63785a34cf508e14f1b9bc7e"


// // (optional) add server code here
initializeSession();



// Handling all of our errors here by alerting them
function handleError(error) {
	if (error) {
		alert(error.message);
	}
}

function initializeSession() {
	var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
  	session.subscribe(event.stream, 'subscriber', {
  		insertMode: 'append',
  		width: '100%',
  		height: '100%'
  	}, handleError);
  });
  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
  	insertMode: 'append',
  	width: '100%',
  	height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
    	handleError(error);
    } else {
    	session.publish(publisher, handleError);
    }
  });
}