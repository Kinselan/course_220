// 10 question


/// what will the console log to ? 
// is it how are you or i am fine ? and why ?

var a = 'how are you';

function bar() {
  console.log(this.a);
}

var obj = {
  a: 'i am fine',
  foo: bar
};

obj.foo(); 
// DONE


// it will log i am fine because the method bar is called with 
// the implicit context of obj.


// what will foo.bar() log ?
// what will qux() log ?


foo = {
  a: 1,
  bar: function() {
    console.log(this.baz());
  },
  baz: function() {
    return this;
  }
};

foo.bar();
var qux = foo.bar;
qux();

//foo.bar() will log out foo;
// qux() will throw an error because in the window object , 
// there is no baz function

// What will be logged ? 
// Why is it ?
// undefined is logged
// add function is called with the context of object2 
// but object2 doesn't have a properties 'a'

var object1 = {
  a: 0,
  add: function() {
    console.log(this.a);
  }
}

var object2 = {
  b: 3
}

var addition = object1.add;
addition.call(object2);


// How now?
// add function is called with the context of object1, regardless.

var object1 = {
  a: 0,
  add: function() {
    console.log(this.a);
  }
}

var object2 = {
  b: 3
}

var addition = object1.add.bind(object1);
addition.call(object2);


/*
what will this be logged to the console. Why?
describe two different method to deal with this.

*/

obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    function bar() {
      console.log(this.a + ' ' + this.b);
    }
    bar();
  }
};

obj.foo();        // undefined undefined


// method 1

obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    self = this;
    function bar() {
      console.log(self.a + ' ' + self.b);
    }
    bar();
  }
};

obj.foo();        // hello world

// method 2

obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    function bar() {
      console.log(this.a + ' ' + this.b);
    }
    bar.call(this);
  }
};

obj.foo();        // hello world




/*
  what will this log to the console ? why ?

  it logged 11 for 10 times.
  because the setTimeout is a synchronous function , it doesn't execute until
  all the code has finished executed. when the function is being called , lexical 
  scope takes effect and it will read i as 11.
*/

function delayLog() {
    for (var i = 1; i <= 10; i += 1) {
        setTimeout(function(){
            console.log(i);
        }, i * 1000);
    }
}
delayLog();


// what does the code log to the console ?
// it will log undefined because 'this' in baz method will refer to bar 

foo = {
  data: 1,
  bar: {
    baz: function() {
      console.log(this.data);
    }
  }
}

foo.bar.baz();


// how would you fixed the previous problem ?

foo.bar.baz.call(foo);


/* what will the following log ? 
*/

var a = 1;
var obj = {
  a: 2,
  func: function() {
    console.log(this.a);
  }
};

obj.func(); 
obj.func.call(); 
obj.func.call(this); 
obj.func(obj);   

var obj2 = { a: 3 };   
obj.func.call(obj2); 


/*
2 - context is obj
1.- context is window
1 - window
2 - obj get passed in as argument, but is ignored since func doesn't take argument
    However, the context is still obj
3 - obj2 is the context because of the call method.
*/



/* what will be logged and why? and how to fixed it */

var sales = {
  computer: 200,
  tax: 20,
  total: function() {
    function discount() {
      if (this.computer >= 200) {
        return 10;
      }
    }

    return this.computer + this.tax + discount.call(this);
  }
}
console.log(sales.total());

// discount is called with implicit object of window
// u need to pass in the context of sale 




// the function log can access number variable via closures.
// Please save the number variable into a separate variable.

function dataLogger() {
  var number = 10;       
  return function() {
    number += 3;        
    console.log(number);
  }
}

var log = dataLogger();
log(); // 13
log(); // 16



/* a written question

*/

// write a function that return a function . Explain your thought process
// it is used like below.

var list = makeList();
list();
// no item in the list

list('grocery');
// grocery is added

list('sugar');
// sugar is added

list();
// grocery
// sugar

// answer are like below

function makeList() {
  var collection = [];
  return function(item) {
    var position = collection.indexOf(item);

    if (item) {
      collection.push(item);
      console.log(item + ' is added.')
    } else {
      for (var i = 0; i < collection.length; i += 1) {
        console.log(collection[i]);
      }
    }
  }
}





/* write a function that has can take a function and a argument
and it could be called like below
*/

var logger = delayCall(console.log, 'The world is beautiful');

logger() // logs The world is beautiful.

// answer are below

function delayCall(fun, arg) {
  return function() {
    fun(arg);
  }
}


// write a function that is used like this

var john = new Person('John');
var joe = new Person('Joe');

john.greet(); // Hello John
joe.greet();  // Hello Joe


// answer
function Person(name) {
  this.name = name;
}


Person.prototype.greet = function() {
  console.log('Hello ' + this.name);
}

// two part question
// what will the first one log ? 

var Foo = function() {};
var Qux = function() {};

Foo.__proto__ === Foo.prototype;                // false
Object.getPrototypeOf(Foo) === Foo.prototype;   // false

// false because Foo's prototype is not Foo.prototype. It is 
// Function.prototype

var bar = new Foo();
Object.getPrototypeOf(bar) === Foo.prototype;   // true

// now bar's prototype is Foo.prototype



// what will the following log and why

var foo = {
  a: 'hello'
}

var bar = Object.create(foo);
bar.a = 'hi';

console.log(bar.a);

// it will log hi because javascript will search the property of a
// in the object bar first before going up the prototypal chain.
// the a in bar is overshadowing the a in foo.













