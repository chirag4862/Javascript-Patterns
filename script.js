// ==========Revealing Module Pattern===========
/*
// -*-*-*-*-*-*-*-Basic Structure-*-*-*-*-*-*-
(function () {
  // Declare private vars & functions
  return {
    // Declare public vars and functions that can access the above private values
  }
})();
*/

/*
// -*-*-*-*-*-Standard Module Pattern-*-*-*-*-*-
const UICtrl = (function () {
  let text = 'New World';

  const changeText = function(){
    const element = document.querySelector('h1');
    element.textContent = text;
  }

  return {
    callChangeText: function () {
      changeText();
      console.log(text);
    }
  }
})();
UICtrl.callChangeText();
*/

/*
// -*-*-*-*-*-Revealing Module Pattern-*-*-*-*-*-
const ItemCtrl = (function () {
  let data = [];

  function add(item){
    data.push(item);
    console.log("Item Added....");
  }

  function get(id) {
    return data.find(item => {
      return item.id === id;
    })
  }

  // this is revealing pattern as we are returning object literals that directly reveal the methods that are directly inside the module.
  return {
    add: add,
    get: get
  }
})();
ItemCtrl.add({id: 1, name: 'Chirag'});
ItemCtrl.add({id: 2, name: 'Vijay'});
console.log(ItemCtrl.get(1));
console.log(ItemCtrl.get(2));
*/

/*
// ==============SINGLETON PATTERN===============

const Singleton = (function(){
  let instance;

  function createInstance(){
    const object = new Object({name: 'Chirag'});
    return object;
  }

  return {
    getInstance: function(){
      if(!instance){
        instance = createInstance();
      }
      return instance;
    }
  }
})();

const instanceA = Singleton.getInstance();
const instanceB = Singleton.getInstance();

console.log(instanceA === instanceB);
*/

/*
// ==============FACTORY PATTERN================
function MemberFactory() {
  this.createMember = function(name, type){
    let member;

    if(type === 'simple'){
      member = new SimpleMembership(name);
    }
    else if (type === 'standard') {
      member = new StandardMembership(name);
    }
    else if (type === 'super'){
      member = new SuperMembership(name);
    }

    member.type = type;

    member.define = function() {
      console.log(`${this.name} (${this.type}):${this.cost}`);
    }

    return member;
  }
}

const SimpleMembership = function(name) {
  this.name = name;
  this. cost = '$5';
}
const StandardMembership = function(name) {
  this.name = name;
  this. cost = '$10';
}
const SuperMembership = function(name) {
  this.name = name;
  this. cost = '$15';
}

const members = [];
const factory = new MemberFactory();

members.push(factory.createMember('Chirag','simple'));
members.push(factory.createMember('Rama','standard'));
members.push(factory.createMember('Raj','super'));

members.forEach( function(member){
  member.define();
});
*/

// ==============OBSERVER PATTERN=================
/*
class EventObserver{
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
    console.log(`You Subscribed to ${fn.name}`);
  }

  unsubscribe(fn) {
    // Filter out from list whatever matches the callback function. If there is no match, the callback gets to stay on the list. The filter returns a new list and reassigns the list of observers.
    this.observers = this.observers.filter(function(item){
      if(item !== fn){
        return item;
      }
    }); 
    console.log(`You UnSubscribed from ${fn.name}`);
  }

  fire() {
    this.observers.forEach(function (item){
      item.call();
      });
  }
}

const click = new EventObserver();
// Event Listeners
document.querySelector('.sub-ms').addEventListener('click', function(){
  click.subscribe(getCurMilliseconds);
});

document.querySelector('.unsub-ms').addEventListener('click', function(){
  click.unsubscribe(getCurMilliseconds);
});

document.querySelector('.fire').addEventListener('click', function(){
  click.fire();
});

// Click Handler
const getCurMilliseconds = function () {
  console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`)
}
*/

// ==============MEDIATOR PATTERN===============

const User = function(name) {
  this.name = name;
  this.chatroom = null;
}

