"use strict";
$(document).ready(function () {
    let data;
    $(document).on({
        ajaxStart: function() { showLoader();},
        ajaxStop: function() { hideLoader();}
    });
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
    let self;
    function showCompanyPartners(companies) {
        $('.listOfCompanies').on('click', (e) => {
            if (self) {
                $(self).removeClass('selectedCompany');
            }
            $('.companyPartnersDisable').addClass('companyPartnersShow');
            $(e.target).addClass('selectedCompany');
            $('.wrapCompanyPartner').detach();
            self = e.target;
            //get number of target company
            let i = 0;
            for (let company of companies.list) {
                if ( e.target.innerHTML === company.name) {
                    break;
                }
                    i++
            }
            let company = companies.list[i];
            let wrapDivCompany = document.createElement('div');
            $(wrapDivCompany).addClass('wrapCompanyPartner').appendTo('.companyPartnersShow')
             for (let j = 0; j <  company.partners.length; j++) {

                 let divCompany = document.createElement('div');
                 $(divCompany).addClass('companyPartner').html(company.partners[j].name + ' - ' + company.partners[j].value + '%').appendTo($('.wrapCompanyPartner'));
                 //calculate height for partner company div
                 $(divCompany).height(company.partners[j].value * ((($('.companyPartnersShow').height()) - ($('.title').height()))/100));
             }
        })
    }
    function showLoader() {
        $('.countOfCompanies').append(`<div class="load"><img src="ajax-loader%20(1).gif" alt="load..."></div>`);
        $('.listOfCompanies').append(`<div class="load"><img src="ajax-loader%20(1).gif" alt="load..."></div>`);

    }
    function hideLoader() {
        $('.load').remove();
    }
})