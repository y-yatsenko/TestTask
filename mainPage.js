"use strict";
$(document).ready(function () {
    let data;
    let totalCompanies;
    $.ajax({
        url: 'http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList',
        type: 'POST',
        data,
        success: function (data) {
            console.log(data);
            showTotalCompanies(data);
            showListOfCompanies(data);
            showCompanyPartners(data);

        },
        error: function (xhr, str) {
            alert('Возникла ошибка: ' + xhr.responseCode);
        }
    });
    function showTotalCompanies(companies) {
        //$('.t').html = 'axax';
        document.querySelector('.countOfCompanies').innerHTML = companies.list.length + '';
    }
    function showListOfCompanies(companies) {
        for (let company of companies.list) {
            let div = document.createElement('div');
            $(div).addClass('company').html(company.name).appendTo($('.listOfCompanies'));
        }
    }
    function showCompanyPartners(companies) {

        $('.listOfCompanies').on('click', (e) => {
            $('.companyPartnersDisable').toggleClass('companyPartnersShow');
            $(e.target).toggleClass('selectedCompany');
            $('.companyPartner').detach();
            //get number of target company
            let i = 0;
            for (let company of companies.list) {
                if ( e.target.innerHTML === company.name) {
                    break;
                }
                    i++
            }
            // for (let company of companies.list[i]) {
            //     let div = document.createElement('div');
            //     $(div).addClass('companyPartner').html(company.partners).appendTo($('.companyPartnersShow'));
            //     //$('.companyPartner').html(companies.list[i].name).appendTo($('.companyPartnersShow'));
            // }
            let company = companies.list[i];
             for (let j = 0; j <  company.partners.length; j++) {
                 let divCompany = document.createElement('div');
                 $(divCompany).addClass('companyPartner').html(company.partners[j].name + ' - ' + company.partners[j].value + '%').appendTo($('.companyPartnersShow'));
             }
        })
    }
})