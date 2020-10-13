//Questions
//https://interview.switchme.in/js/2019/build_javascript_question.html

var pro,build,pric,cit,length;
var app = angular.module('app', []);
app.controller('filter', function($scope, $http) {
  $scope.builder,$scope.price,$scope.city,$scope.project;
  $http.get("https://interview.switchme.in/js/2019/city_json.php").then(function (response) {
      $scope.city = response.data;
      cit=response.data;
      console.log("fff",Object.keys(cit).length);
      console.log($scope.city);
  });
  $http.get("https://interview.switchme.in/js/2019/builder_json.php").then(function (response) {
      $scope.builder = response.data;
      build =response.data;
      console.log($scope.builder);
  });
  $http.get("https://interview.switchme.in/js/2019/price_json.php").then(function (response) {
      $scope.price = response.data;
      $scope.p=response.data
      pric=response.data;
      console.log($scope.price);
  });
  $http.get("https://interview.switchme.in/js/2019/project_json.php").then(function (response) {
      //$scope.project = response.data;
      pro = response.data;
      length = Object.keys(pro).length;
      console.log(length);
      var i=0,j,k=0;
      $scope.project = [];
      while(i<=length){
        if(i!=4){
          for(var j=0;j<pro[i+1].length;j++){
           // pro[i+1][j]['builder'] = builder[i+1]
            
            $scope.project[k]=pro[i+1][j];
            k++;
          }
        }
        i++;
      }
      console.log(pro);
      fun();
  });
var city_id=0;
  $scope.citychange=function(index){
    console.log(index);
    for(var i=1;i<=Object.keys(cit).length;i++){
      if(cit[i]==index){
        index = i;
        city_id=i;
      }
    }
    $scope.project=[];
    $scope.price=[];
    $scope.p={};
    $scope.builder={};
     var i=0,j,k=0,l=0,count=0,b=[];
      while(i<=length){
        if(i!=4){
          for(var j=0;j<pro[i+1].length;j++){
            //console.log("jhjhj",pro[i+1][j].city,index);
           if(pro[i+1][j].city == index){
             $scope.project[k] = pro[i+1][j];
             $scope.price[$scope.project[k].project_id]=pric[$scope.project[k].project_id];
             $scope.p[l] = pric[$scope.project[k].project_id];
             if(b.indexOf(build[i+1])==-1){
               b[count]=build[i+1];
               count++;
             }
             l++;
             
             k++;
           }
          }
        }
        i++;
      }
      i=0;
        for(var n=0;n<b.length;n++){
          $scope.builder[i]=b[n];
          i++;
        }
      console.log("2",b)
      console.log("1",$scope.project);
  };
var b_id=0,b_aid=0;
  $scope.builderchange=function(index,state){
    console.log(state,index)
    $scope.project=[],$scope.p={};
    var l=0;
    if(state == true){
      console.log("uuu",index);
      for(var i=1;i<=Object.keys(build).length;i++){
      if(build[i]==index){
        index = i;
        b_id=i;
        console.log("indexi",index,city_id)
      }
    }
    if(city_id==0){
      for(var i=0;i<pro[index].length;i++){
        $scope.project[b_aid]=pro[index][i];
        $scope.p[l] = pric[$scope.project[b_aid].project_id];
        l++;
        b_aid++;
      }
    }
    else {
      for(var i=0;i<pro[index].length;i++){
        
        if(pro[index][i].city == city_id){
          $scope.project[b_aid] = pro[index][i];
          $scope.p[l] = pric[$scope.project[b_aid].project_id];
        l++;
          b_aid++;
        }
      }
    }
    }
    else{
      $scope.isCheck = false;
    }
    }
    $scope.allCheck=function(index){
    if($scope.isCheck == true){
      $scope.isChecked = true;
    }
    else {
      $scope.isChecked = false;
    }
  }
  $scope.pricechange=function(Price,PisChecked){
      var j=0,k=0;
      var pro=[];
      pro =$scope.project;
      var le=pro.length
      console.log("pro",pro,le);
      console.log("prive",Price);
      if(PisChecked == true){
        $scope.project=[];
        j=0;
        for(var i=0;i<le;i++){
          for(var m=0;m<Object.keys(pric).length;m++){
            if(pro[i].project_id == m && pric[m] == Price){
              console.log("if",pro[i].project_id,m,pric[m],Price);
              $scope.project[j]=pro[i];
              j++;
            }
          }
        }
      }
    }
    $scope.filterchange=function(fil){
      console.log("filter",fil);
      var pro = $scope.project;
      $scope.project=[];
      // var j;
      var ass = $scope.quickSort(pro,0,pro.length-1,fil);
      if(fil == 'all'){
        $scope.project = pro;
      }
      else if(fil == 'lh'){
        $scope.project=ass
      }
      else{
        for(var i=0,j=ass.length-1;i<ass.length,j>=0;i++,j--){
         
            console.log("jj",j,i)
            $scope.project[j]=ass[i];
          
        }
      }
    }
    $scope.quickSort=function(items, left, right,fil) {
    var index;
    
      if (items.length > 1) {
        index = $scope.partition(items, left, right); 
        if (left < index - 1) { 
            $scope.quickSort(items, left, index - 1);
        }
        if (index < right) { 
            $scope.quickSort(items, index, right);
        }
    }
    return items;
}
      $scope.swap=function (items, leftIndex, rightIndex){
          var temp = items[leftIndex];
          items[leftIndex] = items[rightIndex];
          items[rightIndex] = temp;
      }
      $scope.partition=function (items, left, right) {
    var pivot   = pric[items[Math.floor((right + left) / 2)].project_id], 
        i       = left, 
        j       = right; 
    while (i <= j) {
        while (pric[items[i].project_id] < pivot) {
            i++;
        }
        while (pric[items[j].project_id] > pivot) {
            j--;
        }
        if (i <= j) {
            $scope.swap(items, i, j); 
            i++;
            j--;
        }
    }
    return i;
}


});
