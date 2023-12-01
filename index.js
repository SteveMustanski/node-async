const fs = require('fs');
const superagent = require('superagent');


const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('File not found!');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write file');
      resolve('Successful write image file.')
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}` );
    
    const dog1 =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const dog2 =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const dog3 =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([dog1, dog2, dog3]);
    const imgs = all.map(el => el.body.message);

    
    await writeFilePromise('dog-img.txt', imgs.join('\n'));
    console.log('Random image saved.');
  } catch (err){
    console.log(err);
    throw(err);
  }
  return '2: Ready 🐶'
};

// IIFE - Immediately invokes due to () at the ned of the function defintion
(async () => {
  try {
    console.log('1: Call dog pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics');
  } catch (error) {
    console.log('💥Error💥');
  }
})();



// this mixes aycn/await from above with promises .
// console.log('1: Call dog pics');
// getDogPic().then(x => {
//   console.log(x);
//   console.log('3: Done getting dog pics');
// })
// .catch(err => {
//   console.log('💥Error💥');
// });

// promises
// readFilePromise(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`Breed: ${data}` );
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     })
//     .then( res => {
//       console.log(res.body.message);
//       return writeFilePromise('dog-img.txt', res.body.message)
//     })
//     .then(() => {
//       console.log('Random image saved.');
//     })
//     .catch(err => {
//       console.log(err);
//     });

