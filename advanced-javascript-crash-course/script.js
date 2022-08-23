// Function Scope

/* In JavaScript, it is possible to define a function within a function.

Lexical Scoping describes how JavaScript resovles variable names when functions are nested.

When we have nested fucntions, JavaScript variable lookup begins at the inner-most function and moves outward until it reaches the global scope.

The main takeaway is that nested functions have access to variables in their own scope as well as access to variables in the outer scope. */

// Nested Functions

/* let a = 10

function outer() {
  let b = 20
  function inner() {
    let c = 30
    console.log(a, b, c)
  }
  inner()
}
outer() */ // 10 20 30

// JS checks to see if 'c' is defined in the inner function, next it looks for 'b'. It looks to see if 'b' is defined in the inner function. It is not, so JS goes one level up and checks in the 'outer' fuction scope. It is and it's value is 20, so 20 is logged in the terminal. Next, JS checks if 'a' is present in the 'inner' function scope. It is not, so it checks to see if it is in the 'outer' function scope. It still is not, so JS goes to the next level up, to the global scope. It checks again, and the variable is present in the global scope, so it logs the value to the console. This is called: Lexical Scoping, which describes how JavaScript resovles variable names when functions are nested.

// Closures

/* According to [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures), a closure is the combination of a function bundled together with references to its surrounding state. Closures are created everytime a function is created, at function creation time.

This definition doesn't really help someone understand what closure is.... How about:

In JavaScript, when we return a function from another function, we are effectively returning a combination of the function definition along with the function's scope. This would let the funciton definition have an associated persistent memory which could hold on to live data between executions. This combination of the function and its scope chain is what is called closure in JavaScript. */

/* function outer() {
  let counter = 0
  function inner() {
    counter++
    console.log(counter)
  }
  inner()
}
outer() // 1
outer() // 1 1 */

// When the variable 'counter' is encounted, the JS engine checks to see if 'counter' is present in the 'inner' function scope. It is not, so it checks the 'outer' function scope. The variable is present and it increments the value by '1' and logs the new value to the terminal, which is '1'. If we invoke the function twice, a temporary memory is established and we have a new counter variable initialized to '0' and then incrememented. Hence, every outer function call will always print '1' to the console.

// In JavaScript, it is possible to return a function from other functions.

// Let's say we don't necessarily want to invoke the inner function right away, instead we want to 'return' the function and invoke it at a later point in time. In JavaScript, it is possible to return a function from other functions. In returning the function, we can assign the result of invoking out the function to a variable, that we'll call 'fn'. So, const fn = outer(). All we are doing is, instead of executing the inner function from within the outer function, we are returning it and then invoking the function twice.

/* function outer() {
  let counter = 0
  function inner() {
    counter++
    console.log(counter)
  }
  return inner
}
const fn = outer()

//invoking the 'fn' function twice
fn()
fn() */

// logs: 1 2
//This is because of the concept of Closures in JavaScript. In such a scenario, JavaScript doesn't just return the 'inner' function. It returns the 'inner' function as well as its scope. In this example the function scope has just one variable, 'counter' initialized as '0'. So, we have the function 'inner' bundled together with the variable 'counter' which is together termed as a Closure. In such situations, the function will persist, or remember, the value of the variable 'counte'. So, when we invoked the 'fn' function the first time, the function 'outer' incremented the counter by '1'. The outer function remembers that 'counter' is now '1', so the next time we invoke the 'fn' function, it processes it as 1+1.

// The key pojnt to keep in mind is that, in closures, an inner function has access to variables in the outer function scope, even after the outer function has finished execution.

// Function Currying

/* Currying is a process in functional programming in which we transform a function with multiple arguments into a sequence of nesting functions that take one argument at a time

ex. function f(a,b,c) is transformed into f(a)(b)(c)

Currying doesn't call a function, it simply transforms it.

Currying is used to compose reusable functions and makes composing new functions very easy. */

/* function sum(a, b, c) {
  return a + b + c
} */
// console.log(sum(2, 3, 5)) // 10

// Currying this sum function means that we need to transform 'sum' from calling it with all three argumnets to calling it with one argument at a time.

// Need to transform (sum(2, 3, 5) into sum(2)(3)(4)

// The way we do this is by nesting functions, where each function takes one argument at a time

