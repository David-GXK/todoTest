var myStorage=localStorage;
var util = {
    uuid: function () {                                           //var util={uuid:function(){}}
        var i, random;
        var uuid = '';
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    }
};
angular.module('todoApps',[])
    .controller('angCon',function todoCon($scope,$filter){
        var Info=$scope.Info=JSON.parse(myStorage.getItem("ti"))||[];
        $scope.upInfo=null;
        $scope.hidType=JSON.parse(myStorage.getItem("hidType"));
        $scope.flag=myStorage.getItem("flagType")||"a";
        $scope.checkType =JSON.parse(myStorage.getItem("Type"))||false;
        $scope.$watch('Info',function(nVal,oVal){
            if(nVal!==oVal){//���ݸ���
                var jsonText = JSON.stringify(Info);
                myStorage.setItem("ti",jsonText);
            };
            $scope.num=$filter('filter')(Info,{completedType:false}).length;
            $scope.deNum= $scope.Info.length-$scope.num;
            if($scope.deNum!==0){
                $scope.myhid=true;
            }else{
                $scope.myhid=false;
            }
        },true);
        $scope.addInfo=function(){
            var newTodo=$scope.newTodo.trim();
            if(!newTodo.length){
                return;
            }
            Info.unshift({
                title:newTodo,
                uid:util.uuid(),
                completedType:false
            });
            $scope.newTodo="";

        },
        $scope.delInfo=function(info){
            Info.splice(Info.indexOf(info),1);
        },
        $scope.updateInfo=function(info){
            $scope.upInfo=info;
            $scope.rollbackInfo=angular.extend({},info);
        },
        $scope.eateInfo=function(info){
            $scope.upInfo=null;
            info.title = info.title.trim();
            if (!info.title) {
                // ����todo��titleΪ�գ����Ƴ���todo
                $scope.delInfo(info);
            }
        },
        $scope.revertEdits=function(info,ele){
            if(ele.keyCode===27){
                Info[Info.indexOf(info)] = $scope.rollbackInfo;
                $scope.upInfo=null;
            }
        },
        $scope.allCheck=function(){
            console.log($scope.checkType);
           Info.forEach(function(info){

               info.completedType=$scope.checkType;
           });
            myStorage.setItem("Type",$scope.checkType);
        },
        $scope.all=function(){
            $scope.flag="a";
            $scope.hidType=null;
            myStorage.setItem("flagType",$scope.flag);
            myStorage.setItem("hidType",$scope.hidType);
        },
        $scope.active=function(){
            $scope.flag="b";
            $scope.hidType=true;
            myStorage.setItem("flagType",$scope.flag);
            myStorage.setItem("hidType",$scope.hidType);
        },
        $scope.comple=function(){
            $scope.flag="c";
            $scope.hidType=false;
            console.log("dsdasa---------"+$scope.hidType);
            myStorage.setItem("flagType",$scope.flag);
            myStorage.setItem("hidType",$scope.hidType);
        },
        $scope.clearAll=function(){
            for(var i=Info.length-1;i>-1;i--){
                if(Info[i].completedType){
                    Info.splice(i,1);
                }
            }
        }
    });

