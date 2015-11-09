'use strict';
$(document).ready(init);
$(window).on('beforeunload',removeUser);
var fbRef = new Firebase('https://rickydaddychat.firebaseio.com/');
var currentUser = localStorage.user ? JSON.parse(localStorage.user): '';
// console.log(currentUser);
var arrayOfUsersOnline = [];
// declare the references to the firebase child elements 
var users = fbRef.child('users');
var messages = fbRef.child('messages');

// get the jquery references to the DOM
var $sendBtn = $('#sendBtn');
var $joinBtn = $('#joinBtn');

function init(){
  readFirebaseStatusOnload();
  $sendBtn.on('click', sendMessage);
  $joinBtn.on('click', userJoins);
  if(currentUser){userJoins()};

}

function readFirebaseStatusOnload(){
  fbRef.on('value',function(snap){
    var firebaseObj = snap.val();
    populateMessageBoard(firebaseObj);
    firebaseObj=null;

  }) 
}

// fbRef.on('value',function(snap){

// })

function userJoins(){
  var $userInput = $('#userText').val();
  if(!currentUser){
    localStorage.user = JSON.stringify($userInput);
    currentUser = $userInput
  };
  if (currentUser){
    $joinBtn.hide();
    $sendBtn.show();
    users.push(currentUser); 
  }
  $('#userText').val('');
}

function sendMessage(){
  var $userInput = $('#userText').val();
  if ($userInput){
    messages.push({name: currentUser, message:$userInput})
  }
}

function populateMessageBoard(boardObj){
  if(boardObj && boardObj.messages){
    $('.messageBlock').empty();
    $('.usersBlock').empty();
    for (let keys in boardObj.messages){
      var boxColor = boardObj.messages[keys].name === currentUser ? 'messBox1' : 'messBox2'; 

      $('.messageBlock').append('<div class="'+boxColor+'"><h5>'+boardObj.messages[keys].name +
      '</h5>' + boardObj.messages[keys].message +'</div>')
      console.log(boardObj.messages[keys]);
      console.log(boardObj.messages[keys]);
    }
    for (let keys in boardObj.users){
      $('.usersBlock').prepend('<li>'+ boardObj.users[keys]+'</li>')
      arrayOfUsersOnline.push(boardObj.users[keys]);
    } 

  }
  boardObj = null;
  console.log(boardObj);
}

function removeUser(){
  users.once('value', function(snapshot){
    let users = snapshot.val();
    for(var key in users){
      console.log(key)
      if(users[key] === name){
        usersRef.child(key).remove();
      }
    }
  })

}




