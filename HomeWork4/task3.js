'use struct';

/**
 *
 * @param  {...string|number} inputs
 */
function showWordsWithTimeOut(...inputs) {
  let [sentence, ...values] = inputs.reverse();
  let words = getWords(sentence);
  console.log(`${new Date().toLocaleTimeString()}: Start`);
  startInterval(words, values.reverse());
}

/**
 *
 * @param {string} sentence
 */
function getWords(sentence) {
  return `${sentence}`.split(' ').map(w => w.trim());
}

/**
 *
 * @param {string[]} words
 * @param {number[]} numbers
 */
function startInterval(words, numbers) {
  setTimeout(() => {
    showWord(words[0]);
    if (words.length > 1) {
      startInterval(words.slice(1), nextNumber(numbers));
    }
  }, numbers[0] * 1000);
}

/**
 *
 * @param {number} numbers
 */
function nextNumber(numbers) {
  if (numbers.length > 1) {
    return numbers.slice(1);
  }
  return numbers;
}

/**
 *
 * @param {string} word
 */
function showWord(word) {
  console.log(`${new Date().toLocaleTimeString()}: ${word}`);
}

showWordsWithTimeOut(2, 5, 4, 6, 15, 'Карл у Клары украл кораллы');
