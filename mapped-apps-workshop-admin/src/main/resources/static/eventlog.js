var module = angular.module('app', []);

module.controller('mainCtrl', function($scope) {

    console.log('starting fun');
    
    $scope.events = [];
    
    $scope.onStepEvent = function(data) {
        console.log(data);
    };

    var stompClient = null;
    var webSocketConnect = function connect() {
        var socket = new SockJS('/stepEvent');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function(frame) {
        
            stompClient.subscribe('/topic/stepEvent', function(message){
                $scope.$apply(function() {
                    $scope.onStepEvent(JSON.parse(message.body));
                });
            });

            //$http.get('/gameStatus');
        });
    };

    webSocketConnect();
});