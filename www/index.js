function secretSanta (names, { seed = Math.floor(Math.random() * 0xffff) } = {}) {
  if (names.length < 2) {
    throw new Error('Minimum 2 participants')
  }

  // shuffle participants
  const receivers = shuffle(names, seed)

  // swap if any got themselves
  for (let i = 0; i < names.length; i++) {
    const s = names[i]
    const r = receivers[i]

    if (s === r) {
      const last = receivers.pop()
      if (last === r) {
        return secretSanta(names, seed + 1) // start over
      }

      receivers[i] = last
      receivers.push(r)
    }
  }

  return receivers
}

// fisher-yates shuffle
function shuffle (arr, seed) {
  const shuffled = arr.slice()
  const getRandomNumber = prng(seed)

  for (let i = 0; i < shuffled.length; i++) {
    const random = getRandomNumber()
    const j = Math.floor(random * (shuffled.length - 1))

    // replace with random element from further down
    const tmp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = tmp
  }

  return shuffled
}

// lazy pseudo-random number generator
function prng (seed) {
  return function () {
    const a = seed
    const b = rotate16(seed, 7) // we need a second number...

    const left = a * 4091 // a * prime
    const right = b * 4211 // b * prime2

    seed = (left + right) & 0xffff // only need 16 bits

    return (seed % 1009) / 1009 // mod prime3
  }
}

// left rotate 16 bit number by r bits
function rotate16 (n, r) {
  const top = (0xffff << r) & 0xffff
  const bottom = (0xffff >> (16 - r)) & 0xffff

  return n << ((16 - r) % 16) & 0xffff + n >>> r
}
