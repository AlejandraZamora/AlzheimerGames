'use strict';

angular.module('myApp.MathematicalCalculation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/MathematicalCalculation', {
    templateUrl: 'MathematicalCalculation/MathematicalCalculation.html',
    controller: 'MathematicalCalculationCtrl'
  });
}])

.controller('MathematicalCalculationCtrl', ['$rootScope', '$scope', 'newGame', 'persona','personas','$http','$resource', '$location', function ($rootScope, $scope, newGame, persona, personas, $http, $resource, $location) {
    $scope.level=1;
    $scope.firstNumber="1";
    $scope.lastNumber="9";
    $scope.ans1="";
    $scope.ans2="";
    $scope.ans3="";
    $scope.oper1="";
    $scope.oper2="";
    $scope.realAns="";
    $scope.ansPos="";
    $scope.buttonClicked="";
    $scope.cont=0;
    $scope.exitView=false;
    $scope.maxLevel=1;
    $scope.questions=0;
    $scope.success=0;
    $scope.date=new Date();

    startLevel();

    function startLevel(){
        $scope.questions++;
        var opts=loadAns($scope.level-1, $scope.firstNumber, $scope.lastNumber);
        $scope.oper1=randomIntFromInterval(parseInt(concatTimes($scope.firstNumber, "0", $scope.level-1)),parseInt(concatTimes($scope.lastNumber, "9", $scope.level-1)));
        $scope.oper2=randomIntFromInterval($scope.oper1,parseInt(concatTimes($scope.lastNumber, "9", $scope.level-1)));
        $scope.realAns=parseInt($scope.oper1)+parseInt($scope.oper2);
        $scope.ansPos=randomIntFromInterval(1, 3);
        opts[$scope.ansPos-1]=$scope.realAns;
        $scope.ans1=opts[0];
        $scope.ans2=opts[1];
        $scope.ans3=opts[2];
    }

    function verifyAns(){
        if($scope.ansPos==$scope.buttonClicked){
            $scope.success++;
            alert("Bien");
            $scope.cont++;
            if($scope.cont>10){
                $scope.cont=0;
                $scope.level++;
                if($scope.level>$scope.maxLevel){$scope.maxLevel=$scope.level;}
                startLevel();
            }else{
                startLevel();
            }
        }else{
            alert("Mal");
            if($scope.level==1){
                startLevel();
            }else{
                $scope.cont=0;
                $scope.level--;
                startLevel();
            }
        }
    }

    $scope.clickedButton1=function(){
        $scope.buttonClicked=1;
        verifyAns();
    }

    $scope.clickedButton2=function(){
        $scope.buttonClicked=2;
        verifyAns();
    }

    $scope.clickedButton3=function(){
        $scope.buttonClicked=3;
        verifyAns();
    }

    $scope.endGame=function(){
        $scope.exitView=true;
    }

    $scope.endGame2=function(){
        var endTime = new Date();
        var diff = endTime.getTime() - $scope.date.getTime();
        var time = parseInt(diff / 1000);
        $scope.gameResult={"nombreJuego":"CalculosMatematicos","tiempoSegundos":time,"numeroPreguntasIntentos":$scope.questions,"numeroPreguntasAciertos":$scope.success,"nivelMaximoAlcanzado":$scope.maxLevel,"date":$scope.date};
        persona.get({personaId:""+$rootScope.idPersona})
            .$promise.then(
                    //success
                    function( value ){
                        $scope.personaT=value;
                        $scope.personaT.avancesJuegos.push($scope.gameResult);
                        personas.save($scope.personaT)
                        .$promise.then(
                            //success
                            function(value){
                                console.log("Patient update"+ $scope.personaT.avancesJuegos);
                                $location.path("MainPage");
                            },
                            //error
                            function( error ){
                                console.log("El persona no se pudo actualizar");
                            }

                        );
                    },
                    //error
                    function( error ){
                        alert("El Identificador no se encuentra registrado");
                    }
            );
    }

    $scope.continueGame=function(){
        $scope.exitView=false;
    }

    function loadAns(actualLevel, actFirstNumber, actLastNumber){
        var ans=[];
        for(var i=0; i<3; i++){
            ans.push(randomIntFromInterval(parseInt(concatTimes(actFirstNumber, "0", actualLevel)),parseInt(concatTimes(actLastNumber, "9", actualLevel))))
        }
        return ans;
    };

    function concatTimes(str1, str2, times){
        var txt1 = str1;
        for (var i = 0; i < times; i++) {
            txt1 += str2
        }
        return txt1;
    }

    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}]);
