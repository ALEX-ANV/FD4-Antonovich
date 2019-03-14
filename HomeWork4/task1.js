'use strict';

/**
 *
 * @param  {...number} numbers
 */
function printDuplicatedNumbers(...numbers) {
  let duplicates = numbers.reduce((duplicates, num) => {
    if (1 * num + 1) {
      duplicates[num] = (duplicates[num] || 0) + 1;
    }
    return duplicates;
  }, {});
  showOnlyDuplicates(duplicates);
}

/**
 *
 * @param {object} duplicates
 */
function showOnlyDuplicates(duplicates) {
  Object.keys(duplicates).forEach(key => {
    if (duplicates[key] - 1) {
      console.log(`${key} - ${duplicates[key]}`);
    }
  });
}

printDuplicatedNumbers(1, 2, 3, 10, 2, 1, 5, 2, 54, 2, 4);
