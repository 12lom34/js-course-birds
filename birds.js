/**
 * Created by red8 on 2/4/2017.
 */

function print(arr)
{
    console.log(JSON.stringify(arr));
}

function getRndNumber()
{
    return Math.floor(Math.random() * 100);
}

function fillWithRndNumbers(shop, bird1, bird2, num) {
    shop.buy(bird1, 5, 10);
    shop.buy(bird2, 2, 4);

    for (var i = 0; i < num; i++) {
        var qty = getRndNumber();
        var qty = getRndNumber();
        (i % 2) ? shop.buy(bird1, 5, qty) : shop.buy(bird2, 2, qty);
    }
}

var shop = new BirdShop();
var owl = new Bird("owl",5);
var parrot = new Bird("parrot",2);

fillWithRndNumbers(shop, owl, parrot, 10);
shop.storageInfo();

////////////////////////////////////////////

function Bird(name, price, onStorage, sellQty) {
    this.name = name;
    this.price = price;
    this.onStorage = onStorage;
    this.sellQty = sellQty;
}

function BirdShop() {
    var storage = new Storage();
    var deals = {};

    this.changePrice = function (bird, newPrice) {
        storage[bird.name].price = newPrice;
    }

    this.sell = function (bird, qty) {
        storage[bird.name].onStorage -= qty;
        storage[bird.name].sellQty +=qty;
        deals.push(new Deal(bird, qty));
    }

    this.buy = function(bird, price, qty) {
        (bird.name in storage) ? storage.addToStorage(bird, price, qty) : storage.addNewToStorage(bird);
    }

    this.storageInfo = function() {
        for (p in storage) {
            console.log("Bird name : " + p + " with data :" + storage[p]);
        }
    }
}

function Deal(bird, sold) {

    this.id = generateId();
    this.bird = bird;
    this.sold = sold

    Deal.prototype.count = 0;

    function generateId() {
        ++Deal.prototype.count;
    }
}

function Storage() {
    var storage = {};

    this.addNewToStorage = function (bird) {
        storage[bird.name] = bird;
    }

    this.addToStorage = function (bird, qty, price) {
        storage[bird.name].onStorage += qty;
        if (price != undefined) {
            storage[bird.name].price = price;
        }
    }

    this.removeFromStorage = function (bird) {
        delete storage[bird.name];
    }
}