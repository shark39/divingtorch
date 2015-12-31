'use strict';
var ApplicationConfiguration = (function() {
    var applicationModuleName = 'divingtorch';
    var applicationModuleVendorDependencies = [
        'ngResource',
        
        'ngCookies', 
        
        'ngAnimate', 
        
        'ngTouch', 
        
        'ngSanitize', 
        'ui.router',
        'ui.bootstrap',
        'ui.utils'
    ];
    var registerModule = function(moduleName) {
        angular
            .module(moduleName, []);
        angular
            .module(applicationModuleName)
            .requires
            .push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();

'use strict';

angular
    .module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

angular
    .module(ApplicationConfiguration.applicationModuleName)
    .config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);
angular
    .element(document)
    .ready(function() {
        if (window.location.hash === '#_=_') {
            window.location.hash = '#!';
        }
        angular
            .bootstrap(document,
                [ApplicationConfiguration.applicationModuleName]);
    });

'use strict';

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


(function() {
  var Speech;

  Speech = {
    startTimestamp: null,
    recognizing: false,
    recording: false,
    recognition: null,
    ignoreEnd: null,
    transcript: null,
    messages: {
      info_speak_now: 'Speak now.',
      info_no_speech: 'No speech was detected. You may need to adjust your <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">microphone settings</a>.',
      info_no_mic: 'No microphone was found. Ensure that a microphone is installed and that',
      info_blocked: 'Permission to use microphone is blocked. To change, go to chrome://settings/contentExceptions#media-stream',
      info_denied: 'Permission to use microphone was denied.',
      info_start: 'Click on the microphone icon and begin speaking for as long as you like.',
      info_upgrade: 'Web Speech API is not supported by this browser. Upgrade to <a href="//www.google.com/chrome">Chrome</a> version 25 or later.',
      info_allow: 'Click the "Allow" button above to enable your microphone.'
    },
    model: {
      icon: null,
      status: null,
      message: null,
      results: null
    },
    elements: {
      icon: angular.element('.speech-icon'),
      btn: angular.element('.speech-btn'),
      container: angular.element('.speech-container'),
      hint: angular.element('.speech-hint'),
      status: angular.element('.speech-status'),
      message: angular.element('.speech-message')
    },
    icons: {
      start: 'https://dl.dropboxusercontent.com/u/26906414/cdn/img/mic.gif',
      recording: 'https://dl.dropboxusercontent.com/u/26906414/cdn/img/mic-animate.gif',
      blocked: 'https://dl.dropboxusercontent.com/u/26906414/cdn/img/mic-slash.gif'
    },
    init: function() {
      this.log('Speech.init()', this);
      if ('webkitSpeechRecognition' in window) {
        this.setup();
      } else {
        this.showUpgrade();
      }
      this.model.message = this.messages.info_start;
      this.model.icon = this.icons.start;
      return this;
    },
    onstart: function(event) {
      Speech.log('Speech.onstart()', event);
      Speech.recognizing = true;
      Speech.showInfo('info_speak_now');
      return Speech.model.icon = Speech.icons.recording;
    },
    onerror: function(event) {
      Speech.log('Speech.onerror()', event);
      if (event.error === 'no-speech') {
        Speech.model.icon = Speech.icons.start;
        Speech.showInfo('info_no_speech');
        Speech.ignoreEnd = true;
      }
      if (event.error === 'audio-capture') {
        Speech.model.icon = Speech.icons.start;
        Speech.showInfo('info_no_microphone');
        Speech.ignoreEnd = true;
      }
      if (event.error === 'not-allowed') {
        if (event.timeStamp - Speech.startTimestamp < 100) {
          Speech.showInfo('info_blocked');
        } else {
          Speech.showInfo('info_denied');
        }
        return Speech.ignoreEnd = true;
      }
    },
    onend: function() {
      Speech.log('Speech.onend()');
      Speech.recognizing = false;
      if (Speech.ignoreEnd) {
        return;
      }
      Speech.model.icon = Speech.icons.start;
      if (!Speech.transcript) {
        Speech.showInfo('info_start');
        return;
      }
      return Speech.showInfo('');
    },
    onresult: function(event) {
      var i, interim_transcript;
      Speech.log('Speech.onresult()', event);
      Speech.recognizing = false;
      interim_transcript = '';
      if (typeof event.results === 'undefined') {
        this.recognition.onend = null;
        this.recognition.stop();
        Speech.showUpgrade();
        return;
      }
      i = event.resultIndex;
      while (i < event.results.length) {
        if (event.results[i].isFinal) {
          Speech.transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
        ++i;
      }
      Speech.transcript = Speech.capitalize(Speech.transcript);
      return Speech.transcript || interim_transcript;
    },
    showInfo: function(message) {
      this.log('Speech.showInfo()', this);
      return this.model.message = this.messages[message];
    },
    showUpgrade: function() {
      return this.log('Speech.showUpgrade()', this);
    },
    setup: function() {
      this.log('Speech.setup()', this);
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.onstart = this.onstart;
      this.recognition.onerror = this.onerror;
      this.recognition.onend = this.onend;
      return this.recognition.onresult = this.onresult;
    },
    start: function() {
      this.log('Speech.start()');
      if (this.recognizing) {
        this.recognition.stop();
        return;
      }
      this.recognizing = true;
      this.startTimestamp = new Date();
      return this.recognition.start();
    },
    stop: function() {
      return this.log('Speech.stop()');
    },
    capitalize: function(str) {},
    linebreak: function(s) {},
    log: function() {
      return console.log(arguments);
    }
  };

}).call(this);

(function() {
  'use strict';
  var _app;

  _app = angular.module('core', []);

  _app.service('jsSpeechFactory', [
    '$rootScope', function($rootScope) {
      var first_char, jsSpeechFactory, one_line, two_line;
      two_line = /\n\n/g;
      one_line = /\n/g;
      first_char = /\S/;
      return jsSpeechFactory = {
        icons: {
          start: 'http://goo.gl/2bfneP',
          recording: 'http://goo.gl/p2jHO9',
          blocked: 'http://goo.gl/vd4AKi'
        },
        messages: {
          info_speak_now: 'Speak now... or <a href="#" ng-click="reset()">Cancel</a>',
          info_stop: 'Proccessing your voice...',
          info_no_speech: 'No Speech was detected. You may need to adjust your <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">microphone settings</a>.',
          info_no_mic: 'No microphone was found. Ensure that a microphone is installed.',
          info_blocked: 'Permission to use microphone is blocked. To change, go to <a href="chrome://settings/contentExceptions#media-stream">chrome://settings/contentExceptions#media-stream</a>.',
          info_denied: 'Permission to use microphone was denied.',
          info_setup: 'Click on the microphone icon to enable Web Speech.',
          info_upgrade: 'Web Speech API is not supported by this browser. Upgrade to <a href="//www.google.com/chrome" target="_blank">Chrome</a> version 25 or later.',
          info_allow: 'Click the "Allow" button above to enable your microphone.'
        },
        linebreak: function(s) {
          return s.replace(two_line, "<p></p>").replace(one_line, "<br>");
        },
        capitalize: function(s) {
          return s.replace(first_char, function(m) {
            return m.toUpperCase();
          });
        }
      };
    }
  ]);

  _app.directive('jsSpeech', [
    'jsSpeechFactory', function(jsSpeechFactory) {
      return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        require: '^ngModel',
        scope: {
          ngModel: '='
        },
        templateUrl: "/modules/core/views/speechinput.tmpl.html",
        link: function(scope, element, attrs, ngModel) {
          var $scope, init, onresult, onstart, recognition, recognizing, reset, safeApply, setIcon, setMsg, upgrade;
          $scope = scope;
          recognizing = false;
          recognition = null;
          $scope.speech = {
            msg: jsSpeechFactory.messages.info_setup,
            icon: jsSpeechFactory.icons.start,
            recognizing: false
          };
          scope.$watch('ngModel', function(newVal, oldVal) {
            return console.log(newVal);
          }, true);
          safeApply = function(fn) {
            var phase;
            phase = scope.$root.$$phase;
            if (phase === "$apply" || phase === "$digest") {
              if (fn && (typeof fn === "function")) {
                return fn();
              }
            } else {
              return scope.$apply(fn);
            }
          };
          setMsg = function(msg) {
            return safeApply(function() {
              return $scope.speech.msg = jsSpeechFactory.messages[msg];
            });
          };
          setIcon = function(icon) {
            return safeApply(function() {
              return $scope.speech.icon = jsSpeechFactory.icons[icon];
            });
          };
          init = function() {
            reset();
            if ('webkitSpeechRecognition' in window) {
              recognition = new webkitSpeechRecognition();
              recognition.continuous = true;
              recognition.interimResults = true;
              recognition.onerror = onerror;
              recognition.onend = reset;
              recognition.onresult = onresult;
              return recognition.onstart = onstart;
            } else {
              recognition = {};
              return upgrade();
            }
          };
          upgrade = function() {
            setMsg('info_upgrade');
            return setIcon('blocked');
          };
          onstart = function(event) {
            var onerror;
            $scope.ngModel.recognizing = true;
            setIcon('recording');
            setMsg('info_speak_now');
            console.log('onstart', event);
            return onerror = function(event, message) {
              console.log('onerror', event, message);
              $scope.ngModel.recognizing = false;
              switch (event.error) {
                case "not-allowed":
                  return setMsg('info_blocked');
                case "no-speech":
                  return setMsg('info_no_speech');
                case "service-not-allowed":
                  return setMsg('info_denied');
                default:
                  return console.log(event);
              }
            };
          };
          onresult = function(event) {
            var i, result, resultIndex, trans, _results;
            setIcon('recording');
            setMsg('info_speak_now');
            resultIndex = event.resultIndex;
            trans = '';
            i = resultIndex;
            _results = [];
            while (i < event.results.length) {
              result = event.results[i][0];
              trans = jsSpeechFactory.capitalize(result.transcript);
              safeApply(function() {
                $scope.ngModel.interimResults = trans;
                $scope.ngModel.value = trans;
                return $scope.ngModel.recognizing = true;
              });
              if (event.results[i].isFinal) {
                safeApply(function() {
                  $scope.ngModel.value = trans;
                  return $scope.ngModel.recognizing = false;
                });
              }
              _results.push(++i);
            }
            return _results;
          };
          reset = function(event) {
            console.log('reset', event);
            $scope.ngModel.recognizing = false;
            setIcon('start');
            setMsg('info_setup');
            return $scope.abort = function() {
              return $scope.toggleStartStop();
            };
          };
          $scope.toggleStartStop = function() {
            if ($scope.ngModel.recognizing) {
              recognition.stop();
              return reset();
            } else {
              recognition.start();
              $scope.ngModel.recognizing = true;
              return setIcon('blocked');
            }
          };
          return init();
        }
      };
    }
  ]);

}).call(this);

'use strict';

angular
    .module('core')
    .config(['$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

                        $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'modules/core/views/home.html',
                    controller: 'HomeController'
                });
        }
    ]);

'use strict';

angular
    .module('core')
    .controller('HomeController', ['$scope', 'jsSpeechFactory',
        function($scope, jsSpeechFactory) {
            $scope.myModel = {};
        }
    ]);
