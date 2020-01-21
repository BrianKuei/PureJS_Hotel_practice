const listBox = document.querySelector(".listBox");
let imgArray = [];
let xhr = new XMLHttpRequest();
xhr.open('get', "https://challenge.thef2e.com/api/thef2e2019/stage6/rooms");
xhr.setRequestHeader("Authorization", "Bearer VTdE6OYJXxQHxKSeG3BJWGllGafnDLHPdFWbCCDJPgipwq3mBNKBNzMw11ar");
xhr.onload = (event) => {
    let data = JSON.parse(xhr.response).items;
    console.log(data);

    // //把房名及初始背景圖載入到 HTML 中
    init(data);

    //房圖Array建立
    imgUrlArray(imgArray, data);

    // //切換背景圖片及文字
    changeBg(listBox, data);
}


xhr.send(null);


//載入房名及圖片
let init = (param) => {
    const wrap = document.querySelector(".wrap");
    for (let i = 0; i < param.length; i++) {
        listBox.innerHTML += `<li data-room="${i}"><a href="room.html?${param[i].id}">${param[i].name}</></li>`;
    };
    wrap.style.backgroundImage = `url(${param[0].imageUrl})`;　
};

//房圖Array建立
let imgUrlArray = (imgArray, param) => {
    for (let i = 0; i < param.length; i++) {
        imgArray.push(param[i].imageUrl);
    };
};

//切換背景及文字
let changeBg = (element, param) => {
    const wrap = document.querySelector(".wrap");
    const roomNum = document.querySelector(".roomNum>span");
    const roomName = document.querySelector(".roomName");
    element.addEventListener("mouseover", (event) => {
        const { target } = event;
        console.log(param[target.dataset.room].imageUrl);
        wrap.style.backgroundImage = `url(${param[target.dataset.room].imageUrl})`;
        roomNum.textContent = `0${parseInt(target.dataset.room)+1}`;
        roomName.textContent = `${param[target.dataset.room].name}`;
    });
};