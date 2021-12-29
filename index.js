const today = new Date();
const amanha = new Date();
amanha.setDate(amanha.getDate() + 1);

console.log(today, " < ", amanha, " == ", today < amanha);
