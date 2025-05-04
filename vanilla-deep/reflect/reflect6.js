class Animal {
  constructor() {
    this.name = 'animal'
  }

  walk() {
    try {
      return Reflect.apply(
        function () {
          console.log('in walk')
          // 아래에서 this가 제대로 안넘어가면 에러난다
          console.log(this.name)
          return 'walk'
        },
        null,
        []
      )
    } catch (err) {
      console.log('error occured')
    }
  }
  walk2() {
    return Reflect.apply(
      () => {
        console.log('in walk')
        // 화살표 함수는 부모 스코프가 this의 기준이 되므로 walk2의 this를 알아서 가져오기 때문에 에러 안남
        console.log(this.name)
        return 'walk'
      },
      null,
      []
    )
  }
  walk3() {
    console.log('in walk3')
    const result = Reflect.apply(this.#walk4, this, [])
    console.log('result: ', result)
    return result
  }
  #walk4() {
    console.log('in walk4')
    console.log(this.name)
    return 'walk4'
  }
}

const animal = new Animal()

console.log(animal.walk())
console.log(animal.walk2())
console.log(animal.walk3())
