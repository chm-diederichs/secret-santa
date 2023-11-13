# 🎄  secret-santa

Tiny module for reproducible secret santa draws

## 🦌  Usage

```js
const names = ['dasher', 'dancer', 'donner', 'rudolf']

const gifts = secretSanta(names, { seed: 1234 })

for (let i = 0; i < names.length; i++) {
  console.log(names[i], 'gifts to', gifts[i])
}

/*
  dasher gifts to rudolf
  dancer gifts to donner
  donner gifts to dasher
  rudolf gifts to dancer
*/
```

## 🎁  API

### `const results = secretSanta(names, { seed })`

Returns a shuffled list names with noone gifting to themselves.

Optionally a `seed` can be passed for a deterministic shuffle. Using the same input and seed will return the same order.

## ☃️  License

MIT
