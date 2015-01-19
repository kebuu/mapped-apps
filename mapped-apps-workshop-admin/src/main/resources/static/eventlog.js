var module = angular.module('app', []);

module.controller('mainCtrl', function($scope) {

    console.log('starting fun');
    
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