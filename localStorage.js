// localStorage.setItem('testingName', 'testingNameValue');
let date = new Date();
localStorage.setItem('my-Name', date.toDateString());
console.log(localStorage.getItem('my-Name'));
let myObj = {
    name: 'anik',
    status: 'active',
    joined: date.toDateString()
}
localStorage.setItem('myObject', JSON.stringify(myObj));
let returnObj = JSON.parse(localStorage.getItem('myObject'));
console.log(returnObj);
// console.log(Object.entries(returnObj));
localStorage.clear();
