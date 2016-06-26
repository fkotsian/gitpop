const Factory = require('rosie').Factory;
const Chance = require('chance');
const generator = new Chance();

module.exports = new Factory()
  .attr('name', () => generator.word({length: 8}))
  .attr('stars', () => Math.floor(Math.random() * 10000))
  .attr('contributorsUrl', () => `https:\/\/api.github.com/repos/${generator.word({length: 8})}/${generator.word({length: 8})}/contributors`);

