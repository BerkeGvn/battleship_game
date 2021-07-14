const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export { random, sleep };
