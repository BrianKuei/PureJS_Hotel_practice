const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer VTdE6OYJXxQHxKSeG3BJWGllGafnDLHPdFWbCCDJPgipwq3mBNKBNzMw11ar'
}
let info = null;
let roomId = location.search.substr(1);
let xhr = new XMLHttpRequest();
xhr.open('get', `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${roomId}`);
xhr.setRequestHeader("Authorization", "Bearer VTdE6OYJXxQHxKSeG3BJWGllGafnDLHPdFWbCCDJPgipwq3mBNKBNzMw11ar");
xhr.onload = (event) => {
    let data = JSON.parse(xhr.response).room;
    init(data);
    reserveInfo();
    deleteAllTime();
}
xhr.send(null);

let init = (param) => {
    const bigImg = document.querySelector(".bigImg");
    const smallBox = document.querySelector(".smallBox");
    const roomDetail = document.querySelector(".roomDetail");
    const price = document.querySelector(".price");
    bigImg.innerHTML += `<a href="${param[0].imageUrl[2]}" data-lightbox="room-set" data-title="${param[0].name}"><img src="${param[0].imageUrl[2]}" alt=""></a>`;
    smallBox.innerHTML += `<div class="smallImg"><a href="${param[0].imageUrl[1]}" data-lightbox="room-set" data-title="${param[0].name}"><img src="${param[0].imageUrl[1]}" alt=""></a></div><div class="smallImg"><a href="${param[0].imageUrl[0]}" data-lightbox="room-set" data-title="${param[0].name}"><img src="${param[0].imageUrl[0]}" alt=""></a></div>`;
    roomDetail.innerHTML += `<h1>${param[0].name}</h1><div class="detail"><p>房客人數限制： ${param[0].descriptionShort.GuestMin}~${param[0].descriptionShort.GuestMax} 人</p><p>床型：${param[0].descriptionShort.Bed[0]}</p><p>衛浴數量： ${param[0].descriptionShort["Private-Bath"]} 間</p><p> 房間大小： ${param[0].descriptionShort.Footage} 平方公尺</p></div><div class="brief">${param[0].description}</div><div class="checkInOut"><div class="check"><p>Check In</p>${param[0].checkInAndOut.checkInEarly} — ${param[0].checkInAndOut.checkInLate}</div><div class="check"><p>Check Out</p>${param[0].checkInAndOut.checkOut}</div></div><div class="facility"><span class="${param[0].amenities["Wi-Fi"]}"><img src="img/info_icon/wifi.svg" alt="">WiFi</span> <span class="${param[0].amenities["Television"]}"><img src="img/info_icon/phone.svg" alt="">電話</span> <span class="${param[0].amenities["Great-View"]}"><img src="img/info_icon/mountain-range.svg" alt="">漂亮的視野</span> <span class="${param[0].amenities["Breakfast"]}"><img src="img/info_icon/breakfast.svg" alt="">早餐</span> <span class="${param[0].amenities["Air-Conditioner"]}"><img src="img/info_icon/breeze.svg" alt="">空調</span> <span class="${param[0].amenities["Smoke-Free"]}"><img src="img/info_icon/no-smoke-symbol.svg" alt="">禁止吸菸</span> <span class="${param[0].amenities["Mini-Bar"]}"><img src="img/info_icon/bar.svg" alt="">Mini Bar</span> <span class="${param[0].amenities["Refrigerator"]}"><img src="img/info_icon/breeze.svg" alt="">冰箱</span> <span class="${param[0].amenities["Child-Friendly"]}"><img src="img/info_icon/crawling-baby-silhouette.svg" alt="">適合兒童</span> <span class="${param[0].amenities["Room-Service"]}"><img src="img/info_icon/room_service.svg" alt="">Room Service</span> <span class="${param[0].amenities["Sofa"]}"><img src="img/info_icon/mountain-range.svg" alt="">沙發</span> <span class="${param[0].amenities["Pet-Friendly"]}"><img src="img/info_icon/dog.svg" alt="">寵物攜帶</span></div>`;
    price.innerHTML += `<div class="dayPrice"> <h2>NT.${param[0].holidayPrice}</h2> <span>平日(一~四)</span> </div> <div class="dayPrice"> <h3>NT.${param[0].normalDayPrice}</h3> <span>假日(五~日)</span> </div>`;
};



