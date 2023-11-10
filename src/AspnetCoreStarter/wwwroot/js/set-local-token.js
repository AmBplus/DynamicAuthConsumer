'use strict'

var token_local = "test";
var checkTokenExit = localStorage.getItem('diam');
var domain = localStorage.getItem('dabr')

if (checkTokenExit !== null) {
  var tokenjson = JSON.parse(checkTokenExit);
  
  console.log(tokenjson)  
  console.log(domain)
  var nowDate = new Date().getTime();
  if (domain !== null) {
    var tokenExpireDate = convertToDate(tokenjson.tokenExpireTime);
    console.log(tokenExpireDate)
    console.log(nowDate)
    if (tokenExpireDate < nowDate) {
      console.log('token time is Unvalid');
      console.log(tokenjson.refreshTokenExpireTime)
      var refreshTokenExpireTime = convertToDate(tokenjson.refreshTokenExpireTime);
      if (refreshTokenExpireTime > nowDate) {
        console.log("Start Get New Refresh Token")
        let url = domain + "/api/token/refresh";
        let data = {
          token: tokenjson.token,
          refreshToken: tokenjson.refreshToken
        };
        console.log(data)
        fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            if (data.isSuccess === true) {
              localStorage.removeItem('diam');
              localStorage.setItem('diam', JSON.stringify(data.data));
              console.log(data.data)
              token_local = data.data.token;
            }
          })
          .catch(error => console.log(error));

      }
      else {
        console.log('refresh token is expired')
      }
    }
    else {
      console.log("Token Is Not Expired")
    }
    token_local = tokenjson.token;
  }
}
function convertToDate(dateString) {
  console.log(dateString)
  var dateParts = dateString.split("/");
  var timeParts = dateParts[2].split(" ")[1].split(":");
  var year = parseInt(dateParts[2].split(" ")[0]);
  var month = parseInt(dateParts[0]) - 1;
  var day = parseInt(dateParts[1]);
  var hours = parseInt(timeParts[0]);
  var minutes = parseInt(timeParts[1]);
  var seconds = parseInt(timeParts[2]);

  var utcDate = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
  return utcDate.getTime();
}


