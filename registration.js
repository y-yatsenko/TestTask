"use strict";
$(document).ready(function () {
    const form = document.forms.registrationForm;
    const name = form.name;
    const secondName = form.secondname;
    const email = form.email;
    const checkAgreement = form.check;
    // let o = {};

    $('form').on('submit', function (event) {
         event.preventDefault();
        if (name.value.length < 3 || /[0-9]/.test(name.value)) {
         alert('Please input your name. Field \'name\' should contain from 3 to 60 letters');
         // o.message = 'Please input your name. Field \'name\' should contain from 3 to 60 letters';
         // o.field = 'name';
         // o.status = 'Form Error';
         //alert (o.message);
        }
        if (secondName.value.length < 3 || /[0-9]/.test(secondName.value)) {
            alert('Please input your second name. Field \'second name\' should contain from 3 to 60 letters');
        }
        if (email.value === '') {
            alert('Please input your email');
        }
        if (checkAgreement.checked === false) {
            alert ('Please accept conditions of agreement');
        }
        //if all information is correct, send her
        if (name.value.length >= 3 && !(/[0-9]/.test(name.value)) && secondName.value.length >= 3 && !(/[0-9]/.test(secondName.value)) && checkAgreement.checked) {
            // send date to the server
            let data = $(this).serialize();
            $.ajax({
                url: 'http://codeit.pro/codeitCandidates/serverFrontendTest/user/registration',
                type: 'POST',
                data: data,
                success: function(data) {
                    console.log(data);
                    if (data.status === 'OK') {
                        alert('congrats');
                        // move to the main page
                        document.location.href = "mainPage.html";

                    } else {
                        alert(data.message);
                    }
                },
                error: function (xhr) {
                    alert('Возникла ошибка: ' + xhr.responseCode);
                }
            })
        }
    });
})