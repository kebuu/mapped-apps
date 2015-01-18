OAuth.initialize('WYdOxw8gZZzIHtgIYKMMtqv_ujc');
OAuth.popup('google').done(function(result) {
    console.log('google connexion ok', result);
    // do some stuff with result
    result.get('https://www.googleapis.com/oauth2/v2/userinfo').done(function(data) {
        // do something with `data`, e.g. print data.name
        console.log('me ok', data);
    })

});

var module = angular.module('app', []);

module.controller('mainCtrl', function($scope, $http) {
    
    var buildUrl = function(tp, answer, user) {
        return url = '/tp' + tp + '/' + answer + '/' + user;
    };
    
    $scope.tpConfigs = [{
        id: 1,
        objectives : '...',
        inputType : 'text'
    },{
        id: 2,
        objectives : '...',
        inputType : 'text'
    },{
        id: 3,
        objectives : '...',
        inputType : 'text'
    },{
        id: 4,
        objectives : '...',
        inputType : 'file'
    }];

    $scope.answerStep = function(tp, answer, user) {
    
        if(tp === 4) {
            console.log('TP4');
        }
        
        $http.get(buildUrl(tp, answer, user))
        .success(function() {
            console.log('success');
        })
        .error(function() {
            console.log('error');
        });
    };

});