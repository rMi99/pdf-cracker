const { spawn } = require('child_process');
const path = require('path');

function runPdfcrack(args) {
  return new Promise((resolve, reject) => {
    const pdfcrack = spawn('pdfcrack', args);

    let output = '';
    let errorOutput = '';

    pdfcrack.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      process.stdout.write(text);  // live stdout logging
    });

    pdfcrack.stderr.on('data', (data) => {
      const text = data.toString();
      errorOutput += text;
      process.stderr.write(text);  // live stderr logging
    });

    pdfcrack.on('close', (code) => {
      console.log(`pdfcrack exited with code ${code}`);
      if (code !== 0) {
        reject(new Error(`pdfcrack exited with code ${code}: ${errorOutput}`));
      } else {
        resolve(output);
      }
    });
  });
}

/**
 * Brute force crack password on PDF with min/max length and charset.
 * @param {string} pdfFilePath Path to PDF file.
 * @param {number} minLength Minimum password length.
 * @param {number} maxLength Maximum password length.
 * @param {string} charset Characters to try, e.g. "0123456789".
 * @returns {Promise<string>} Found password.
 */
async function crackBruteForce(pdfFilePath, minLength, maxLength, charset) {
  if (typeof minLength !== 'number' || typeof maxLength !== 'number') {
    throw new Error('minLength and maxLength must be numbers');
  }

  const args = [
    '-f',
    path.resolve(pdfFilePath),
    '-n',
    String(minLength),
    '-m',
    String(maxLength),
  ];

  if (charset) {
    args.push('-c', charset);
  }

  console.log('Args:', args);

  const output = await runPdfcrack(args);

  const match = output.match(/found user-password: '(.+)'/i);
  if (match) return match[1];
  throw new Error('Password not found.');
}

/**
 * Dictionary attack.
 * @param {string} pdfFilePath Path to PDF file.
 * @param {string} wordlistFile Path to wordlist file.
 * @returns {Promise<string>} Found password.
 */
async function crackDictionary(pdfFilePath, wordlistFile) {
  if (!wordlistFile) throw new Error('Wordlist file required for dictionary attack.');

  const args = [
    '-f',
    path.resolve(pdfFilePath),
    '-w',
    path.resolve(wordlistFile),
  ];

  console.log('Args:', args);

  const output = await runPdfcrack(args);

  const match = output.match(/found user-password: '(.+)'/i);
  if (match) return match[1];
  throw new Error('Password not found.');
}

/**
 * Resume cracking from a state file.
 * @param {string} stateFile Path to state file.
 * @returns {Promise<string>} Found password.
 */
async function resumeCrack(stateFile) {
  if (!stateFile) throw new Error('State file required to resume cracking.');

  const args = ['-l', path.resolve(stateFile)];

  console.log('Args:', args);

  const output = await runPdfcrack(args);

  const match = output.match(/found user-password: '(.+)'/i);
  if (match) return match[1];
  throw new Error('Password not found.');
}

/**
 * Show pdfcrack version info.
 */
async function showVersion() {
  const args = ['-v'];

  const output = await runPdfcrack(args);
  return output;
}

module.exports = {
  crackBruteForce,
  crackDictionary,
  resumeCrack,
  showVersion,
};
