//META{"name":"StereoCord","source":"https://github.com/Mega-Mewthree/BetterDiscordPlugins/blob/master/Plugins/AutoStartRichPresence/AutoStartRichPresence.plugin.js"}*//

var stereoSound = function () {

	let VoiceConnection = BDV2.WebpackModules.findByUniqueProperties(['getVoiceEngine']).getVoiceEngine().VoiceConnection;

	class Stereo extends VoiceConnection {
		constructor(a, b, c, d, e) {
			super(a, b, c, d, e);
			this.origin = super.setTransportOptions;
		}
		setTransportOptions(obj) {
			if (obj.audioEncoder) {
				obj.audioEncoder.params = { stereo: "1" };
				obj.audioEncoder.channels = 2;
				
			}
			if (obj.fec) {
				obj.fec = false;
				

			}
			if (obj.encodingVoiceBitRate < 448 ) {
				obj.encodingVoiceBitRate = 448;
				
			}
			
			

			this.origin(obj);
			window.sound = this;
		}
	}

	return class _ {
		getName() { return "Stereo input" }
		getDescription() { return "Use left and right voice channels at the same time. Enables stereo voice. Bitrate can be changed and edited. Note - higher bitrates may cause lag and high CPU usage." }
		getAuthor() { return "Unknown" }
		getVersion() { return "0.5" }

		load() { }

		start() {
			BDV2.WebpackModules.findByUniqueProperties(['getVoiceEngine']).getVoiceEngine().VoiceConnection = Stereo;
		}

		stop() {
			BDV2.WebpackModules.findByUniqueProperties(['getVoiceEngine']).getVoiceEngine().VoiceConnection = VoiceConnection;
		}
	};
}();