User.prototype = {
  send: function(message, to) {
    this.chatroom.send(message, this, to);
  },
  recieve: function(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
}

const Chatroom = function() {
  let users = {}; // List of users

  return {
    register: function(user) {
      users[user.name] = user;
      user.chatroom = this;
    },
    send: function(message, from, to) {
      if(to) {
        // Single user message
        to.recieve(message, from);
      } else {
        // Mass message
        for(key in users) {
          if(users[key] !== from) {
            users[key].recieve(message, from);
          }
        }
      }
    }
  }
}
// User creation
const chirag = new User('Chirag');
const rama = new User('Rama');
const ankit = new User('Ankit');
// Chatroom Creation
const chatroom = new Chatroom();
// Register our users
chatroom.register(chirag);
chatroom.register(rama);
chatroom.register(ankit);

// Send Message
chirag.send('Hello Rama', rama);
rama.send('Hello Bhaiya', chirag);
ankit.send('Hello',);



// ==============STRATEGY DESIGN PATTERN===============
/*
// Delivery services
function Fedex() {
  this.calculate = package=> {
    // fedex calculations....
    return 100;
  }
}
function ECart() {
  this.calculate = package=> {
    // ECart calculations....
    return 150;
  }
}
function Zpost() {
  this.calculate = package=> {
    // Zpost calculations....
    return 250;
  }
}

// context
function Shipping() {
  this.company = ""
  this.setStrategy = (company)=> {
    this.company = company;
  }
  this.calculate = package=>{
    return this.company.calculate(package)
  }
}

// Istances
const fedex = new Fedex();
const ecart = new ECart();
const zpost = new Zpost();
const package = {from: 'Mumbai', to: 'Kolkata', weight: 1.56};

// strategy pattern
const shipping = new Shipping();
shipping.setStrategy(fedex)
console.log(shipping.calculate(package))
*/

// ==============ITERATOR DESIGN PATTERN===============
/*
const items = [1, "chirg", false, 1.24]
// iterator
function Iterator(items) {
  this.items = items
  this.index = 0
}

// method for iterator
Iterator.prototype = {
  // ***checks if there is a next element
  hasNext: function() {
    return this.index < this.items.length;
  },
  // ***return the nxt element
  next: function(){
    return this.items[this.index++];
  }
}

// instance of our iterator
const iter = new Iterator(items);
while(iter.hasNext()) {
  console.log(iter.next());
}
*/

// ==============PROXY DESIGN PATTERN===============
/*
// External API Service
function CryptoAPI() {
  this.getValue = function(coin) {
    console.log("calling the external API...");
    switch(coin) {
      case "Bitcoin":
        return 8500
      case "Dogecoin":
        return 500
      case "Ethereum":
        return 1750
    }
  }
}

// Front part

//////////////////////////////////////////////
// calling the api again and again creates problem
// const api = new CryptoAPI();
// console.log(api.getValue("Bitcoin"))
// console.log(api.getValue("Dogecoin"))
// console.log(api.getValue("Ethereum"))
//////////////////////////////////////////////

// Proxy - so that if we already have the data in cache we don't call the API
function CryptoProxy() {
  this.api = new CryptoAPI();
  this.cache = {}

  this.getValue = function(coin) {
    if(this.cache[coin] == null) {
      this.cache[coin] = this.api.getValue(coin);
    }
    return this.cache[coin];
  }
}
const proxy = new CryptoProxy();
console.log(proxy.getValue("Bitcoin"));
console.log(proxy.getValue("Bitcoin"));
console.log(proxy.getValue("Dogecoin"));
*/


// ==============PROXY DESIGN PATTERN===============
/*
function Employee(name, salary) {
  this.name = name
  this.salary = salary
}
Employee.prototype ={
  getSalary: function() {
    return this.salary;
  },
  setSalary: function(sal) {
    this.salary = sal;
  },
  accept: function(visitorFunction) {
    visitorFunction(this);
  }
}
//////////////////////////////////////
const chirag = new Employee("Chirag", 50000)
console.log(chirag.getSalary());

// visitor function
function ExtraSalary(emp) {
  emp.setSalary(emp.getSalary() * 2);
}
chirag.accept(ExtraSalary);
console.log(chirag.getSalary());
*/