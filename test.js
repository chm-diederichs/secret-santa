const test = require('brittle')
const secretSanta = require('./')

test('simple', t => {
  const names = ['lisa', 'derek', 'carl', 'hannah', 'jordan']

  const gifts = secretSanta(names)

  for (let i = 0; i < names.length; i++) {
    t.not(gifts[i], names[i])
  }
})

test('seed', t => {
  const names = ['lisa', 'derek', 'carl', 'hannah', 'jordan']
  const expected = ['jordan', 'hannah', 'lisa', 'carl', 'derek']

  const gifts = secretSanta(names, { seed: 10009 })

  for (let i = 0; i < names.length; i++) {
    t.is(gifts[i], expected[i])
  }
})

test('zero seed', t => {
  const names = ['lisa', 'derek', 'carl', 'hannah', 'jordan']

  const gifts = secretSanta(names, { seed: 0 })

  for (let i = 0; i < names.length; i++) {
    t.not(gifts[i], names[i])
  }
})

test('default rng', t => {
  const names = ['lisa', 'derek', 'carl', 'hannah', 'jordan']

  const first = secretSanta(names)
  const second = secretSanta(names)

  t.unlike(first, second)
})
