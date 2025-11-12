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

    constructor(buyCost, multiplierCost, costScaling, multiplierScaling, baseProduction, multiplier, amount, name) {
        this.buyCost = buyCost;
        this.multiplierCost = multiplierCost;
        this.costScaling = costScaling;
        this.multiplierScaling = multiplierScaling;
        this.baseProduction = baseProduction;
        this.multiplier = multiplier;
        this.amount = amount;
        this.name = name;
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

    checkGrey() {
        if (money < this.getBuyCost())
            $(`#${this.name}Buy`).addClass("grey");
        else
            $(`#${this.name}Buy`).removeClass("grey");
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
        $("#flower_display").html("Flowers: " + this.amount);
    }

    addFlowerAmount(addAmount){
        this.amount += addAmount;
        $("#flower_display").html("Flowers: " + this.amount);
    }

    getFlowerName() {
        return this.name
    }

    getBasePrice() {
        return this.basePrice
    }

}

let money = 0;
let trowel = new Producer(50, 10000000000, 1.2, 1.2, 1, 1, 1, "trowel");
let Dandelion = new flower("Dandelion", 0, 12 );
let gardener = new Producer(50, 50, 1.2, 1.2, 1, 1, 0, "gardener");
let prestigeCount = 0;
let urlParams = new URLSearchParams(window.location.search)

// maybe we could get a list of settings info.
// for now its just this one thing but once/if we have others, I think it'd be a good idea
let autoConverterID;

if(urlParams.has('back')) {
    restoreValues();
}


// checks if the loop is going.
// if not then the loop is started, its id is saved, and the button is turned pink
// if it is going then the loop is turned off with the id saved before and the button is turned grey
function autoConvert() {
    $("#autoconvert").toggleClass("grey")
   if(!$("#autoconvert").hasClass("grey")) {
       autoConverterID = window.setInterval(() => flowerToMoney(false), 1000);
   } else {
       window.clearInterval(autoConverterID);
   }
}

// takes the name of the producer and changes the cost and count in the html file
function refreshShop(producer) {
    switch (producer) {
        case 'gardener':
            console.log("Hello");
            $("#gardenerCount").html(`(${gardener.getAmount()})`);
            $("#gardenerCost").html('$'+`${gardener.getBuyCost()}`);
            break;
        case 'trowel':
            $("#trowelBuy > #trowelCount").html(`(${trowel.getAmount()})`);
            $("#trowelBuy > #trowelCost").html('$'+`${trowel.getBuyCost()}`);
            break;
    }
}

function checkCosts() {
    trowel.checkGrey();
    gardener.checkGrey();

    if (money < 1000000)
        $("#prestigeBuy").addClass("grey");
    else
        $("#prestigeBuy").removeClass("grey");
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
                $("#gardenerBuy").addClass('shake');
                $("#gardenerBuy").one('animationend', () => {
                    $("#gardenerBuy").removeClass('shake')
                });
            }
            break;
        case 'trowel':
            if (trowel.buy()) {
                refreshShop('trowel');
            } else {
                $("#trowelBuy").addClass('shake');
                $("#trowelBuy").one('animationend', () => {
                    $("#trowelBuy").removeClass('shake')
                });
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

$("#saleInput").on("keydown", function(event) {
    saleMaker(event)
});


function showSaleDiv(e) {
    e.stopPropagation();
    $("#saleDiv").removeClass("hidden");
    $(".shadow:first").removeClass("hidden");
    $("#saleInput").focus();
}

function saleMaker(e) {
    const saleInput = $("#saleInput");
    const saleDiv = $("#saleDiv");
    const saleShadow = $(".shadow:first");
    if (e.key === "Escape") {
        hideSale(saleDiv, saleInput, saleShadow);
    }
    if (e.key !== "Enter") {
        return;
    }
    if (isNaN(saleInput.val())) {
        return;
    }
    if (saleInput.val() === "") {
        hideSale(saleDiv, saleInput, saleShadow);
        return;
    }
    const flowerAmount = parseInt(saleInput.val());
    if (flowerAmount > Dandelion.amount || flowerAmount < 0) {
        return;
    }
    hideSale(saleDiv, saleInput, saleShadow);

    flowerAmountToMoney(flowerAmount);
}

function hideSale(div, input, shadow) {
    div.addClass("hidden");
    shadow.addClass("hidden");
    input.val('')
}

function flowerAmountToMoney(flowerAmount) {
    addMoney(flowerAmount * Dandelion.getBasePrice());
    Dandelion.addFlowerAmount(-flowerAmount);
}

// 1 to 1 conversion babyyyyy, plus a little extra
function flowerToMoney(fromOnClick, event) {
    if (fromOnClick)
        event.stopPropagation();
    addMoney(Dandelion.getFlowerAmount() * Dandelion.getBasePrice());
    Dandelion.setFlowerAmount(0);
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
    $("#dollar_display").html("Money: " + money);
}

//increases money count by a given value
function addMoney(amount) {
    money += amount;
    checkCosts();
    $("#dollar_display").html("Money: " + money);
}

//resets game state
function prestige() {
    if (money < 1000000) {
        const prestigeButton = $("#prestigeBuy")
        prestigeButton.addClass('shake');
        prestigeButton.on('animationend', () => {
            prestigeButton.removeClass('shake')
        }, {once: true});
        return;
    } else {
        setMoney(0);
        Dandelion.setFlowerAmount(0);
        gardener = new Producer(50, 50, 1.2, 1.2, 1, 1, 0);
        trowel = new Producer(50, 10000000000, 1.2, 1.2, 1, 1, 2);
        refreshShop('gardener');
        refreshShop('trowel');
        prestigeCount += 1;
        $("#prestigeCount").html("(" + prestigeCount + ")");
        $("#prestigeCost").html(1000000 * prestigeCount);
        $("#prestigeBuy").addClass('grey')
    }
}

function storeValues(){
    sessionStorage.money = money;
    sessionStorage.prestigeCount = prestigeCount;
    sessionStorage.flowers = Dandelion.getFlowerAmount();
    sessionStorage.trowelAmount = trowel.getAmount();
    sessionStorage.trowelBuyCost = trowel.getBuyCost();
    sessionStorage.gardenerAmount = gardener.getAmount();
    sessionStorage.gardenerBuyCost = gardener.getBuyCost();
}

function restoreValues() {
    setMoney(Number(sessionStorage.money));
    prestigeCount = Number(sessionStorage.prestigeCount);
    Dandelion.setFlowerAmount(Number(sessionStorage.flowers));
    trowel.amount = sessionStorage.trowelAmount;
    trowel.buyCost = sessionStorage.trowelBuyCost;
    gardener.amount = sessionStorage.gardenerAmount;
    gardener.buyCost = sessionStorage.gardenerBuyCost;
    refreshShop('trowel');
    refreshShop('gardener');
    if(gardener.amount !== 0) {
        window.setInterval(() => gardener.harvest(), 1000);
    }
}
