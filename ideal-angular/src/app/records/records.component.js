var app = angular.module('myApp',[]);

app.controller('myCtrl', function($scope){

  $scope.newContacts = {};
  $scope.saved = localStorage.getItem('contacts');
  $scope.contacts = (localStorage.getItem('contacts') !== null) ? JSON.parse($scope.saved) : [
  {fname: "Sagar", lname: "Patadia", carYear: "2019", carMake: "Mercedes", carModel: "C300", telephone: "0123456789", email: "sagar@idealcars.com"}
  ];

  localStorage.setItem('contacts', JSON.stringify($scope.contacts));

  $scope.saveContact = function(){

    $scope.contacts.push($scope.newContacts);
    localStorage.setItem('contacts', JSON.stringify($scope.contacts));
    $scope.newContacts = {};

  }
});
