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

readFilePromise(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}` );
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then( res => {
      console.log(res.body.message);
      return writeFilePromise('dog-img.txt', res.body.message)
    })
    .then(() => {
      console.log('Random image saved.');
    })
    .catch(err => {
      console.log(err);
    });

