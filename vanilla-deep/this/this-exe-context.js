console.log(this)

function test() {
  console.log(this)
}
const test2 = () => {
  console.log(this)
}

const obj = {
  test,
  test2,
  test3: function () {
    console.log(this)
  },
  test4: () => {
    console.log(this)
  },
  test5() {
    console.log(this)
  },
}
const objTest = obj.test
const objTest2 = obj.test2
const objTest3 = obj.test3
const objTest4 = obj.test4
const objTest5 = obj.test5

document.querySelector('#btn').addEventListener('click', objTest3)
