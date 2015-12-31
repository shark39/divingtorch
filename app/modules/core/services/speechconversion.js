/*global angular, console*/
/*jslint plusplus: true */
/**
 * @ngdoc service
 * @name core.Services.Speechconversion
 * @description Speechconversion Factory
 */
angular
    .module('core')
    .factory('Speechconversion', ['Sharkled',
        function (Sharkled) {
            'use strict';
            var stage_options = {
                    'start': ["new effect"],
                    'effecttype': ["rainbow", "chase", "color"],
                    'parameter': ["color"],
                    'areas': []
                },
                stages;
                
            Sharkled.getAreas(function (data) {
                stage_options.areas = data.areas;
                stages = Object.keys(stage_options);
            });
            
            return {

                /**
                 * @ngdoc function
                 * @name core.Services.Speechconversion#parse
                 * @methodOf core.Services.Speechconversion
                 * @return {object} Returns a boolean value
                 */
                parse: function (input) {
                    var stages_checked = {}, //contains all stages that are filled with valid input key value of stage name and value
                        i,
                        j,
                        options;
                    for (i = 0; i < stages.length; i++) {
                        options = stage_options[stages[i]];
                        for (j = 0; j < options.length; j++) {
                            if (input.indexOf(options[j]) > -1) {
                                if (stages_checked.hasOwnProperty(stages[i])) {
                                    //stages_checked[stages[i]].push(options[j]);
                                    console.log("dublicate", options[j]);
                                }
                                stages_checked[stages[i]] = options[j];
                            }
                        }
                    }
                    return stages_checked;
                },

                /**
                 * @ngdoc function
                 * @name core.Services.Speechconversion#method2
                 * @methodOf core.Services.Speechconversion
                 * @return {object} Returns a boolean value
                 */
                convert: function () {
                    return true;
                }
            };
        }]);