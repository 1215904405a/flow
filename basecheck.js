/*@flow*/
//在 C#/Java 等强类型语言中，所有的变量、属性、参数是需要对其定义类型的，也需要对函数的返回值进行类型定义。这样，在程序编译过程中，编译器就会进行类型检查，如果类型不匹配，将会终止编译。也就是说，变量存储的数据自始至终必须是一种类型、函数接收的变量类型也被固定，如果在调用函数时传递其它类型，编译会被中断。
/* flow facebook JavaScript的静态类型检查工具 主要提高代码质量   选flow vue2作者知乎回答 https://www.zhihu.com/question/46397274
 *
 *一、类型推断  通过变量的使用上下文来推断出变量类型，然后根据这些推断来检查类型
 */

//1 因为函数foo()的期待参数是字符串，而我们输入了数字

let name = 'zhihu';
// console.log(name - 1); // 即便没有手动给 name 加上类型标注，Flow 也会在这里报错

function foo(x) {
  return x.split(' ');
}
// foo(34);
foo('Hello World!');

//2 防止了因给变量传了null而导致程序崩溃的错误
function stringLength(str) {
  if (str !== null) {
    return str.length;
  }
  return 0;

  // return str.length;
}
var length = stringLength(null);

/*
 *
 * 二、类型注释 事先注释好我们期待的类型，Flow就会基于这些注释来评估
 **/

/*1 基本类型的类型标注语法

const a: string = 'zhihu';
const b: number = 5;
const c: boolean = false;
const d: void = undefined;
const e: null = null;    注释以:开始*/
let a: string = '2';
// a = 2;

//2 字面量值作为一种类型
let monthsAYear: 12 = 12;
// monthsAYear = 13; // Flow 会在这里报错

//3 函数类型标注 期望都输入数字 返回数据也是数据
// function add(x, y){
//   return x + y;
// }
// add('Hello', 42);
function add(x: number, y: number): number {
  return x + y;
  // return x + y + '';
}
// add('Hello', 42);
add(2, 42);
const addNumber = (a: number, b: number): number => (a + b);
addNumber(2, 3);

//4 数组
let array: Array < string > = ['1', '2', '3'];
const ages: number[] = [1, 2, 3, 4];
// ages[0] = '1';
//用在数据库表 flow限定数组不能push、pop
const recordItem: [number, string, boolean] = [1, 'First', true];

//5 对象类型的标注
let borderConfig: {
  width: number,
  color: string,
  hasShadow: boolean
} = {
  width: 10,
  color: 'red',
  hasShadow: true,
};
//type 是 Flow 中的关键字，用来定义自定义的类型
type BorderConfigType = {
  width: number,
  color: string,
  hasShadow: boolean
};
let borderConfig2: BorderConfigType = {
  width: 10,
  // width: '10',
  color: 'red',
  hasShadow: true,
} ;

// type StringType = string;
// const name: StringType = 'zhihu';

// type TupleType = [ number, string ]
// const record: TupleType = [ 1, 'a' ]

//6 类的标注
class Bar {
  x: string; // x should be string
  y: string | number; // y can be either a string or a number
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};
var bar1: Bar = new Bar("hello", 4);
// var bar1 : Bar = new Bar("hello",[]);

//7 联结类型（Union Type）的使用
type UserIdType = string | number;
let user_id: UserIdType = 12345678;
user_id = '87654321';
type MsgType = string | number;

function show(msg: MsgType) {
  if (typeof msg === 'string') {
    // do something
  } else {
    // 在这个代码块里，可以放心将参数 msg 当成数字类型
    // Flow 也会作出这样的推理
  }
}

//8 交叉类型（Intersection Type）的使用
type X1 = 1 | 2 | 3 | 4 | 5;
type X2 = 3 | 4 | 5 | 6 | 7;
type X3 = X1 & X2;
//X3 为 3、4、5

type Y1 = {
  name: string,
  male: boolean
}
type Y2 = {
  name: string,
  age: number
}
type Y3 = Y1 & Y2;
const right: Y3 = { // 可以通过 Flow 的类型检测
  name: 'zhihu',
  male: true,
  age: 5
}

//9 对象的可选属性与变量的可选类型
type Test = {
  key1: ? string, //key1必须存在类型为string、null、undefined
  key2: ? number, //key2可以不存在，存在类型必须为number
}
let flowSelect: Test = {
  key1: null,
  key2: 2
};

//10 any 类型  可以是任意值    有些类型不需要flow检查  可以设置
let any: any = 1;
any = 'a';
any = {};