let reserveInfo = (param) => {
    const name = document.querySelector("#name");
    const tel = document.querySelector("#tel");
    const firstDay = document.querySelector("#firstDay");
    const lastDay = document.querySelector("#lastDay");
    const confirm = document.querySelector(".confirm");
    var dayArr = [];
    confirm.addEventListener("click", (event) => {
        getDays(firstDay.value, lastDay.value, dayArr);
        info = JSON.stringify({
            "name": name.value,
            "tel": tel.value,
            "date": dayArr
        });
        dayArr = [];
        reserveTime(info);
    });
};

let getDays = (day1, day2, arr) => {
        // 獲取參數字串形式日期的Date型日期
        var firstDay = getDate(day1);
        var lastDay = getDate(day2);


        // 循環，啟動天日期不等於结束日期時，進行循環
        while (firstDay.getTime() != lastDay.getTime()) {

            // 將啟動日期的字串形式的日期存放入陣列
            arr.push(getYMD(firstDay));

            // 將開始日期firstDay指向構造出的新的日期
            // 新的日期較之前的日期多加一天
            firstDay = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 1);
        }

        // 將结束日期的天放陣列
        arr.push(getYMD(lastDay));
    }
    // 给Date對象添加getYMD方法，獲取字串形式的年月日
let getYMD = (param) => {
    var retDate = param.getFullYear() + "-"; // 獲取年份。
    retDate += ("0" + (param.getMonth() + 1)).slice(-2) + "-"; // 獲取月份。          
    retDate += ("0" + param.getDate()).slice(-2); // 獲取日。
    return retDate; // 返回日期。
}

// 给String對象添加getDate方法，使字串形式的日期返回為Date型的日期
let getDate = (param) => {
    var strArr = param.split('-');
    var date = new Date(strArr[0], strArr[1] - 1, strArr[2]);
    return date;
}

let obj = {
    liveHoliDay: 0,
    liveNormalDay: 0,
    total: 0,
}

let reserveTime = (param) => {
    axios.request({
            url: `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${roomId}`,
            method: 'post',
            headers: headers,
            data: param,
        })
        .then(res => {
            const normalDay = document.querySelectorAll(".calDetail>p>span")[0];
            const holiDay = document.querySelectorAll(".calDetail>p>span")[1];
            const payment = document.querySelector(".payment");
            const tdTag = document.querySelectorAll(".calendar td");
            let checkInArr = res.data.booking;
            let holidayPrice = res.data.room[0].holidayPrice;
            let normalDayPrice = res.data.room[0].normalDayPrice;
            if (res.data.success) {
                console.log(res.data.booking);
                console.log(tdTag);
                markDate(tdTag, res.data.booking);
                for (let i = 0; i < checkInArr.length; i++) {
                    isWeekEnd(checkInArr[i].date, holidayPrice, normalDayPrice);
                }
                normalDay.innerHTML = `${obj.liveNormalDay}夜`;
                holiDay.innerHTML = `${obj.liveHoliDay}夜`;
                payment.innerHTML = `= NT.${obj.total}`;
            }
        }).catch(error => {
            if (error.response) {
                alert(error.response.data.message);
            }
        });

};

let isWeekEnd = (date, holidayPrice, normalDayPrice) => {

    if ("天一二三四五六".charAt(new Date(date).getDay()) == "天" || "天一二三四五六".charAt(new Date(date).getDay()) == "六") {
        obj.liveHoliDay += 1;
        obj.total += holidayPrice;
        return true
    } else {
        obj.liveNormalDay += 1;
        obj.total += normalDayPrice;
    };
};

let markDate = (elementArr, param) => {
    elementArr.forEach((element) => {
        for (let i = 0; i < param.length; i++) {
            if (element.dataset.date == param[i].date) {
                element.classList.add("markDate");
            };
        };
    });
};

let ripMarkDate = (elementArr, param) => {
    elementArr.forEach((element) => {
        for (let i = 0; i < param.length; i++) {
            if (element.dataset.date == param[i].date) {
                console.log("1e12")
                element.classList.remove("markDate");
            };
        };
    });
};

let deleteAllTime = (param) => {
    const deleteTime = document.querySelector(".delete");
    const tdTag = document.querySelectorAll(".calendar td");
    deleteTime.addEventListener("click", (event) => {
        axios.request({
                url: `https://challenge.thef2e.com/api/thef2e2019/stage6/rooms`,
                method: 'delete',
                headers: headers,
            })
            .then(res => {
                // ripMarkDate(tdTag, res.data.booking);
                console.log(res);
                if (res.data.success) {
                    commit('setReservationDate', obj);
                }
            }).catch(error => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            });
    });
};


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.querySelectorAll(".reserveTime")[0];

// Get the <cancel> element that closes the modal
var cancel = document.querySelector(".cancel");

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <cancel> (x), close the modal
cancel.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}