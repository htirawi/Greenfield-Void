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
//maknig the room name 
//using googles public server 
const roomName = 'observable-' + location.hash;
const configuration = {
	iceServers: [{
		urls: 'stun:stun.l.google.com:19302'
	}]
};


drone.on('open', error => {
	if (error) {
		return console.error(error);
	}
	room = drone.subscribe(roomName);
	room.on('open', error => {
		if (error) {
			console.error(error);
		}
	});


	room.on('members', members => {
		const isOfferer = members.length === 2;
		startWebRTC(isOfferer);
	});
});


function sendMessage(message) {
	drone.publish({
		room: roomName,
		message
	});
}

function startWebRTC(isOfferer) {
	pc = new RTCPeerConnection(configuration);


	pc.onicecandidate = event => {
		if (event.candidate) {
			sendMessage({'candidate': event.candidate});
		}
	};


	if (isOfferer) {
		pc.onnegotiationneeded = () => {
			pc.createOffer().then(localDescCreated);
		}
	}


	pc.onaddstream = event => {
		remoteVideo.srcObject = event.stream;
	};

	navigator.mediaDevices.getUserMedia({
		audio: true,
		video: true,
	}).then(stream => {
		localVideo.srcObject = stream;
		pc.addStream(stream);
	});


	room.on('data', (message, client) => {

		if (client.id === drone.clientId) {
			return;
		}

		if (message.sdp) {

			pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
				if (pc.remoteDescription.type === 'offer') {
					pc.createAnswer().then(localDescCreated);
				}
			});
		} else if (message.candidate) {
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
