var module = angular.module('app', []);

module.controller('mainCtrl', function($scope, $http) {

    $scope.loggedUserInfo = null;

    var buildUrl = function(tpConfig, answer) {
        return url = '/response/tp' + tpConfig.id + '?answer=' + answer + '&user=' + $scope.loggedUserInfo.name + '&userAvatarUrl=' + $scope.loggedUserInfo.picture;
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

    $scope.answerStep = function(tpConfig) {
        tpConfig.failed = false;
        var usedAnswer = tpConfig.answer ? tpConfig.answer : '';
        
        if(tpConfig.id === 4 && tpConfig.answer) {
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
        .success(function(data) {
            console.log('success');
            tpConfig.rewarded = true;
            tpConfig.bonus = data;
        })
        .error(function() {
            console.log('error');
            tpConfig.failed = true;
        });
    };

    $scope.fakeUserConnection = function(tpConfig) {
        $scope.loggedUserInfo = {
            family_name: "Tardella",
            gender: "male",
            given_name: "Christophe",
            id: "116277890430412064611",
            link: "https://plus.google.com/116277890430412064611",
            locale: "en",
            name: "Christophe Tardella",
            picture: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
        };
    }

//    OAuth.initialize('WYdOxw8gZZzIHtgIYKMMtqv_ujc');
//    OAuth.popup('google', {cache: true}).done(function(result) {
//        console.log('google connexion ok', result);
//        result.get('https://www.googleapis.com/oauth2/v2/userinfo').done(function(data) {
//            $scope.$apply(function() {
//                console.log('loggedUserInfo ok', data);
//                $scope.loggedUserInfo = data;
//            });
//        })
//    });
});