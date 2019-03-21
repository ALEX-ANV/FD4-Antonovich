'use strict';

async function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(id * 5), 3000);
  });
}

async function fetchFriends(id) {
  return Promise.resolve(20 * id);
}

function _async(genFn) {
  return function (id) {
    return new Promise((resolve, reject) => {
      const itr = genFn(id);

      function run(args) {
        let result = itr.next(args);

        if (result.done) {
          resolve(result.value);
        } else {
          return Promise.resolve(result.value).then(run).catch(err => reject(err));
        }
      }

      return run();
    });
  };
}

let fetchData = _async(function* (id) {
  let user = yield fetchUser(id),
    friends = yield fetchFriends(id);
  return {
    user,
    friends
  };
});

fetchData(15)
  .then(({ user, friends }) => {
    console.log(user);
    console.log(friends);
  })
  .catch(err => console.log(err));
