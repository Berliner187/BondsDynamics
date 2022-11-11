const data = {
    type: "ОБЛИГАЦИИ",
    married: true,
    bonds: [],
};

data.bonds[0] = {
    tiker: "RU000A101XD8", name: "Whoosh", purchase_price: 1002.9, market_value: 1032,
    quantity: 5, nkd: 15.5, nominal: 1000, coupon: 33.66, coupon_percent: "13,5%",
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
    let value_in_the_portfolio = 0;

    for (let i = 0; i < data.bonds.length; i++) {
        market_value = data.bonds[i].market_value;
        purchase_price = data.bonds[i].purchase_price;
        quantity = data.bonds[i].quantity;
        nkd = data.bonds[i].nkd;

        let profit = (quantity * market_value) - (quantity * purchase_price);
        let profit_percent = (((market_value - purchase_price)/purchase_price) * 100).toFixed(2);

        let profit_info = "";
        profit_place = document.querySelectorAll("#profit")[i];
        if (profit > 0) {
            profit_info = " (+" + profit_percent + " %)";
            profit_place.style.color = "green";
        }
        else {
            profit_info = " (" + profit_percent + " %)";
            profit_place.style.color = "#C41E3A";
        }

        value_in_the_portfolio = (market_value * quantity + nkd * quantity);

        function insertHTML(id, dataSpace) {
            let returnValue;
            if (typeof dataSpace === "integer") { returnValue = formatNumber(dataSpace); }
            else { returnValue = dataSpace; }
            return document.querySelectorAll("#" + id)[i].innerHTML = returnValue;
        }

        insertHTML("tiker", data.bonds[i].tiker);
        insertHTML("name", data.bonds[i].name);
        insertHTML("market_value", data.bonds[i].market_value);
        insertHTML("purchase_price", data.bonds[i].purchase_price);
        insertHTML("quantity", data.bonds[i].quantity);
        insertHTML("nkd", data.bonds[i].nkd);
        insertHTML("nominal", data.bonds[i].nominal);
        insertHTML("coupon", data.bonds[i].coupon);
        insertHTML("coupon_percent", data.bonds[i].coupon_percent);

        document.querySelectorAll("#profit")[i].innerHTML = formatNumber(profit) + profit_info;
        document.querySelectorAll("#value_in_the_portfolio")[i].innerHTML = formatNumber(value_in_the_portfolio);

        sum += value_in_the_portfolio;
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
        tiker: input_tiker, name: "М.Видео " + data.bonds.length, purchase_price: input_purchase_price, 
        market_value: 1008.4,
        quantity: input_quantity, nkd: input_nkd, nominal: 1000, coupon: 30.79, coupon_percent: "12.35%",
    }
    
    makeTable(1);
    output();
}