/* We start off with a function called curry. This function will accept a functiona as its argument and return a curried version of the function. For each of the three arguments, we return individual functions which accept one argument at a time. The functions are nested one at a time.*/

/* From the innermost function, we return the actual passed in function with all of the necessary arguments. */

/* function sum(a, b, c) {
  return a + b + c
}

function curry(fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c)
      }
    }
  }
}

const curriedSum = curry(sum)
console.log(curriedSum(2)(3)(5)) // 10

const add2 = curriedSum(2)
const add3 = add2(3)
const add5 = add3(5)
console.log(add5) // 10 */

/* The three parenthesis can be broken down into three different function calls. The first const accepts the first argument, the second accepts the second argument, and the third const accepts the third argument. We are accepting the sum of all three arguments, then returning the result. console.log(add5) is just accepting add5 instead of actually invoking add5 */

// this

/* The JavaScript 'this' keyword which is used in a function, refers to the object it belongs to.

It makes functions reusable by letting you decide the object value.

This value is determined entirely by how a function is called. */

/* function sayMyName(name) {
  console.log(`My name is ${name}`)
}

sayMyName('King Kong') */

/*  You can determine the value of 'this' keyword by how a function is called.

There are four ways to invoke a function in JavaScirpt and determine the value of 'this' keyword.

1. Implicit binding
2. Explicit binding
3. New binding
4. Default binding
*/

// 1. Implicit Binding

/* const person = {
  name: 'Charlie Chaplin',
  sayMyName: function () {
    console.log(`My name is ${this.name}`)
  },
}

person.sayMyName() // My name is Charlie Chaplin */

/* The implicit binding rule states that when a funciton is invoked with the 'dot' notation, the object to the left of the dot is what this keyword is referencing. In the above example, JavaScript treats 'this.name' as 'person.name', which is equal to the string 'Justin' and the output  */

// 2. Explicit Binding

/* In JS, every function has a built in method called 'call' which allows you to specify the context with which a function is invoked.*/

/* const person = {
  name: 'Bill Clinton',
  sayMyName: function () {
    console.log(`My name is ${this.name}`)
  },
}

function sayMyName() {
  console.log(`My name is ${this.name}`)
}

sayMyName.call(person) */

// We have explicitly specified the context when the function is called.

/* The first argument passed to call is what the 'this' keyword inside sayMyName is referencing. */

// 3. 'new' Binding

/* In this scenario, the function is invoked with the 'this' keywrod referncing an empty object. We can now create multiple people, passing in different names each time */

/*  JavaScript under the hood will create a new empty object that the 'this' keyword will reference.*/

/* function Person(name) {
  // this is = {}
  this.name = name
}

// Constructor function
const p1 = new Person('Justin')
const p2 = new Person('Batman')

console.log(p1.name, p2.name) */

// 4. Default Binding

//This is the fallback binding if none of the other three rules are met
/* function sayMyName() {
  console.log(`My name is ${this.name}`)
}

function Person(name) {
  // this is = {}
  this.name = name
}

// Constructor function
const p1 = new Person('Justin')
const p2 = new Person('Batman')

sayMyName() // My name is undefined. */

/* None of the three rules are sitisfied, so JavaScript will default to the global scope and set the 'this' keyword to the global object. In the global scope, JS will try to find a variable called 'name'. Since it doesn't find it, this.name is undefined. */

/* Order of Precedence For Binding

1 - New Binding
2 - Explicit Binding
3 - Implicit Binding
4 - Default Binding */

// Prototype

/* In JavaScript, every function has a property called 'prototype' that points to an object. We can make use of that protoyype object to determine all of our shareale properties.*/

/* function Person(fName, lName) {
  this.firstName = fName
  this.lastName = lName
}

// Constructor function
const person1 = new Person('Bruce ', 'Wayne')
const person2 = new Person('Clark ', 'Kent')
// Instead of : person1.getFullName = function (), to create a prototype, we use:
Person.prototype.getFullName = function () {
  return this.firstName + '' + this.lastName
}

console.log(person1.getFullName())
console.log(person2.getFullName()) */

// Prototypal Inheritance

/* One use of 'prototype' is the share properties and methods across instances. Another use is prototypal inheritance. */

