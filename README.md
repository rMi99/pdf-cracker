# PDF Password Cracker (Node.js Wrapper for pdfcrack)

This Node.js project provides a simple interface to [pdfcrack](https://pdfcrack.sourceforge.io/), a command-line tool to recover passwords from encrypted PDF files via brute force or dictionary attacks.

---

## Features

- **Brute force attack** with configurable password length range and character set
- **Dictionary attack** using a wordlist file
- **Resume** password cracking from a saved state file
- Show **pdfcrack version** info
- Live output logging during cracking process

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v12+ recommended)
- [`pdfcrack`](https://pdfcrack.sourceforge.io/) installed and available in your system's PATH

### Install `pdfcrack` on Ubuntu/Debian

```bash
sudo apt-get update
sudo apt-get install pdfcrack
````

Check installation:

```bash
pdfcrack -v
```

---

## Installation

1. Clone this repository or copy the files to your project directory.

2. Ensure dependencies are installed (none external needed for this wrapper):

```bash
npm install
```

3. Place your encrypted PDF file in the project folder or specify the full path in the code.

---

## Usage

### Import functions

```js
const {
  crackBruteForce,
  crackDictionary,
  resumeCrack,
  showVersion,
} = require('./index');
```

### Brute force attack example

```js
const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const pdfPath = 'test-encrypted.pdf';

(async () => {
  try {
    const password = await crackBruteForce(pdfPath, 1, 8, charset);
    console.log('Password found:', password);
  } catch (e) {
    console.error('Error:', e.message);
  }
})();
```

### Dictionary attack example

```js
const pdfPath = 'test-encrypted.pdf';
const wordlistFile = './wordlist.txt';

(async () => {
  try {
    const password = await crackDictionary(pdfPath, wordlistFile);
    console.log('Password found:', password);
  } catch (e) {
    console.error('Error:', e.message);
  }
})();
```

### Resume cracking from a state file

```js
const stateFile = './statefile.state';

(async () => {
  try {
    const password = await resumeCrack(stateFile);
    console.log('Password found:', password);
  } catch (e) {
    console.error('Error:', e.message);
  }
})();
```

### Show pdfcrack version

```js
(async () => {
  const version = await showVersion();
  console.log('pdfcrack version:', version);
})();
```

---

## API

### `crackBruteForce(pdfFilePath, minLength, maxLength, charset)`

* `pdfFilePath` — Path to the encrypted PDF file
* `minLength` — Minimum password length to try
* `maxLength` — Maximum password length to try
* `charset` — String of characters to use for brute forcing

Returns a Promise that resolves with the found password or rejects if not found.

---

### `crackDictionary(pdfFilePath, wordlistFile)`

* `pdfFilePath` — Path to the encrypted PDF file
* `wordlistFile` — Path to the dictionary wordlist file

Returns a Promise that resolves with the found password or rejects if not found.

---

### `resumeCrack(stateFile)`

* `stateFile` — Path to the saved state file to resume cracking

Returns a Promise that resolves with the found password or rejects if not found.

---

### `showVersion()`

Returns a Promise resolving to the pdfcrack version string.

---

## Notes

* The project expects `pdfcrack` to be installed and accessible in your system's PATH.
* Brute forcing passwords with large max lengths and big charsets can take significant time.
* Use dictionary attacks with good wordlists when possible for faster cracking.
* The regex used to detect the found password matches output like:
  `found user-password: 'password'`

---

## Test
```
const {
  crackBruteForce,
  crackDictionary,
  resumeCrack,
  showVersion,
} = require('./index');

const all = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

(async () => {
  try {
    const pdfPath = 'test-encrypted.pdf'; // update path as needed

    console.log('Running brute force...');
    const password = await crackBruteForce(pdfPath, 1, 8, all);
    console.log('Password found:', password);

    // Uncomment to try dictionary attack:
    // const dictPassword = await crackDictionary(pdfPath, './wordlist.txt');
    // console.log('Dictionary attack found password:', dictPassword);

    // Uncomment to resume cracking from a saved state:
    // const resumedPassword = await resumeCrack('./statefile.state');
    // console.log('Resumed cracking found password:', resumedPassword);

    // Uncomment to show pdfcrack version:
    // const version = await showVersion();
    // console.log('pdfcrack version:', version);

  } catch (e) {
    console.error('Error:', e.message);
  }
})();
```

## License

MIT License © rMi99 or Organization

---

## Acknowledgments

* [pdfcrack](https://pdfcrack.sourceforge.io/) — PDF password recovery tool
* Inspired by CLI usage, wrapped for Node.js convenience


