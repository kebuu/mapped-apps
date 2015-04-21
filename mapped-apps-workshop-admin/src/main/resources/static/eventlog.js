var module = angular.module('app', []);

module.controller('mainCtrl', function($scope) {

    $scope.toto = '/sound/cymbals.wav';

    $scope.rewards = {
        tp0: {
            name:'Starting block',
            url:'bienJoueStart.jpg'
        },
        tp1: {
            name:'Bien joué bonhomme',
            url:'bienJoueBonhomme.jpg'
        },
        tp2: {
            name:'Good job',
            url:'good-job.jpg'
        },
        tp3: {
            name:'Bien joué ma biche',
            url:'bienJoueMaBiche.jpg'
        },
        tp4: {
            name:'Jésus',
            url:'jesus.jpg'
        },
        tp5: {
            name:'M&M\'s',
            url:'bienJoueM&ms.jpg'
        }
    };

    $scope.events = [];

    var getSound = function(stepEvent) {
        var sound;
        
        if(!stepEvent.successful) {
            sound = 'gasp_x.wav';
        } else if(stepEvent.step === 'tp5') {
            sound = 'gong.wav';
        } else {
            sound = 'cymbals.wav';
        }
        
        return sound;
    };

    var getReward = function(stepEvent) {
        return $scope.rewards[stepEvent.step];
    };
    
    var stompClient = null;
    var webSocketConnect = function connect() {
        var socket = new SockJS('/stepEvent');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function(frame) {
        
            stompClient.subscribe('/topic/stepEvent', function(message){
                $scope.$apply(function() {
                    var data = JSON.parse(message.body);
                    data.sound = '/sound/' + getSound(data);
                    data.reward = getReward(data);
                    $scope.events.splice(0, 0, data);
                });
            });
        });
    };

    webSocketConnect();
});