/* function Person(fName, lName) {
  this.firstName = fName
  this.lastName = lName
}

Person.prototype.getFullName = function () {
  return this.firstName + ' ' + this.lastName
}

function SuperHero(fName, lName) {
  //this = {}
  Person.call(this, fName, lName)
  this.isSuperHero = true
}
SuperHero.prototype.fightCrime = function () {
  console.log('Fighting crime')
}
SuperHero.prototype = Object.create(Person.prototype)

const batman = new SuperHero('Bruce ', 'Wayne')
console.log(batman.getFullName()) // Bruce Wayne
SuperHero.prototype.constructor = SuperHero */

/* Initially, Batman only has acces to  'isSuperHero' and 'fightcrime'. To inherit 'firstName' and 'lastName', modify the SuperHero function to accept the paramters, 'fName' and 'lName'. Then, add a 'call method' that specifies where 'this' points to. So, 'this' in Person now refers to 'this' in SuperHero. fName and lName and get assigned the firstName and lastName properties, and are inherited by the SuperHero function.

To inhereit the getFullName method, we used Object.create, which is a method which will delegate to another object on failed lookups. So, SuperHero.prototype is equal to Object.create and we pass in a Person.prototype. When you try to access batman.getFullName, JavaScript checks the prototype object of SuperHero. It doesn't find it. However, it sees that the prototype object has a chain to Person.prototype. Because of the Object.create method, it checks to see if Person.prototype has a getFullName method. It does and will execute that method. This is how the method is inherited through the prototype chain. Hence the name, prototypal inheritance.

Now, we can modify the SuperHero instance of batman, input first and last name, and then console log batman.getFullName(). batman SuperHero has inherited getFullName from Person. The method will access this.firstName and this.lastName, which are inherited by the SuperHero function.

The last thing you need to do is to ensure SuperHero.prototype.constructor is equal to SuperHero. Otherwise, JavaScript thinks that a 'SuperHero' is created from 'Person', which is incorrect. SuperHero inherits properties and methods From 'Person'
 */

// Class

/* 
To recreate the code from Prototypal inheritance, first the Person function becomes class Person. Next, the initialization of the name arguments gets moved into a constructor that accepts 'fName' and 'lName'.
*/

/* class Person {
  constructor(fName, lName) {
    this.firstName = fName
    this.lastName = lName
  }
  //Lastly, change all the methods on the prototype object to be rewritten as methods within the class.
  sayMyName() {
    return this.firstName + ' ' + this.lastName
  }
}
// You can now create different instances of the Person.
const classP1 = new Person('Bruce', 'Wayne')
console.log(classP1.sayMyName()) // Bruce Wayne

// We can create an instance and access the properties and methods like before. Nothing changes. The 'class' keyword simply makes the syntax better.

// To rewrite 'SuperHero', we use two keywords that care of the entire inheritance, 'extends' and 'super'.

// We specify that class SuperHero extends Person and in the constructor, we accept fName and lName. We invoke the 'super' method that JavaScript provides. In the 'super' method, we pass fName and lName. This will call the Person class constructor. Once we call 'super', we set the SuperHero properties and methods in the class. We set this.isSuperHero to true. Then, we define the fight crime method.
class SuperHero extends Person {
  constructor(fName, lName) {
    super(fName, lName)
    this.isSuperHero = true
  }
  fightCrime() {
    console.log('Fighting crime')
  }
}

const batman = new SuperHero('Bruce', 'Wayne')
console.log(batman.sayMyName()) */

// Here is the entire code without notes:

/* class Person {
  constructor(fName, lName) {
    this.firstName = fName
    this.lastName = lName
  }
  sayMyName() {
    return this.firstName + ' ' + this.lastName
  }
}

const classP1 = new Person('Bruce', 'Wayne')
console.log(classP1.sayMyName())

class SuperHero extends Person {
  constructor(fName, lName) {
    super(fName, lName)
    this.isSuperHero = true
  }
  fightCrime() {
    console.log('Fighting crime')
  }
}

const batman = new SuperHero('Bruce', 'Wayne')
console.log(batman.sayMyName()) */

// The important takeaways are: how to create a class, how to initialize properties, how to add methods, how to create an instance of the class, how to inherit using the 'extends' and 'super' keywords.

// Iterables and Iterators

/* Before 2013, JavaScript only had three looping contructs: 'for' 'while' and 'do while' */

