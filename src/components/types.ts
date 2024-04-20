import { types } from "util";

let text = "esto es un texto";
text = "hello";
//text=123; ERROR

let number1: number = 123;
//number1="texto"; ERROR
let numberToText: string = number1.toString();

let boolean1: boolean = false;

function multiplicarPor2(arr: number[]) {
  const newArr = arr.map((item) => item * 2); // =>item.toFixed
}
// arr: Array<number>   arr es un Array de numeros
// arr: number[]        arr es un array de numeros

const person: Programmer = {
  name: "albeto",
  age: 16,
  gender: "Male",
  language: "Typescript",
};

/*
type Person = {
  name: String;
  age: number;
  gender?: "Male" | "Female"; // interrogante es para opcional
};
*/
//EL MISMO DE ARRIBA
interface Person {
  name: String;
  age: number;
  gender?: "Male" | "Female"; // interrogante es para opcional
}

function addOneToAge(person: Person) {
  person.name = "juan";
  person.age = 15;
}
/*
interface Programmer {
  language: "Jacascript" | "Typescript";
}*/

//ERENCIA
interface Programmer extends Person {
  language: "Jacascript" | "Typescript";
}

type ProgrammerPerson = Person & Programmer;

// FUNCIONES GENERICAS RESPONDER A DIFERENTES TIPOS DE VARIABLES

type User = {
  name: string;
  age: number;
};

const usuarios: User[] = [
  { name: "alberto", age: 26 },
  { name: "Maria", age: 23 },
  { name: "Julio", age: 19 },
];

function findById<T>() {
  //temple function
}
findById<string>();
findById<number>();
findById<Person>();

const datosstring = ["123", "fsfasfasf", "ererer"];

function findByIndex<T>(array: T[], index: number): T | undefined {
  //temple function
  //un arrat de tipo T y vamos a buscar un index que es un numero y va a retornar un T
  const object = array.find((elem, elemIndex) => index === elemIndex);
  return object;
}

findByIndex<string>(datosstring, 2);
findByIndex<User>(usuarios, 1);

export function getObjects() {
  console.log(findByIndex<string>(datosstring, 2));
  console.log(findByIndex<User>(usuarios, 1));
}
