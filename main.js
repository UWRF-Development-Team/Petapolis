let money = 0;
let flowers = 0;
let gardenerCount = 0;

function buyGardener() {
    if (gardenerCount === 0) {
        window.setInterval(gardenersGardening, 1000);
    }

    //TODO: implement an actual cost once flowers are obtainable
    if (money >= 0) {
        gardenerCount++;
        document.querySelector("#gardenerBuy > h2").innerHTML = `gardener \n (${gardenerCount})`;
        money -= 0;
    } else {
        alert("You can't afford a gardener right now!");
    }
}

function gardenersGardening(){
    changeFlowers(gardenerCount);
    console.log(flowers);
}

function test(text) {
    alert(text);
}

// 1 to 1 conversion babyyyyy
function flowerToMoney() {
    changeMoney(flowers);
    changeFlowers(-flowers);
    console.log("$"+money);
}

//changes flower count by a given value
function changeFlowers(amount) {
    flowers += amount;
    document.getElementById("flower_display").innerHTML = "Flowers: " + flowers;
}

//changes money count by a given value
function changeMoney(amount) {
    money += amount;
    document.getElementById("money_display").innerHTML = "Money: " + money;
}