
  angular.module('core').directive('jsSpeech', [
    'jsSpeechFactory',
      function (jsSpeechFactory) {
          return {
              restrict: 'AE',
              replace: true,
              transclude: true,
              require: '^ngModel',
              scope: {
                  ngModel: '='
              },
              templateUrl: "/modules/core/views/speechinput.tmpl.html",
              link: function (scope, element, attrs, ngModel) {
                  var $scope, init, onresult, onstart, recognition, recognizing, reset, safeApply, setIcon, setMsg, upgrade;
                  $scope = scope;
                  recognizing = false;
                  recognition = null;
                  $scope.speech = {
                      msg: jsSpeechFactory.messages.info_setup,
                      icon: jsSpeechFactory.icons.start,
                      recognizing: false
                  };
                  scope.$watch('ngModel', function (newVal, oldVal) {
                      return console.log(newVal);
                  }, true);
                  safeApply = function (fn) {
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
                  setMsg = function (msg) {
                      return safeApply(function () {
                          return $scope.speech.msg = jsSpeechFactory.messages[msg];
                      });
                  };
                  setIcon = function (icon) {
                      return safeApply(function () {
                          return $scope.speech.icon = jsSpeechFactory.icons[icon];
                      });
                  };
                  init = function () {
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
                  upgrade = function () {
                      setMsg('info_upgrade');
                      return setIcon('blocked');
                  };
                  onstart = function (event) {
                      var onerror;
                      $scope.ngModel.recognizing = true;
                      setIcon('recording');
                      setMsg('info_speak_now');
                      console.log('onstart', event);
                      return onerror = function (event, message) {
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
                  onresult = function (event) {
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
                          safeApply(function () {
                              $scope.ngModel.interimResults = trans;
                              $scope.ngModel.value = trans;
                              return $scope.ngModel.recognizing = true;
                          });
                          if (event.results[i].isFinal) {
                              safeApply(function () {
                                  $scope.ngModel.value = trans;
                                  return $scope.ngModel.recognizing = false;
                              });
                          }
                          _results.push(++i);
                      }
                      return _results;
                  };
                  reset = function (event) {
                      console.log('reset', event);
                      $scope.ngModel.recognizing = false;
                      setIcon('start');
                      setMsg('info_setup');
                      return $scope.abort = function () {
                          return $scope.toggleStartStop();
                      };
                  };
                  $scope.toggleStartStop = function () {
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