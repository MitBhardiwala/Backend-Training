// const {add,subtract} = require('./util')

import mutiply from "./mutiply.js";
import { add, subtract } from "./util.js";
const promise = Promise.resolve();
let i = 0;
promise.then(() => {
  i += 1;
  console.log(i);
});
promise.then(() => {

    setTimeout(()=>{
        i+=1;
        console.log(i)
    },[2000])

  console.log(i);
});

console.log(add(10,30))
console.log(subtract(8,700))
console.log(mutiply(12,12))

//Callbacks -

function getData(dataId, getNextData) {
  setTimeout(() => {
    console.log("data", dataId);
    if (getNextData) {
      getNextData();
    }
  }, 2000);
}

getData(1,()=>{
    getData(2,()=>{
        getData(3)
    })
})

//promises -

function asyncFunc1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Data 1");
      resolve("Sucess");
    }, 1000);
  });
}

function asyncFunc2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Data 2");
      resolve("Sucess");
    }, 2000);
  });
}

console.log("Fetching data....");

asyncFunc1()
  .then((value) => {
    console.log(value);

    return asyncFunc2();
  })
  .then((value) => {
    console.log(value);
  });

// async/await

async function  getData(dataId){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log(dataId);
            resolve("DataId fetched")
        }, 1000);
    })
}

async function fetchData(){
    await getData(1)
    await getData(2)
    await getData(3)
}

fetchData();


// GLobal vairables-
global.x = "Welcome To, TutorialsPoint.";
console.log(global.x);


//console module
console.log("Hello");
console.warn("Danger.!");
console.error("SyntaxError");

console.log("Directory Name:", __dirname);
console.log("File Name:", __filename);

const A = [
  { id: 1, name: "BMW" },
  { id: 2, name: "CIAZ" },
];
console.table(A);



console.time("Loop Execution Time");
for (let x = 0; x < 25000000; x++) {}
console.timeEnd("Loop Execution Time");


// Process Events : 

process.on('beforeExit', (code) => {
   console.log('A beforeExit event occured with code: ', code);
});

process.on('exit', (code) => {
   console.log('Process exit event with code: ', code);
});

console.log('This message is displayed first.');
console.log('This message is displayed second');


// Abort function-
const abortfunction = () => { 
   console.log('Start...'); 
  
   // It prints the message after every 1 second 
   setInterval((function() { 
      return console.log('Hello World'); 
   }), 1000); 
  
   // It calls process.abort() after 5 seconds 
   setTimeout((function() { 
      return process.abort(); 
   }), 5000); 
}; 
  
// abortfunction();


console.log('Code running'); 
process.on('exit', function(code) { 
   return console.log(`exiting with the error code : ${code}`); 
}); 
setTimeout((function() { 
   return process.exit(0); //after 5 sec
}), 5000);


//memory usage function-
console.log(process.memoryUsage());