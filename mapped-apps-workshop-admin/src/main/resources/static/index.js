OAuth.initialize('WYdOxw8gZZzIHtgIYKMMtqv_ujc');

var module = angular.module('app', []);

module.controller('mainCtrl', function($scope, $http) {

    $scope.loggedUserInfo = null;

    var buildUrl = function(tp, answer, user) {
        return url = '/tp' + tp + '/' + answer + '?user=' + $scope.loggedUserInfo.name + '&userAvatarUrl=' + $scope.picture;
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
            //http://jsfiddle.net/eliseosoto/JHQnk/
        }
        
        $http.get(buildUrl(tp, answer, user))
        .success(function() {
            console.log('success');
        })
        .error(function() {
            console.log('error');
        });
    };

    OAuth.popup('google', {cache: true}).done(function(result) {
        console.log('google connexion ok', result);
        result.get('https://www.googleapis.com/oauth2/v2/userinfo').done(function(data) {
            console.log('loggedUserInfo ok', data);
             $scope.loggedUserInfo = data;
        })
    });
});