// For Loop
// Here's how to iterate and access data with string and array types using the 'for' loop.

/* // String
const str = 'Bennigans'

// for loop
for (let i = 0; 1 < str.length; i++) {
  console.log(str.charAt(i))
}

// Array
const arr = ['B', 'e', 'n', 'n', 'i', 'g', 'a', 'n', 's']

// for loop
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
} */

/* These methods make it difficult to access the element and difficult to manage iteration on the dats for varius types of data structures.

We need to create a new variable 'i', keep track of it to ensure it satisfies a condition and finally increment that vlaue of 'i' to access the next eleemtn in the collection. If there are nested 'for' loops, we have to do this all over again with a second variable. So, it would be difficult to access the element itself before even getting to the part where we do something with that element.

Pertaining to data structure, it is difficult to manage iteration on data for various types of data structures. Iterating and accessing elements on a string is different from iterating on an array.

Iterables and Iterators were introduced in 2015 and offer a way to iterate over various data structures in a way that abstracts away the complexity of accessing elements one by one and are, at the same time, uniform across the different data structures. This makes code more readable and less confusing. Iterables and Iterators make it possible to access data from a collection one at a time, which allows us to focus on what to do with the data, rather than how to access the data. 

Some data structures, including Strings, Arrays, Maps and Sets now implement the iterable protocol by default. They are termed as Built In Iterables.

A new looping construct was also introduced in 2015 to iterate over an iterable: the 'for of' loop.
*/

// For..of Loop

//String
/* const str = 'Bennigans'

for (const char of str) {
  console.log(char)
}

// Array
const arr = ['B', 'e', 'n', 'n', 'i', 'g', 'a', 'n', 's']

for (const item of arr) {
  console.log(item)
} */

// We don't really have to worry about accessing the element from the data structure. It is just given to us one by one in a sequence, allowing us to focus on the functionality. In this example, we are just logging to the console, but you can add any functionality you want.

// An object whcih implements the iterable protocol is called an iterable. For an object to be an iterable, it must implement a mthod at the key [Symbol.iterator]. That method should not accept any argument and should return an object whcih conforms to the iterator protocol.

// The iterator protocol decides whether an object is an iterator. The object must have a next() method that returns an object with two properties: 1) value: which gives the current element, and 2) done: which is a boolean value indiciating whether or not there are any more elements that could be iterated upon.

// This is example is basically the iterable protocol expresed as code:
/* const obj = {
  [Symbol.iterator]: function () {
    const interator = {}
    return iterator
  },
} */

// To implement this iterator, it will look like this:

/* const obj = {
  [Symbol.iterator]: function () {
    let step = 0
    const iterator = {
      next: function () {
        step++
        if (step === 1) {
          return { value: 'Hello', done: false }
        } else if (step === 2) {
          return { value: 'World', done: false }
        }
        return { value: undefined, done: true }
      },
    }
    return iterator
  },
}

for (const word of obj) {
  console.log(word)
} */

// Generators

// Generators are a special class of functions that simplify the task of writing iterators.

// A normal function follows the run to completion model. So, when we add two log statements, the normal function will not stop stop before the last line is executed. The only way to exit this function is by returning from it or throwing an error.

// Normal Function:

/* function normalFunction() {
  console.log('hello')
  console.log('world')
}

normalFunction() // hello world
normalFunction() // hello world */

// A generator function is a function that can pause the execution midway and then continue from where it stopped.

// There are several benefits of using a generator function, including not having to worry about using the symbol.iterator, not having to worry about implement the 'next' method, not having to create the object that is returned from the 'next' method, and not having to be responsible for managing the state in the iterator or using a step variable

// Since generators are a special function, we use the function keyword followed by an asterisk

// To pause the exeuction, we use the word 'yield'. Yield is an operator with which a generator can pause itself. Everytime a generator encounters a yield, it yields the value specified. We don't say that it returns a value. We say that it yields a value.

// A generator function always returns a generator object. The generator object is an iterator. So, instead of having to create an iterator, a generator function will create it for us. Since the generator object is an iterator, it can be used i for-of loops.

// Generator Function

/* function* generatorFunction() {
  yield 'hello'
  yield 'world'
}

const generatorObject = generatorFunction()
for (const word of generatorObject) {
  console.log(word)
} */
