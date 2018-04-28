var room;
var pc;
// dronescale channle ID
const channaleID = 'K6g3If8QsWcDWdnL'
function createRandomHash() {
	return Math.floor(Math.random() * 9999999999).toString(32)
} 
//creating a hcashed url if it didnt exist 
if (!location.hash) {
	location.hash =  createRandomHash()
}

//creating a new instance with the channel id
const drone = new ScaleDrone(channaleID);
//making the room name 
//using googles public server 
const roomName = 'observable-' + location.hash;
const configuration = {
	iceServers: [{
		urls: 'stun:stun.l.google.com:19302'
	}]
};

// a connection has been opened
drone.on('open', error => {
	if (error) {
		return console.error(error);
	}
// subscribing to the room 
room = drone.subscribe(roomName);
room.on('open', error => {
	if (error) {
		console.error(error);
	}
});

// members are the users who joined inculding yourself
room.on('members', members => {
// if you if you are the second user it will create an offer
const isOfferer = members.length === 2;
startWebRTC(isOfferer);
});
});

// scaledrne sending signaling data 
function sendMessage(message) {
	drone.publish({
		room: roomName,
		message
	});
}

function startWebRTC(isOfferer) {
	pc = new RTCPeerConnection(configuration);

// onicecandidate tells us when an ice agent delivers a message to the other peer 
// thorugh the signaling server
pc.onicecandidate = event => {
	if (event.candidate) {
		sendMessage({'candidate': event.candidate});
	}
};

// if its the second user it makes onnegotiationneeded create the offer 
if (isOfferer) {
	pc.onnegotiationneeded = () => {
		pc.createOffer().then(localDescCreated);
	}
}

// displayes a remote stream in #remotevideo 
pc.onaddstream = event => {
	remoteVideo.srcObject = event.stream;
};
// set what kind of information to send in the stream
navigator.mediaDevices.getUserMedia({
	audio: true,
	video: true,
}).then(stream => {
	localVideo.srcObject = stream;
	pc.addStream(stream);
});

// listen to signaling data 
room.on('data', (message, client) => {

	if (client.id === drone.clientId) {
		return;
	}

	if (message.sdp) {
		// called after receving an offer or answer from another peer
		pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
			if (pc.remoteDescription.type === 'offer') {
				//answering an offer when receving it 
				pc.createAnswer().then(localDescCreated);
			}
		});
	} else if (message.candidate) {
		// adding the ice candidate to the remote description
		pc.addIceCandidate(
			new RTCIceCandidate(message.candidate)
			);
	}
});
}



function localDescCreated(desc) {
	pc.setLocalDescription(
		desc,
		() => sendMessage({'sdp': pc.localDescription})
		);
}
