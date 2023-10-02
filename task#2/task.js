let question = document.getElementById('poll__title');
let answer = document.getElementById('poll__answers');
let allData = '';


function makeStat(stat) {
    answer.classList.remove('poll__answers_active');
    let sum = 0;
    stat.stat.forEach((e) => {
        sum += e['votes'];
    });

    let statBlock = document.createElement('div');
    statBlock.className = 'poll__stat';
    stat.stat.forEach((e) => {
        html = `<div class="poll__stat-item">
            ${e['answer']}: ${(e['votes']/sum*100).toFixed(2)}%
        </div>`
        statBlock.innerHTML += html;
    });
    document.querySelector('.poll').insertAdjacentElement("beforeend", statBlock)
};


function getStat(answer) {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            makeStat(JSON.parse(xhr.response));
        };
    });

    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(`vote=${allData.id}&answer=${answer}`)
};

function answerQuestion() {
    Array.from(answer.querySelectorAll('.poll__answer')).forEach((e, i) => {
        e.addEventListener('click', () => {
            getStat(i);
            alert('Спасибо, ваш голос засчитан!')})
    });
};

function makeQuestion() {
    question.textContent = allData.data['title'].trim();
    allData.data['answers'].forEach(element => {
        html = `<button class="poll__answer">
            ${element}
        </button>`
        answer.innerHTML += html
    });
    answerQuestion();
};

function getAswer(url) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4){
            allData = JSON.parse(xhr.response);
            makeQuestion();
        };
    });

    xhr.open('GET', url);
    xhr.send("");
};


const url = ' https://students.netoservices.ru/nestjs-backend/poll';
getAswer(url);