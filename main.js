class Producer {
    /**
    buyCost is the amount it cost, in dollars, to buy the next producer
    multiplierCost is the amount it cost, in dollars, to buy the next multiplier upgrade
    costScaling is how quickly buyCost and multiplierCost increase
    It is currently a fixed value, but I think we should change it to scale exponentially in the future
    multiplierScaling is how quickly the multiplier grows
    not sure if this is needed, but I thought it should be included just in case
    baseProduction is how much the producer produces per producer before the multiplier
    */

    constructor(buyCost, multiplierCost, costScaling, multiplierScaling, baseProduction, multiplier, amount) {
        this.buyCost = buyCost;
        this.multiplierCost = multiplierCost;
        this.costScaling = costScaling;
        this.multiplierScaling = multiplierScaling;
        this.baseProduction = baseProduction;
        this.multiplier = multiplier;
        this.amount = amount;
    }

    // used to buy a new producer
    buy() {
        if (money >= this.buyCost) {
            addMoney(-this.buyCost);
            this.buyCost = Math.round(this.buyCost * this.costScaling);
            this.amount++;
            return true;
        } else {
            return false;
        }
    }

    // this buys an increase to the multiplier
    upgrade() {
        if (money >= this.multiplierCost) {
            addMoney(-this.multiplierCost);
            this.multiplierCost = Math.round(this.multiplierCost * this.costScaling);
            this.multiplier *= this.multiplierScaling;
            return true;
        } else {
            return false;
        }
    }

    // returns the amount of producers owned
    getAmount() {
        return this.amount;
    }

    // returns how much it cost to buy the next producer
    getBuyCost() {
        return this.buyCost;
    }

    // returns how much is cost to increase the multiplier again
    getMultiplierCost() {
        return this.multiplierCost;
    }

    // increases flowers based on # of producers, their base production, and the multiplier
    harvest() {
        addFlowers(Math.round(this.amount * this.baseProduction * this.multiplier));
    }
}

let money = 0;
let flowers = 0;
let gardener = new Producer(50, 50, 1.2, 1.2, 1, 1, 0);
let prestigeCount = 0;
let latitude;
let longitude;
APIKey = getAPIKey();
let currentWeather;
getCurrentWeather();

//buys a gardener
function buyGardener() {
    if (gardener.buy()) {
        if (gardener.getAmount() === 1) {
            window.setInterval(() => gardener.harvest(), 1000);
        }
        refreshGardenerShop();
    } else {
        alert("You can't afford a gardener right now!");
    }
}

function refreshGardenerShop() {
    document.querySelector("#gardenerBuy > h2").innerHTML = `gardener \n (${gardener.getAmount()})`;
    document.querySelector("#gardenerBuy > #count").innerHTML = `(${gardener.getAmount()})`;
    document.querySelector("#gardenerBuy > #cost").innerHTML = '$'+`${gardener.getBuyCost()}`;
}

function increaseMultiplier(multiplier) {
    switch (multiplier) {
        case 'gardener':
            if (gardener.upgrade()) {
                return;
            } else {
                alert("You can't afford a gardener upgrade.");
            }
            break;
    }
}

// 1 to 1 conversion babyyyyy
function flowerToMoney() {
    addMoney(flowers);
    addFlowers(-flowers);
    console.log("$"+money);
}

function setFlowers(amount) {
    flowers = amount;
    document.getElementById("flower_display").innerHTML = "Flowers: " + flowers;
}

//increases flower count by a given value
function addFlowers(amount) {
    flowers += amount;
    document.getElementById("flower_display").innerHTML = "Flowers: " + flowers;
}

function setMoney(amount) {
    money = amount;
    document.getElementById("dollar_display").innerHTML = "Money: " + money;
}

//increases money count by a given value
function addMoney(amount) {
    money += amount;
    document.getElementById("dollar_display").innerHTML = "Money: " + money;
}

//resets game state
function prestige() {
    setMoney(0);
    setFlowers(0);
    gardener = new Producer(50, 50, 1.2, 1.2, 1, 1, 0);
    refreshGardenerShop();
    prestigeCount += 1;
    alert("You are now prestige " + prestigeCount + "!");
}

async function getCurrentWeather() {
    getCurrentLocation();
    const response = await fetch("http://api.weatherapi.com/v1/current.json", {
        headers: {
            "key": APIKey,
            "q": `${latitude},${longitude}`,
        },
        body: JSON.stringify({ condition:text }),
    })
    console.log("Hello world!")
}

function getCurrentLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function success(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log("Latitude: " + position.coords.latitude +
                   "\nLongitude: " + position.coords.longitude)
}

function error() {
    latitude = 44.8523405;
    longitude = -92.6233659;
    alert("Sorry, no location given resorting to a default location.");
}


