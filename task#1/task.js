const loader = document.querySelector('.loader');
const items = document.getElementById('items');

function chengeData (data) {
    document.querySelectorAll('.item').forEach(element => {
        let currensy = element.querySelector('.item__code');
        let value = element.querySelector('.item__value');
        value.textContent = data[currensy.textContent.trim()].Value;
    });
};


function insertData(data) {
    let html = '';
    if (Array.from(document.querySelectorAll('.item')).length != 0) {
        chengeData(data);
    }
    else {
        for(key in data) {
            html = `<div class="item">
            <div class="item__code">
                ${data[key].CharCode}
            </div>
            <div class="item__value">
                ${data[key].Value}
            </div>
            <div class="item__currency">
                руб.
            </div>
            </div>`;
            items.innerHTML += html;
        };
    };
    localStorage.setItem('oldData', JSON.stringify(data));
};


function getCurrentItems(url) {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            loader.classList.remove('loader_active');
            let data = JSON.parse(xhr.response);
            insertData(data.response.Valute);
        };
    });
    xhr.open('GET', url);
    xhr.send("");

};

const url = "https://students.netoservices.ru/nestjs-backend/slow-get-courses";

if (localStorage.getItem('oldData')){
    insertData(JSON.parse(localStorage.getItem('oldData')));
    getCurrentItems(url);
}
 else {
    getCurrentItems(url);
 };