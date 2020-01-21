var calendar = {

    dayTable: null, //初始化TABLE

    year: null, //初始化年

    month: null, //初始化月份

    selectDay: null,



    getFirstDay: (year, month) => { //獲取每個月第一天在星期幾

        var firstDay = new Date(year, month, 1);
        // console.log(firstDay.getDay(), firstDay);

        return firstDay.getDay(); //getDay()方法來獲取，會是一個數值，回傳本地時間星期中的日子（0-6）。

    },

    getMonthLen: (year, month) => { //獲取當月總共有多少天

        var nextMonth = new Date(year, month + 1, 1); //獲取下個月的第一天 
        // console.log(nextMonth);

        nextMonth.setHours(nextMonth.getHours() - 3); //由於獲取的天是0時,所以減去3小時則可以得出該月的天數，這個會是當月的總小時再用 getDate 去算一共有幾天。
        // console.log(nextMonth, nextMonth.setHours(nextMonth.getHours() - 3), nextMonth.getDate());

        return nextMonth.getDate(); //返回當天日期

    },

    createCalendar: (form, date) => { //創建日曆方法

        calendar.year = date.getFullYear(); //獲得當時的年份,並賦值到calendar屬性year中,以便別的方法的調用

        calendar.month = date.getMonth(); //跟上面獲取年份的目的一樣

        form.getElementsByTagName('th')[1].innerHTML = calendar.year + '年 ' + (calendar.month + 1) + '月'; //插入年份和月份

        calendar.clearCalendar(form); //清空TABLE

        var monthLen = calendar.getMonthLen(calendar.year, calendar.month); //獲取月份長度

        var firstDay = calendar.getFirstDay(calendar.year, calendar.month); //獲取月份首天為星期幾

        for (var i = 1; i <= monthLen; i++) { //循環寫入每天的值進入TABLE中

            calendar.dayTable[i + firstDay - 1].innerHTML = i; //i為循環值,加上第一天的星期值剛可以對應TABLE位置,但由於數組從0開始算,所以需要減去1

            calendar.dayTable[i + firstDay - 1].setAttribute("data-date", `${calendar.year}-${("0" + (calendar.month + 1)).slice(-2)}-${i}`);

            if (calendar.month < new Date().getMonth() && calendar.year == new Date().getFullYear()) {

                calendar.dayTable[i + firstDay - 1].classList.add('pastDay');

            } else {
                calendar.dayTable[i + firstDay - 1].classList.remove('pastDay');
            };

            if ((i + firstDay) == new Date().getDate() && calendar.month == new Date().getMonth() && calendar.year == new Date().getFullYear()) { //判斷是否是當天

                calendar.dayTable[i + firstDay - 1].classList.add('today');

            } else {

                calendar.dayTable[i + firstDay - 1].classList.remove('today');

            };

            if (calendar.dayTable[i + firstDay - 1].textContent < new Date().getDate() && calendar.month == new Date().getMonth() && calendar.year == new Date().getFullYear()) {

                calendar.dayTable[i + firstDay - 1].classList.add('pastDay');

            };

        }

    },

    clearCalendar: (form) => { //清空TABLE方法

        this.dayTable = form.getElementsByTagName('td');

        for (var i = 0; i < this.dayTable.length; i++) {

            this.dayTable[i].innerHTML = ' ';

            this.dayTable[i].id = '';

        }

    },
    selectDays: (form) => {

    },

    init: function(form) { //主方法

        this.dayTable = form.getElementsByTagName('td');

        this.createCalendar(form, new Date());

        var preMon = form.getElementsByTagName('th')[0];

        var nextMon = form.getElementsByTagName('th')[2];

        preMon.onclick = function() { //當點擊左按鈕時,減去一個月,並重繪TABLE

            calendar.createCalendar(form, new Date(calendar.year, calendar.month - 1, 1));


        }

        nextMon.onclick = function() { //當點擊右按鈕時,加上一個月,並重繪TABLE

            calendar.createCalendar(form, new Date(calendar.year, calendar.month + 1, 1));

        }

    }
}

window.onload = function() {
    var calendars = document.querySelector('.calendar');
    calendar.init(calendars);
}