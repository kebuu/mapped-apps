var module = angular.module('app', []);

module.controller('mainCtrl', function($scope, $http) {

    $scope.loggedUserInfo = null;

    var buildUrl = function(tpConfig, answer) {
        return url = '/response/tp' + tpConfig.id + '?answer=' + answer + '&user=' + $scope.loggedUserInfo.name + '&userAvatarUrl=' + $scope.loggedUserInfo.picture;
    };
    
    var sendAnswer = function(tpConfig, answer) {
        $http.get(buildUrl(tpConfig, answer))
        .success(function(data) {
            tpConfig.rewarded = true;
            tpConfig.bonus = data;
        })
        .error(function() {
            tpConfig.failed = true;
        });
    };
    
    $scope.tpConfigs = [{
        id: 0,
        reward : 'bienJoueStart.jpg',
        rewardName:'Starting block',
        rewarded : false
    }, {
        id: 1,
        objectives : 'Instancier une carte et lui ajouter des couches, des marqueurs et une flopée de contrôles',
        inputType : 'text',
        reward : 'bienJoueBonhomme.jpg',
        rewardName:'Bien joué bonhomme',
        rewarded : false
    },{
        id: 2,
        objectives : 'Développer une mini application permettant de trouver la fontaine d\'eau potable la plus proche dans lyon',
        inputType : 'text',
        reward : 'good-job.jpg',
        rewardName:'Lebowski',
        rewarded : false
    },{
        id: 3,
        objectives : 'Développer une mini application permettant de visualiser et de "gérer" les arbres régient par la ville de Lyon',
        inputType : 'text',
        reward : 'bienJoueMaBiche.jpg',
        rewardName:'Bien joué ma biche',
        rewarded : false
    },{
        id: 4,
        objectives : 'Développer un micro jeu de défence d\'avion',
        inputType : 'text',
        reward : 'jesus.jpg',
        rewardName:'Jésus',
        rewarded : false
    },{
        id: 5,
        objectives : 'Prouvez que vous avez réussi tous les TP en effectuant le calcul suivant : (TP1 * TP2 * TP3) / TP4. Indiquez le résultat arrondi à quatre chiffre après la virgule',
        inputType : 'text',
        reward : 'bienJoueM&ms.jpg',
        rewardName:'M&M\'s',
        rewarded : false
    }];

    $scope.answerStep = function(tpConfig) {
        tpConfig.failed = false;
        tpConfig.lastAnswer = tpConfig.answer;
        var usedAnswer = tpConfig.answer ? tpConfig.answer : '';
        sendAnswer(tpConfig, usedAnswer);
    };

    //$scope.fakeUserConnection = function(tpConfig) {
    //    $scope.loggedUserInfo = {
    //        family_name: "Tardella",
    //        gender: "male",
    //        given_name: "Christophe",
    //        id: "116277890430412064611",
    //        link: "https://plus.google.com/116277890430412064611",
    //        locale: "en",
    //        name: "Christophe Tardella",
    //        picture: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
    //    };
    //
    //    sendAnswer($scope.tpConfigs[0], "answer");
    //}

    OAuth.initialize('WYdOxw8gZZzIHtgIYKMMtqv_ujc');
    OAuth.popup('google', {cache: true}).done(function(result) {
        console.log('google connexion ok', result);
        result.get('https://www.googleapis.com/oauth2/v2/userinfo').done(function(data) {
            $scope.$apply(function() {
                console.log('loggedUserInfo ok', data);
                $scope.loggedUserInfo = data;
                sendAnswer($scope.tpConfigs[0], "answer");
            });
        })
    });
});