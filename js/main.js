let massive_data_1 = ["ОБЛИГАЦИЯ_1", "ОФЗ", 1003.68, 992.32, 11, 6, 1000, 33.03, "12%", 0, 0];
let massive_data_2 = ["ОБЛИГАЦИЯ_2", "ОФЗ", 1009.68, 965.75, 7, 2, 1000, 25.81, "10%", 0, 0];

const data = {
    type: "ОБЛИГАЦИИ",
    married: true,
    bonds: [],
};

data.bonds[0] = {
    tiker: "RU000A101XD8", name: "МаксимаТелеком", purchase_price: 655, market_value: 785,
    quantity: 3, nkd: 33.3, nominal: 1000, coupon: 53.6, coupon_percent: "10,75%",
};


let profitArray = document.querySelectorAll("#profit");
let profitArrayElements = [];
let profitPercentArrayElements = [];
let valueInPortfolioArrayElements = [];

function makeTable(length_table) {
    for (let i = 0; i < length_table; i++) {
        document.querySelectorAll("#profit")[i].innerHTML = profitArrayElements[i] + profitPercentArrayElements[i];
        let tr = document.createElement('tr');
        tr.innerHTML = '<td id="tiker"></td>\
                <td id="name"></td>\
                <td id="market_value"></td>\
                <td id="purchase_price"></td>\
                <td id="quantity"></td>\
                <td id="nkd"></td>\
                <td id="nominal"></td>\
                <td id="coupon"></td>\
                <td id="coupon_percent"></td>\
                <td id="profit"></td>\
                <td id="value_in_the_portfolio"></td>';
        document.querySelector('#table_layout').append(tr);
    }
}

makeTable(data.bonds.length - 1);

function output () {
    function formatNumber (value) {
        return numbFmt = new Intl.NumberFormat('ru-RU').format(value);
    }
    
    let market_value = 0;
    let purchase_price = 0;
    let quantity = 0;
    let nkd = 0;
    let sum = 0;

    for (let i = 0; i < data.bonds.length; i++) {
        market_value = data.bonds[i].market_value;
        purchase_price = data.bonds[i].purchase_price;
        quantity = data.bonds[i].quantity;
        nkd = data.bonds[i].nkd;

        let profit = market_value - purchase_price; profit *= quantity;
        let profit_percent = (((market_value - purchase_price)/purchase_price) * 100).toFixed(2);

        let profit_info = "";
        if (profit > 0) {
            profit_info = " (+" + profit_percent + " %)";
            profit_place.style.color = "green";
        }
        else {
            profit_info = " (" + profit_percent + " %)";
            profit_place.style.color = "#C41E3A";
        }

        let value_in_the_portfolio = (profit + (market_value * quantity) + (quantity * nkd)).toFixed(2);
        console.log(parseFloat(value_in_the_portfolio));

        profitArrayElements.push(profit.toFixed(2));
        profitPercentArrayElements.push(profit_info);
    //     valueInPortfolioArrayElements.push(value_in_the_portfolio);         
    // }

    // for (let i = 0; i < data.bonds.length; i++) {
    //     market_value = data.bonds[i].market_value;
    //     purchase_price = data.bonds[i].purchase_price;
    //     quantity = data.bonds[i].quantity;
    //     nkd = data.bonds[i].nkd;

        console.log(market_value);

        profit_place = document.querySelectorAll("#profit")[i];
        if (profitArrayElements[i] > 0) {
            profit_place.style.color = "green";
        } else {
            profit_place.style.color = "#C41E3A";
        }

        value_in_the_portfolio = (profit + (market_value * quantity) + (quantity * nkd));

        document.querySelectorAll("#tiker")[i].innerHTML = data.bonds[i].tiker;
        document.querySelectorAll("#name")[i].innerHTML = data.bonds[i].name;
        document.querySelectorAll("#market_value")[i].innerHTML = data.bonds[i].market_value;
        document.querySelectorAll("#purchase_price")[i].innerHTML = data.bonds[i].purchase_price;
        document.querySelectorAll("#quantity")[i].innerHTML = data.bonds[i].quantity;
        document.querySelectorAll("#nkd")[i].innerHTML = data.bonds[i].nkd;
        document.querySelectorAll("#nominal")[i].innerHTML = data.bonds[i].nominal;
        document.querySelectorAll("#coupon")[i].innerHTML = data.bonds[i].coupon;
        document.querySelectorAll("#coupon_percent")[i].innerHTML = data.bonds[i].coupon_percent;

        document.querySelectorAll("#profit")[i].innerHTML = formatNumber(profit) + profit_info;
        // document.querySelectorAll("#value_in_the_portfolio")[i].innerHTML = formatNumber(valueInPortfolioArrayElements[i]);


        sum += Number(valueInPortfolioArrayElements[i]);
        console.log(sum);
    }

    document.getElementById("sum").innerHTML = formatNumber(sum) + " ₽";
}

output();

btn_save.onclick = function () {
    let input_tiker = String(document.getElementById("input_tiker").value);
    let input_purchase_price = parseFloat(document.getElementById("input_purchase_price").value);
    let input_quantity = parseFloat(document.getElementById("input_quantity").value);
    let input_nkd = parseFloat(document.getElementById("input_nkd").value);

    data.bonds[data.bonds.length] = {
        tiker: input_tiker, name: "Самолет " + data.bonds.length, purchase_price: input_purchase_price, 
        market_value: 997.64,
        quantity: input_quantity, nkd: input_nkd, nominal: 1000, coupon: 25, coupon_percent: "10%",
    }
    
    makeTable(1);
    output();
    output();
}