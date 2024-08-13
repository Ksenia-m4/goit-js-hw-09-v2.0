// 1. Выполняй это задание в файлах 03-promises.html и 03-promises.js.
// 2. В HTML есть разметка формы, в поля которой пользователь будет вводить {первую задержку} в миллисекундах, { шаг увеличения задержки} для каждого промиса после первого и {количество промисов} которое необходимо создать.
// 3. Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) столько раз, сколько ввели в поле amount. При каждом вызове передай ей номер создаваемого промиса (position) и задержку учитывая введенную пользователем первую задержку (delay) и шаг (step).
// 4. Дополни код функции createPromise так, чтобы она возвращала один промис, который выполянется или отклоняется через delay времени. Значением промиса должен быть объект, в котором будут свойства position и delay со значениями одноименных параметров. Используй начальный код функции для выбора того, что нужно сделать с промисом - выполнить или отклонить.

import Notiflix from "notiflix";

const submit = document.querySelector("button[type=submit]");
const formEl = document.querySelector(".form");

submit.addEventListener("click", onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  console.log(evt);

  let { delay, step, amount } = formEl;
  delay = Number(delay.value);
  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );

    delay += Number(step.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });

  return promise;
}

// function onSubmit(evt) {
//   evt.preventDefault();
//   console.log(evt);

//   let { delay, step, amount } = formEl;
//   delay = Number(delay.value);
//   for (let i = 1; i <= amount.value; i += 1) {
//     createPromise(i, delay);

//     delay += Number(step.value);
//   }
// }

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;

//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       }

//       reject(`❌ Rejected promise ${position} in ${delay}ms`);
//     }, delay);
//   });
//   promise
//     .then((result) => Notiflix.Notify.success(result))
//     .catch((err) => Notiflix.Notify.failure(err));
// }
