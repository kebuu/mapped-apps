//OAuth.initialize('WYdOxw8gZZzIHtgIYKMMtqv_ujc');

var module = angular.module('app', []);

module.controller('mainCtrl', function($scope, $http) {

    $scope.loggedUserInfo = null;

    var buildUrl = function(tpConfig, answer) {
        return url = '/tp' + tpConfig.id + '/' + answer + '?user=' + $scope.loggedUserInfo.name + '&userAvatarUrl=' + $scope.loggedUserInfo.picture;
    };
    
    $scope.tpConfigs = [{
        id: 1,
        objectives : '...',
        inputType : 'text',
        reward : 'bienJoueBonhomme.jpg',
        rewarded : false
    },{
        id: 2,
        objectives : '...',
        inputType : 'text',
        reward : 'mathLeblan.gif',
        rewarded : false
    },{
        id: 3,
        objectives : '...',
        inputType : 'text',
        reward : 'bienJoueMaBiche.jpg',
        rewarded : false
    },{
        id: 4,
        objectives : '...',
        inputType : 'file',
        reward : 'bienJoueM&ms.jpg',
        rewarded : false
    }];

    $scope.answerStep = function(tpConfig, answer, user) {
        var usedAnswer = answer;
        
        if(tp === 4) {
            var file = document.getElementById('tp4Answer').files[0];
            if(file) {
                var reader = new FileReader();
        
                reader.onload = function(readerEvt) {
                    var binaryString = readerEvt.target.result;
                    usedAnswer = btoa(binaryString);
                };
        
                reader.readAsBinaryString(file);
            }
        }
        
        $http.get(buildUrl(tpConfig, usedAnswer))
        .success(function() {
            console.log('success');
            tpConfig.rewarded = true;
        })
        .error(function() {
            console.log('error');
        });
    };

//    OAuth.popup('google', {cache: true}).done(function(result) {
//        console.log('google connexion ok', result);
//        result.get('https://www.googleapis.com/oauth2/v2/userinfo').done(function(data) {
//            console.log('loggedUserInfo ok', data);
//             $scope.loggedUserInfo = data;
//        })
//    });    
});