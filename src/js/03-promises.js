import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
const firstDelayInputRef = document.querySelector('[name="delay"]');
const stepDelayInputRef = document.querySelector('[name="step"]');
const amountInputRef = document.querySelector('[name="amount"]');

formRef.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  let delayValue = Number(firstDelayInputRef.value);
  const stepValue = Number(stepDelayInputRef.value);
  const amountValue = Number(amountInputRef.value);
  for (let number = 1; number <= amountValue; number += 1) {
    createPromise(number, delayValue);
    delayValue += stepValue;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
