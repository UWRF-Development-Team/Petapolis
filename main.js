class Producer {
    constructor(buyCost, multiplierCost, costScaling, multiplierScaling, baseProduction, amount, multiplier) {
        this.buyCost = buyCost;
        this.multiplier = multiplierCost;
        this.costScaling = costScaling;
        this.multiplierScaling = multiplierScaling;
        this.baseProduction = baseProduction;
        this.amount = amount;
        this.multiplier = multiplier;
    }

    buy() {
        if (money >= this.buyCost) {
            money -= this.buyCost;
            this.buyCost *= this.costScaling;
            this.amount++;
            return true;
        } else {
            return false;
        }
    }

    upgrade() {
        if (money >= this.multiplierCost) {
            money -= this.multiplierCost;
            this.upgradeCost *= this.costScaling;
            this.multiplier *= this.multiplierScaling;
            return true;
        } else {
            return false;
        }
    }

    getAmount() {
        return this.amount;
    }
    
    harvest() {
        flowers += this.amount * this.baseProduction * this.multiplier;
    }
}


let money = 0;
let flowers = 0;
let gardener = new Producer(50, 50, 1.2, 1.2, 1, 1, 1);

function buyGardener() {
    if (gardener.getAmount() === 0) {
        window.setInterval(gardenersGardening, 1000);
    }

    //TODO: implement an actual cost once flowers are obtainable
    if (gardener.buy()) {
        document.querySelector("#gardenerBuy > h2").innerHTML = `gardener \n (${gardener.getAmount()})`;
    } else {
        alert("You can't afford a gardener right now!");
    }
}

function increaseMultiplier(multiplier) {
    // if you want to add anothe
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


function gardenersGardening(){
    gardener.harvest();
    console.log(flowers);
}

function test(text) {
    window.setInterval(gardenersGardening, 1000);
    document.querySelector("#gardenerBuy > h2").innerHTML = `gardener \n (${gardener.getAmount()})`;
    console.log(flowers);
}

// 1 to 1 conversion babyyyyy
function flowerToMoney() {
    money += flowers;
    flowers = 0;
    console.log("$"+money);
}
