class Producer {
    /**
    buyCost is the amount it cost, in dollars, to buy the next producer
    multiplierCost is the amount it cost, in dollars, to buy the next multiplier upgrade
    `costScaling is how quickly buyCost and multiplierCost increase
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
        Dandelion.addFlowerAmount(Math.round(this.amount * this.baseProduction * this.multiplier));
    }
}

class flower {
    /**
     name might be redundant based on use.
     amount how many you have.
     basePrice base price of the flower
     demand and rarity aren't needed now but could be useful for stock_exchange in the future.
     priceScaling could be used to increase price could be used for return upgrades.
     */

    constructor(name, amount, basePrice) {
        this.name = name;
        this.amount = amount;
        this.basePrice = basePrice;
        // this.priceScaling = priceScaling;
        // this.demand = demand;
        // this.rarity = rarity;
    }

    getFlowerAmount() {
        return this.amount;

    }

    setFlowerAmount(newAmount){
        this.amount = newAmount
        document.getElementById("flower_display").innerHTML = "Flowers: " + this.amount;
    }

    addFlowerAmount(addAmount){
        this.amount += addAmount;
        document.getElementById("flower_display").innerHTML = "Flowers: " + this.amount;
    }

    getFlowerName() {
        return this.name
    }

    getBasePrice() {
        return this.basePrice
    }

}

let money = 0;
let trowel = new Producer(50, 10000000000, 1.2, 1.2, 1, 1, 1);
let Dandelion = new flower("Dandelion", 0, 12 );
let gardener = new Producer(50, 50, 1.2, 1.2, 1, 1, 0);
let prestigeCount = 0;

// takes the name of the producer and changes the cost and count in the html file
function refreshShop(producer) {
    switch (producer) {
        case 'gardener':
            document.querySelector("#gardenerBuy > #gardenerCount").innerHTML = `(${gardener.getAmount()})`;
            document.querySelector("#gardenerBuy > #gardenerCost").innerHTML = '$'+`${gardener.getBuyCost()}`;
            break;
        case 'trowel':
            document.querySelector("#trowelBuy > #trowelCount").innerHTML = `(${trowel.getAmount()})`;
            document.querySelector("#trowelBuy > #trowelCost").innerHTML = '$'+`${trowel.getBuyCost()}`;
            break;
    }
}

function checkCosts() {
    // TODO refactor All of this with oop because oh my god this is maybe my worst code ever
    if (money < trowel.getBuyCost())
        document.querySelector("#trowelBuy").classList.add("grey");
    else
        document.querySelector("#trowelBuy").classList.remove("grey");

    if (money < gardener.getBuyCost())
        document.querySelector("#gardenerBuy").classList.add("grey");
    else
        document.querySelector("#gardenerBuy").classList.remove("grey");

    if (money < 1000000)
        document.querySelector("#prestigeBuy").classList.add("grey");
    else
        document.querySelector("#prestigeBuy").classList.remove("grey");
}

// takes the name of the producer and buys one
function buy(producer) {
    switch (producer) {
        case 'gardener':
            if (gardener.buy()) {
                if (gardener.getAmount() === 1) {
                    window.setInterval(() => gardener.harvest(), 1000);
                }
                refreshShop('gardener');
            } else {
                // TODO refactor Later cuz what the hell was i thinking here
                document.querySelector("#gardenerBuy").classList.add('shake');
                document.querySelector("#gardenerBuy").addEventListener('animationend', () => {
                    document.querySelector("#gardenerBuy").classList.remove('shake')
                }, { once: true });
            }
            break;
        case 'trowel':
            if (trowel.buy()) {
                refreshShop('trowel');
            } else {
                document.querySelector("#trowelBuy").classList.add('shake');
                document.querySelector("#trowelBuy").addEventListener('animationend', () => {
                    document.querySelector("#trowelBuy").classList.remove('shake')
                }, { once: true });
            }
            break;
    }
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

// 1 to 1 conversion babyyyyy, plus a little extra
function flowerToMoney() {
    addMoney(Dandelion.getFlowerAmount() * Dandelion.getBasePrice());
    Dandelion.setFlowerAmount(0);
    console.log("$"+money);
}

// function setFlowers(amount) {
//     flowers = amount;
//     document.getElementById("flower_display").innerHTML = "Flowers: " + flowers;
// }

//increases flower count by a given value
// function addFlowers(amount) {
//     flowers += amount;
//     document.getElementById("flower_display").innerHTML = "Flowers: " + flowers;
// }

function setMoney(amount) {
    money = amount;
    document.getElementById("dollar_display").innerHTML = "Money: " + money;
}

//increases money count by a given value
function addMoney(amount) {
    money += amount;
    checkCosts();
    document.getElementById("dollar_display").innerHTML = "Money: " + money;
}

//resets game state
function prestige() {
    console.log(Dandelion.getFlowerAmount());
    if (Dandelion.getFlowerAmount() < 1000000) {
        alert("You can't prestige!! Reach 1,000,000 flowers to prestige.");
        if (money < 1000000) {
            document.querySelector("#prestigeBuy").classList.add('shake');
            document.querySelector("#prestigeBuy").addEventListener('animationend', () => {
                document.querySelector("#prestigeBuy").classList.remove('shake')
            }, {once: true});
            return;
        }
        setMoney(0);
        Dandelion.setFlowerAmount(0);
        gardener = new Producer(50, 50, 1.2, 1.2, 1, 1, 0);
        trowel = new Producer(50, 10000000000, 1.2, 1.2, 1, 1, 2);
        refreshShop('gardener');
        refreshShop('trowel');
        prestigeCount += 1;
        alert("You are now prestige " + prestigeCount + "!");
    }

}
