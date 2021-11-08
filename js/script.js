let data = JSON.parse(`{
	"map": [
            {"id":"1", "country": "russia", "city": "Красноярск",  "office" : "КРАСНОЯРСК", "name": "Лягушкин Иван Сергеевич",
			"email": "username@flagstudio.ru", "phone":"+7922222222", "coordinates": "[56.021574, 92.851197]"},
            {"id":"2", "country": "russia", "city": "Первоуральск", "office": "ПЕРВОУРАЛЬСК", "name": "Чижевский Вячеслав Максимович",
			"email": "user2fd@flagstudio.ru","phone":"+7982152312", "coordinates": "[51.900277, 59.940770]"},
            {"id":"3", "country": "russia", "city": "Красноярск",  "office" : "КРАСНОЯРСК 2", "name": "Максим Максимович Максимов",
			"email": "santa@flagstudio.ru", "phone":"+79999999", "coordinates": "[56.023124, 92.815664]"},
            {"id":"4", "country": "russia", "city": "Екатеринбург",  "office" : "Новый Екатеринбург", "name": "Максим Максимович Максимов",
			"email": "santa@flagstudio.ru", "phone":"+79999999", "coordinates": "[56.826773, 60.608905]"},
            {"id":"5", "country": "belorussia", "city": "Брест",  "office" : "Брестский клуб", "name": "Николаев Николай Николаевич",
			"email": "username@flagstudio.ru", "phone":"6922222222", "coordinates": "[52.110163, 23.644509]"},
            {"id":"6", "country": "belorussia", "city": "Брест", "office": "Башня Брест", "name": "Потапов Потам Потапович",
			"email": "user2fd@flagstudio.ru","phone":"5982152312", "coordinates": "[52.109740, 23.682618]"},
            {"id":"7", "country": "belorussia", "city": "Брест",  "office" : "Дом Брест", "name": "Никитов Никит Никитич",
			"email": "santa@flagstudio.ru", "phone":"5179999999", "coordinates": "[52.130874, 23.737893]"},
            {"id":"8", "country": "belorussia", "city": "Брест",  "office" : "ГЛАВНЫЙ БРЕСТ", "name": "Рустамов Рустам Рустамыч",
			"email": "santa@flagstudio.ru", "phone":"69999999", "coordinates": "[52.094729, 23.773599]"}
            
        ]
    }`);

let dataMain = JSON.parse(data);
const dataLenght = Object.keys(dataMain.map).length;

let tabRussia = get.getElementById("tab__russia_js");
let tabBelorussia = get.getElementById("tab__belorussia_js");

tabRussia.onclick = function() {

};
tabBelorussia.onclick = function() {

};

function constructSpoiler() {
    for (let i = 0; i < dataMainLenght; i++) {
        if (dataMain.map[i].country === dataCountry) {
            let element = document.createElement("div");
            element.setAttribute('class', 'spoiler__element')
            info.innerHTML = `<div class='p-1' style='color: #253b62;'><strong>Офис ${dataMain.map[i].office}</strong></div>
                            <div class='p-2'>${dataMain.map[i].name}</div>
                            <div class='p-2'>${dataMain.map[i].phone} ${dataMain.map[i].phone}</div>
                            <div class='p-2' style='color: #61c3ed;'>${dataMain.map[i].email}</div>`;
            document
                .querySelector(`.elements[data-map="${dataMain.map[i].city}"]`)
                .appendChild(info);
        }
    }
}