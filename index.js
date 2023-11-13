module.exports = function secretSanta (names, { seed = Math.floor(Math.random() * 0xffffff) } = {}) {
  const receivers = shuffle(names, seed)

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

function shuffle (arr, seed) {
  const shuffled = arr.slice()
  const random = rng(seed)

  for (let i = 0; i < shuffled.length; i++) {
    const j = Math.floor(random.next() * (shuffled.length - 1))
    const tmp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = tmp
  }

  return shuffled
}

function rng (seed) {
  return {
    seed,
    next () {
      const left = seed * 4091
      const right = seed * 4211

      seed = (left + right) % 0xffffff // 24 bit

      return (seed % 1009) / 1009
    }
  }
}
