const Factory = require('rosie').Factory;
const Chance = require('chance');
const generator = new Chance();

module.exports = new Factory()
  .attr('name', () => generator.word({length: 8}))
  .attr('stars', () => Math.floor(Math.random() * 10000))
  .attr('topContributor', () => generator.first());

