'use strict';

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItems = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpItems = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

    let money, time;

    startBtn.addEventListener('click', function() {
        time = prompt("Введите дату в формате YYYY-MM-DD", "YYYY-MM-DD");
        money = +prompt("Ваш бюджет на месяц?", "");
    
        while (isNaN(money) || money == "" || money == null) {
            money = +prompt("Ваш бюджет на месяц?", "");
        }
        expensesBtn.disabled = false;
        optionalExpBtn.disabled = false;
        countBtn.disabled = false;
        appData.budget = money;
        appData.timeData = time;
        budgetValue.textContent = money.toFixed();
        yearValue.value = new Date(Date.parse(time)).getFullYear();
        monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
        dayValue.value = new Date(Date.parse(time)).getDate();
    });

    expensesBtn.addEventListener('click', function() {
        let sum = 0;

        for (let i = 0; i < expensesItems.length; i++) {
            var a = expensesItems[i].value,
                b = expensesItems[++i].value;
            
            if ((typeof(a)) === "string" && (typeof(a)) != null && (typeof(b)) != null
                && a != "" && b != "" && a.length < 50) {
                    console.log("Все верно");
                    appData.budget -= b;
                    appData.expenses[a] = b;
                    sum += +b;
            } else if (i > 0) {
                i -= 1;
            }
        }
        expensesValue.textContent = sum;
    });

    optionalExpBtn.addEventListener('click', function() {
        for (let j = 0; j < optionalExpItems.length; j++) {
            var c = optionalExpItems[j].value;
            
            if ((typeof(c)) === "string" && (typeof(c)) != null && c != "" && c.length < 50) {
                    appData.optionalExpenses[j] = c;
                    optionalExpensesValue.textContent += appData.optionalExpenses[j] + ' ';
            } else if (c == "") {
                alert('Вы заполнили не все поля');
                optionalExpensesValue.textContent = "";
                break;
            }
        }
    });

    countBtn.addEventListener('click', function() {
        
        if (appData.budget != undefined) {
            appData.moneyPerDay = Math.floor(appData.budget / 30); // or (app.Data.budget / 30).toFixed();
            daybudgetValue.textContent = appData.moneyPerDay;
    
            if (appData.moneyPerDay < 100) {
                levelValue.textContent = "Низкий уровень достатка";
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                levelValue.textContent = "Средний уровень достатка";
            } else if (appData.moneyPerDay > 2000) {
                levelValue.textContent = "Высокий уровень достатка";
            } else {
                levelValue.textContent = "Произошла ошибка";
            }
        } else {
            daybudgetValue.textContent = "Произошла ошибка";
        }
    });

    chooseIncome.addEventListener('input', function() {
        let items = chooseIncome.value;
        appData.income = items.split(',');
        incomeValue.textContent = appData.income;
    });

    checkSavings.addEventListener('click', function() {
        if (appData.savings == true) {
            appData.savings = false;
        } else {
            appData.savings = true;
        }
    });

    chooseSum.addEventListener('input', function() {
        if (appData.savings == true) {
            let sum = +chooseSum.value,
                percent = +choosePercent.value;
            
            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;

            monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
        }
    });
    
    choosePercent.addEventListener('input', function() {
        if (appData.savings == true) {
            let sum = +chooseSum.value,
                percent = +choosePercent.value;
            
            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;

            monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
        }
    })

    let appData = {
            expenses: {},
            optionalExpenses: {},
            savings: false,
            income: []
    };
