'use strict'

var token_local = "test";
var checkTokenExit = localStorage.getItem('diam');
var domain = localStorage.getItem('dabr')

if (checkTokenExit !== null) {
  var tokenjson = JSON.parse(checkTokenExit);
  console.log(tokenjson.tokenExpireTime)
  console.log(tokenjson)
  console.log(domain)

  if (domain !== null) {
    if (Date.parse(tokenjson.tokenExpireTime) < Date.now()) {
      console.log('token time is Unvalid');
      if (Date.parse(tokenjson.refreshTokenExpireTime) > Date.now()) {
        $.ajax({
          url: domain + "/api/Token/refresh",
          type: "POST",
          data: {
            tokenjson
          },
          success: function (response) {
            if (response.isSuccess === true) {
              localStorage.removeItem('diam')
              localStorage.setItem('diam', JSON.stringify(response.data))
              token_local = response.data.token
            }
          },
          error: function (error) {
            console.log(error);
          }
        });
      }
    }
    token_local = tokenjson.token;
  }
}

console.log(token_local)
