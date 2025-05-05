{
  function Animal1() {
    this.species = 'animal'
  }
  // Animal1 은 typeof 가 function이고. instanceof Function이 true
  console.log(typeof Animal1, Animal1 instanceof Function)

  var animal = new Animal1()
  // __proto__ 는 객체 자신이 어떤 생성자로부터 만들어졌는지에 대한 정보를 가짐
  // prototype은 생성자를 통해 만들어진 인스턴스의 부모 타입에 대한 정보를 가짐

  // 부모 타입 이라고 했지만 다른 객체 지향 언어로 치환하면 그냥 원본 타입 이 맞는듯함.
  // js는 new A()를 통해 생성한 타입이 정해진 객체라고 해도 이후에 다른 객체지향 언어들과 다르게 커스텀 속성들을 추가하는게 가능하기 때문에
  // const a = new A()
  // 인스턴스 a는 정확하게 A 타입이 아닌 A타입의 자손 타입이고, A 타입은 a의 부모 타입이라고 한다.
  console.log(animal.__proto__ === Animal1.prototype) // true

  // js에서는 function도 일종의 객체고 함수들은 내부적으로 new Function와 비슷한 방식으로 생성된다고 하여
  // Animal1은 Function 타입의 자손이고 Animal1로부터 .__proto__ 로 접근하여 가져온 부모 타입은 Function임.
  console.log(Animal1.__proto__ === Function.prototype) // true

  // Animal1 자체는 함수 생성자가 아닌 함수. 그냥 함수로서 호출하는게 문법적으로 가능.
  // Animal1은 Animal1이 함수 생성자로서 호출되어 생성하게 되는 객체
  console.log(Animal1 === Animal1.prototype) // false
}
{
  class Animal2 {
    constructor() {
      this.species = 'animal'
    }
  }

  // class도 js 내부적으로는 생성자 함수 방식이라 Animal2는 Animal1과 결과가 같음.

  console.log(typeof Animal2, Animal2 instanceof Function)

  var animal = new Animal2()

  console.log(animal.__proto__ === Animal2.prototype) // true
  console.log(Animal2.__proto__ === Function.prototype) // true
}
