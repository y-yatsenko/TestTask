"use strict";
$(document).ready(function () {
    const form = document.forms.registrationForm;
    const name = form.name;
    const secondName = form.secondname;
    const email = form.email;
    const gender = form.gender;
    const password = form.password;
    const checkAgreement = form.check;
    const sub = form.sub;

    $('form').on('submit', function (event) {
         event.preventDefault();
        if (name.value === '') {
         alert('please input your name');
        }
        if (secondName.value === '' || secondName.value.length < 3) {
            alert('please input your second name');
        }
        if (email.value === '') {
            alert('please input your email');
        }
        if (checkAgreement.checked) {
            // send date to the server
            let data = $(this).serialize();
            $.ajax({
                url: 'http://codeit.pro/codeitCandidates/serverFrontendTest/user/registration',
                type: 'POST',
                data: data,
                success: function(data) {
                    console.log(data);
                    alert(data.message);
                },
                error: function (xhr, str) {
                    alert('Возникла ошибка: ' + xhr.responseCode);
                }
            })
        }
    });
})

