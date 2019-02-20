"use strict";
$(document).ready(function () {
    let data;
    let i = 0;
    $.ajax({
        url: 'http://codeit.pro/codeitCandidates/serverFrontendTest/news/getList',
        type: 'POST',
        data,
        success: data => {
            getData(data);
        },
        error: jqXHR => {
            alert('Возникла ошибка: ' + jqXHR.responseCode);
        }
    });
    $('.next').on('click', (e) => {
        $.ajax({
            url: 'http://codeit.pro/codeitCandidates/serverFrontendTest/news/getList',
            type: 'POST',
            data,
            success: data => {
                if (i === data.list.length - 1) {
                    i = -1;
                }
                i++;
               getData(data);
            },
            error: jqXHR => {
                alert('Возникла ошибка: ' + jqXHR.responseCode);
            }
        });
    });
    $('.prev').on('click', (e) => {
        $.ajax({
            url: 'http://codeit.pro/codeitCandidates/serverFrontendTest/news/getList',
            type: 'POST',
            data,
            success: data => {
                if (i === 0) {
                    i = data.list.length;
                }
                i--;
                getData(data);
            },
            error: jqXHR => {
                alert('Возникла ошибка: ' + jqXHR.responseCode);
            }
        });
    });
    function getData(data){
        $('.newsImg').attr('src', data.list[i].img);
        $('.newsLink').attr('href', data.list[i].link);
        $('.newsDescription').text(data.list[i].description);
        $('.author').text('Author: ' + data.list[i].author);
        $('.public').text('Public: ' + timeConverter(data.list[i].date));
    }
    function timeConverter(UNIX_timestamp){
        let a = new Date(UNIX_timestamp * 1000);
        let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let time = date + '.' + month + '.' + year;
        return time;
    };

})