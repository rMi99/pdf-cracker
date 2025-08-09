# PDF Password Cracker (Node.js Wrapper for pdfcrack)

This Node.js package provides a simple interface to [pdfcrack](https://pdfcrack.sourceforge.io/), a command-line tool for recovering passwords from encrypted PDF files using brute force or dictionary attacks.

---

## Features

* Brute force attack with configurable password length range and charset
* Dictionary attack using a wordlist file
* Resume password cracking from a saved state file
* Show pdfcrack version information
* Live output logging during cracking process

---

## Prerequisites

* [Node.js](https://nodejs.org/) (v12 or newer recommended)
* [`pdfcrack`](https://pdfcrack.sourceforge.io/) installed and accessible in your system's PATH

### Installing pdfcrack on Ubuntu/Debian

```bash
sudo apt-get update
sudo apt-get install pdfcrack
```

Verify installation:

```bash
pdfcrack -v
```

---

## Installation

Clone this repository or copy the source files to your project directory.

Install any dependencies (none external needed for this wrapper):

```bash
npm install
```

Place your encrypted PDF file in the project folder or specify the full path in your code.

---

## Usage

### Import functions

```js
const {
  crackBruteForce,
  crackDictionary,
  resumeCrack,
  showVersion,
} = require('pdf-cracker'); // or './index' if local
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

### Resume cracking from a saved state file

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

* `pdfFilePath` — Path to encrypted PDF file
* `minLength` — Minimum password length to try (number)
* `maxLength` — Maximum password length to try (number)
* `charset` — String of characters to use for brute forcing

Returns a Promise resolving to the found password string or rejects if not found.

---

### `crackDictionary(pdfFilePath, wordlistFile)`

* `pdfFilePath` — Path to encrypted PDF file
* `wordlistFile` — Path to dictionary wordlist file

Returns a Promise resolving to the found password or rejects if not found.

---

### `resumeCrack(stateFile)`

* `stateFile` — Path to saved state file to resume cracking

Returns a Promise resolving to the found password or rejects if not found.

---

### `showVersion()`

Returns a Promise resolving to the pdfcrack version string.

---

## Notes

* This package requires `pdfcrack` to be installed and in your system PATH.
* Brute forcing with large max lengths and charsets can take a very long time. Use dictionary attacks when possible.
* The regex used for detecting the found password matches output lines like: `User password found: password`

---

## Test example

```js
const {
  crackBruteForce,
  crackDictionary,
  resumeCrack,
  showVersion,
} = require('pdf-cracker');

const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

(async () => {
  try {
    const pdfPath = 'test-encrypted.pdf';

    console.log('Running brute force...');
    const password = await crackBruteForce(pdfPath, 1, 8, charset);
    console.log('Password found:', password);

    // Uncomment to try dictionary attack:
    // const dictPassword = await crackDictionary(pdfPath, './wordlist.txt');
    // console.log('Dictionary attack found password:', dictPassword);

    // Uncomment to resume cracking:
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

---

## License

MIT License © rMi99 or Your Organization

---

## Acknowledgments

* [pdfcrack](https://pdfcrack.sourceforge.io/) — the underlying PDF password recovery tool
* Inspired by CLI usage, wrapped for Node.js convenience

