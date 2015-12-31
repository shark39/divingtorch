'use strict';

/**
 * @ngdoc overview
 * @name core
 * @description The angular services, filters, directives, filters within the core module are accessible throughout the angular app like any other provider within the app, but these providers do not necessarily belong to any particular module, hence their placement would be here.
 */
ApplicationConfiguration.registerModule('core');




var speechRecognition = function(){
  console.log('speechRecognition');
}

var speech = function() {
	if( typeof speechRecognition !== 'undefinded') {
		return new speechRecognition();
	} else if( typeof msSpeechRecognition !== 'undefined') {
		return new msSpeechRecognition();
	} else if( typeof mozSpeechRecognition !== 'undefined') {
		return new mozSpeechRecognition();
	} else if( typeof webkitSpeechRecognition !== 'undefined') {
		return new webkitSpeechRecognition();
	} else {
		
	}
	throw new Error('No speech recognition API detected!');
};

