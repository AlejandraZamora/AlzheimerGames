'use strict';

angular.module('myApp.MathematicalCalculation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/MathematicalCalculation', {
    templateUrl: 'MathematicalCalculation/MathematicalCalculation.html',
    controller: 'MathematicalCalculationCtrl'
  });
}])

.controller('MathematicalCalculationCtrl', ['$rootScope', '$timeout','$scope', 'newGame', 'persona','personas','$http','$resource', '$location', function ($rootScope, $timeout, $scope, newGame, persona, personas, $http, $resource, $location) {
    $scope.level=1;
    $scope.firstNumber="1";
    $scope.lastNumber="9";
    $scope.ans1="";
    $scope.ans2="";
    $scope.ans3="";
    $scope.oper1="";
    $scope.operations=["+","-","x","÷"];
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
        $scope.opts=[];
        $scope.oper1=randomIntFromInterval(parseInt(concatTimes($scope.firstNumber, "0", $scope.level-1)),parseInt(concatTimes($scope.lastNumber, "9", $scope.level-1)));
        $scope.oper2=randomIntFromInterval($scope.oper1,parseInt(concatTimes($scope.lastNumber, "9", $scope.level-1)));
        $scope.operation=$scope.operations[Math.floor(Math.random() * $scope.operations.length)];
        $scope.realAns=operate();
        $scope.ansPos=randomIntFromInterval(1, 3);
        $scope.contWhile=0;
        while($scope.contWhile<3){
            var n=randomIntFromInterval(parseInt(concatTimes($scope.firstNumber, "0", $scope.level-1)),parseInt(concatTimes($scope.lastNumber, "9", $scope.level-1)));
            if(n!=$scope.realAns){
                if($scope.contWhile==0){
                    $scope.opts.push(n);
                    $scope.contWhile++;
                }else if($scope.contWhile==1 && n!=$scope.opts[$scope.contWhile-1]){
                    $scope.opts.push(n);
                    $scope.contWhile++;
                }else if($scope.contWhile==2 && n!=$scope.opts[$scope.contWhile-1] && n!=$scope.opts[$scope.contWhile-2]){
                    $scope.opts.push(n);
                    $scope.contWhile++;
                }
            }
        }
        $scope.opts[$scope.ansPos-1]=$scope.realAns;
        $scope.ans1=$scope.opts[0];
        $scope.ans2=$scope.opts[1];
        $scope.ans3=$scope.opts[2];
    }

    function operate(){
        if($scope.oper1<$scope.oper2){
            var tmp=$scope.oper1;
            $scope.oper1=$scope.oper2;
            $scope.oper2=tmp;
        }
        var answ=0;
        if($scope.operation=="+"){
            answ=parseInt($scope.oper1)+parseInt($scope.oper2);
        }else if ($scope.operation=="-"){
            answ=parseInt($scope.oper1)-parseInt($scope.oper2);
        }else if ($scope.operation=="x"){
            answ=parseInt($scope.oper1)*parseInt($scope.oper2);
        }else if($scope.operation=="÷"){
            answ=Math.floor(parseInt($scope.oper1)/parseInt($scope.oper2));
        }
        return answ;
    }

    function verifyAns(){
        var ic= document.getElementById("incorrect");
        var c= document.getElementById("correct");
        if($scope.ansPos==$scope.buttonClicked){
            $scope.success++;
            alert("Bien!!!")
            c.play();
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
            ic.play();
            alert("Mal!!!")
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
