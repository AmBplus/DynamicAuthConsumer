// Check if set
var SetKeyDomain = 'dabr'
if (!localStorage.getItem(SetKeyDomain)) {

  // Set initial value
  localStorage.setItem(SetKeyDomain, 'https://localhost:5001');

}

