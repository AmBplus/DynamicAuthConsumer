/**
 * App user list (jquery)
 */

'use strict';

$(function () {
  var domain = localStorage.getItem('dabr');
  if (domain === null) throw new Error('Domain not registered');

  if (token_local === null) throw new Error('Token not registered');
  console.log('-------------------')
  console.log(token_local)
  var dataTablePermissions = $('.datatables-permissions'),
    dt_permission;

  // Function to fetch data from API and populate the table
  function populateTable() {
    // Send token to API and get response with id and name
    // Replace the API_URL with the actual API endpoint
  
    $.ajax({
      url: domain +'/api/Permission/GetPermissionGroups',
      type: 'GET',
      headers: {
        Authorization: 'Bearer ' + token_local
      },
    
      success: function (response) {
        // Clear the table body
        dataTablePermissions.find('tbody').empty();

        // Iterate over the response data and add rows to the table
        response.data.forEach(function (item) {
          var row = $('<tr>');
          row.append('<td hidden>' + item.id + '</td>');
          row.append('<td>' + item.name + '</td>');
          row.append('<td><button id="Edit">ویرایش</button><button id="Edit">View Permissions</button></td>');
          dataTablePermissions.find('tbody').append(row);
        });
      },
      error: function (xhr, status, error) {
        // Show error message in case of access denied or forbidden
        alert('Error: ' + error);
      }
    });
  }

  // Call the populateTable function when the page is loaded
  populateTable();
});
