let count = 0;
let imgArray = [];
let xhr = new XMLHttpRequest();
xhr.open('get', "https://challenge.thef2e.com/api/thef2e2019/stage6/rooms");
xhr.setRequestHeader("Authorization", "Bearer VTdE6OYJXxQHxKSeG3BJWGllGafnDLHPdFWbCCDJPgipwq3mBNKBNzMw11ar");
xhr.onload = (event) => {
    let data = JSON.parse(xhr.response).items;
    console.log(data);

    //房圖Array建立
    imgUrlArray(imgArray, data);

    //切換背景圖片
    // carousel(imgArray, count); //用setTimeOut做
    carousel //用setInterval做

    //各個房間價錢
    listPrice(data);
}


xhr.send(null);


//房圖Array建立
let imgUrlArray = (imgArray, param) => {
    for (let i = 0; i < param.length; i++) {
        imgArray.push(param[i].imageUrl);
    };
};

//背景輪播
// let carousel = () => {
//     const bannerBox = document.querySelector(".bannerBox");
//     if (count != imgArray.length) {
//         bannerBox.style.backgroundImage = `url(${imgArray[count]})`;
//         count++;
//     } else {
//         count = 0;
//         bannerBox.style.backgroundImage = `url(${imgArray[count]})`;
//     };
//     setTimeout(carousel, 5000);
// };

let carousel = window.setInterval(() => {
    const bannerBox = document.querySelector(".bannerBox");
    if (count != imgArray.length) {
        bannerBox.style.backgroundImage = `url(${imgArray[count]})`;
        count++;
    } else {
        count = 0;
        bannerBox.style.backgroundImage = `url(${imgArray[count]})`;
    };
}, 5000)

let listPrice = (param) => {
    const listContainer = document.querySelector(".listContainer");
    let roomChinese = ["單人房", "豪華單人房", "單床雙人房", "豪華單床雙人房", "雙床雙人房", "豪華雙床雙人房"]
    for (let i = 0; i < param.length; i++) {
        listContainer.innerHTML += `
    <li>
        <a href="room.html?${param[i].id}">
            <div class="roomImg"></div>
            <div class="roomTypeInfo">
                <p>${param[i].name}</p>
                <div class="roomMore">
                    <span>${roomChinese[i]}</span>
                    <div class="roomPrice">
                        <h3>NT.${param[i].normalDayPrice}</h3>
                        <span class="normalDay">平日</span>
                        <span class="holiDay">NT.${param[i].holidayPrice} 假日</span>
                    </div>
                </div>
            </div>
        </a>
    </li>`;
        const roomImg = document.querySelectorAll(".listContainer>li>a>.roomImg");
        roomImg[i].style.backgroundImage = `url(${param[i].imageUrl})`
    };
};