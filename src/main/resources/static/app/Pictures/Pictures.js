'use strict';

angular.module('myApp.Pictures', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Pictures', {
    templateUrl: 'Pictures/Pictures.html',
    controller: 'PicturesCtrl'
  });
}])

.controller('PicturesCtrl', ['$rootScope', '$scope', 'newGame', 'persona','personas','$http','$resource', '$location', function ($rootScope, $scope, newGame, persona, personas, $http, $resource, $location) {

    $scope.ans1="";
    $scope.ans2="";
    $scope.ans3="";
    $scope.realAns="";
    $scope.buttonClicked="";
    $scope.exitView=false;
    $scope.questions=0;
    $scope.success=0;
    $scope.date=new Date();
    $scope.len=0;
    var liness;
    $rootScope.lines=[];
    readFileNames(typeOfFile());


    function startLevel(){
        $scope.questions++;
        $scope.realAnsRand=randomIntFromInterval(1,$rootScope.lines.length);
        $scope.imageSrc="/app/Images/"+typeOfFile()+"/"+$scope.realAnsRand+".jpg";
        $scope.opts=[];
        $scope.ansPos=randomIntFromInterval(1, 3);
        $scope.contWhile=0;
        while($scope.contWhile<3){
            var n=randomIntFromInterval(1,$rootScope.lines.length);
            if(n!=$scope.realAnsRand){
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
        $scope.realAns=$rootScope.lines[$scope.realAnsRand];
        $scope.opts[$scope.ansPos-1]=$scope.realAnsRand;
        $scope.ans1=$rootScope.lines[$scope.opts[0]-1];
        $scope.ans2=$rootScope.lines[$scope.opts[1]-1];
        $scope.ans3=$rootScope.lines[$scope.opts[2]-1];
    }

    function typeOfFile(){
        var tans="";
        if($rootScope.age>0 && $rootScope.age<13){
            tans="Child";
        }else if ($rootScope.age>=13 && $rootScope.age<35){
            tans="Young";
        }else if($rootScope.age>=35){
            tans="Adult";
        }return tans;
    }

    function readFileNames(fileType){
        $http.get('/app/Pictures/data/'+fileType+'/names.txt').success(function (data) {
            var fileToRead=data;
            liness = data.split('\n');
            for(var line = 0; line < liness.length; line++){
              $rootScope.lines.push(liness[line]);
            }
            startLevel();
        });
    }

    function verifyAns(){
        var ic= document.getElementById("incorrect");
        var c= document.getElementById("correct");
        if($scope.ansPos==$scope.buttonClicked){
            $scope.success++;
            c.play();
            alert("Bien!!!");
            startLevel();
        }else{
            ic.play();
            alert("Mal!!!");
            startLevel();
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
        $scope.gameResult={"nombreJuego":"Quien Es","tiempoSegundos":time,"numeroPreguntasIntentos":$scope.questions,"numeroPreguntasAciertos":$scope.success,"nivelMaximoAlcanzado":$scope.success, "date":$scope.date};
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

    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}]);
