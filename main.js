let money = 0;
let flowers = 0;
let gardenerCount = 0;
let gardenerCost = 100;

function buyGardener() {
    if (gardenerCount === 0) {
        window.setInterval(gardenersGardening, 1000);
    }

    //TODO: implement an actual cost once flowers are obtainable
    if (money >= gardenerCost) {
        gardenerCount++;
        document.querySelector("#gardenerBuy > h2").innerHTML = `gardener \n (${gardenerCount})`;
        money -= gardenerCost;
        gardenerCost *= 1.25;
    } else {
        alert("You can't afford a gardener right now!");
    }
}

function gardenersGardening(){
    flowers += gardenerCount;
    console.log(flowers);
}

function test(text) {
    alert(text);
}

// 1 to 1 conversion babyyyyy
function flowerToMoney() {
    money += flowers;
    flowers = 0;
    console.log("$"+money);
}