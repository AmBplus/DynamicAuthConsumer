/**
 *  Pages Authentication
 */

'use strict';


document.addEventListener('DOMContentLoaded', function (e) {
  (function () {
    const formAuthentication = document.querySelector('#formAuthentication');
    var domainKey = 'dabr';
    console.log('---------------------------------------------------------------')
    var apiDomain = localStorage.getItem(domainKey)
    console.log('----------------------------------------------------------------')
    console.log(apiDomain)
    // Form validation for Add new record
    if (formAuthentication) {
      // Add submit handler
      formAuthentication.addEventListener('submit', function (e) {

        e.preventDefault();

        // Validate form
        fv.validate().then(function (status) {
          if (status == 'Valid') {

            // Show loading popup
            Swal.fire({
              title: 'صبور باشید',
              allowOutsideClick: false,

            });


            // AJAX request
            fetch(`${apiDomain}/api/Authenticate/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                Username: $('#username').val(),
         
                Password: $('#password').val()
              })
            })
              .then(response => response.json())
              .then(data => {

                // Hide loading popup
                Swal.close();
                console.log('end ------------')
                console.log(data.isSuccess)
                if (data.isSuccess === false ) {
                  // Show error popup
                  Swal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: data.message
                  });
                } else {
                  // Show success popup
                  console.log('start ...........')
                  if (localStorage.getItem('diam') !== null)
                    localStorage.removeItem('diam')

                  localStorage.setItem('diam', JSON.stringify(data.data));
                  console.log(data)
               
                  Swal.fire({
                    icon: 'success',
                    title: 'عملیات موفقیت آمیز بود',
                    text: data.message
                  });
                }
                window.location = '/';
              
              });


          }
        });

      });

      const fv = FormValidation.formValidation(formAuthentication, {
        fields: {

          username: {
            validators: {
              notEmpty: {
                message: 'لطفا نام کاربری را وارد نمایید'
              },
              stringLength: {
                min: 6,
                message: 'نام کاربری بیشتر از 6 حرف می باشد'
              }
            }
          },
          name: {
            validators: {
              notEmpty: {
                message: 'لطفا نام  را وارد نمایید'
              },
              stringLength: {
                min: 2,
                message: 'نام  بیشتر از 2 حرف می باشد'

              }

            }
          },
          phonenumber: {
            validators: {
              notEmpty: {
                message: 'لطفا شماره تلفن  را وارد نمایید'
              },
              stringLength: {
                min: 11,
                max: 11,
                message: 'شماره تلفن  بیشتر از 11 حرف می باشد'
              }
            }
          },
          lastname: {
            validators: {
              notEmpty: {
                message: 'لطفا نام خانوادگی را وارد نمایید'
              },
              stringLength: {
                min: 2,
                message: 'نام خانوادگی  بیشتر از 2 حرف می باشد'
              }
            }
          },

          email: {
            validators: {
              notEmpty: {
                message: 'لطفا ایمیل را وارد نمایید'
              },
              emailAddress: {
                message: 'لطفا ایمیل معتبر وارد نمایید'
              },
              stringLength: {
                min: 6,
                message: ' ایمیل بیشتر از 6 حرف می باشد'
              }
            }
          },
          'email-username': {
            validators: {
              notEmpty: {
                message: 'نام کاربری یا ایمیل را وارد نمایید'
              },
              stringLength: {
                min: 6,
                message: 'نام کاربری یا ایمیل بیشتر از 6 حرف می باشد'
              }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: 'لطفا رمز عبور را وارد نمایید'
              },
              stringLength: {
                min: 6,
                message: 'رمز عبور باید بیشتر از 6 حرف باشد'
              }
            }
          },
          'confirm-password': {
            validators: {
              notEmpty: {
                message: 'لطفا رمز عبور را تکرار کنید'
              },
              identical: {
                compare: function () {
                  return formAuthentication.querySelector('[name="password"]').value;
                },
                message: 'رمز عبور و تکرار رمز عبور یکسان نیست'
              },
              stringLength: {
                min: 6,
                message: 'رمز عبور باید بیشتر از 6 حرف باشد'
              }
            }
          },
          terms: {
            validators: {
              notEmpty: {
                message: 'لطفا قوانین را تایید فرمایید'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap5: new FormValidation.plugins.Bootstrap5({
            eleValidClass: '',
            rowSelector: '.mb-3'
          }),
          // submitButton: new FormValidation.plugins.SubmitButton(),

          // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          autoFocus: new FormValidation.plugins.AutoFocus()
        },
        init: instance => {
          instance.on('plugins.message.placed', function (e) {
            if (e.element.parentElement.classList.contains('input-group')) {
              e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
            }
          });
        }
      });
    }

    //  Two Steps Verification
    const numeralMask = document.querySelectorAll('.numeral-mask');

    // Verification masking
    if (numeralMask.length) {
      numeralMask.forEach(e => {
        new Cleave(e, {
          numeral: true
        });
      });
    }
  })();
});
