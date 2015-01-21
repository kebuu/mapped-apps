var module = angular.module('app', []);

module.controller('mainCtrl', function($scope) {

    $scope.rewards = {
        tp1: {
            name:'tp1Reward',
            url:'bienJoueBonhomme.jpg'
        },
        tp2: {
            name:'tp2Reward',
            url:'mathLeblan.gif'
        },
        tp3: {
            name:'tp3Reward',
            url:'bienJoueMaBiche.jpg'
        },
        tp4: {
            name:'tp4Reward',
            url:'bienJoueM&ms.jpg'
        },
    };
    $scope.events = [];

    var stompClient = null;
    var webSocketConnect = function connect() {
        var socket = new SockJS('/stepEvent');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function(frame) {
        
            stompClient.subscribe('/topic/stepEvent', function(message){
                $scope.$apply(function() {
                    var data = JSON.parse(message.body);
                    $scope.events.splice(0, 0, data);
                });
            });
        });
    };

    webSocketConnect();
});