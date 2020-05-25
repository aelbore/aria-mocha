[![Coverage Status](https://coveralls.io/repos/github/aelbore/aria-mocha/badge.svg?branch=master&service=github)](https://coveralls.io/github/aelbore/aria-mocha?branch=master)
[![npm version](https://badge.fury.io/js/aria-mocha.svg)](https://www.npmjs.com/package/aria-mocha)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# aria-mocha
Zero configuration CLI testing tool for nodejs and browser base

Installation
------------
  ```
    npm install --save-dev aria-mocha
  ```

CLI Options
------------
```
  Usage
    $ aria-mocha [options]

  Options
    -d, --dir           Directory folder of spec or test files. (default: src)
    -t, --threshold     Enable the thresholds
    -r, --reporters     Output reporters.  (default lcov,html,text-summary)
    --check-coverage    Enable coverage  (default false)
    --include-dir       Directory folder source (default: src)
    --browser           Enable the browser base testing  (default false)
    -v, --version       Displays current version
    -h, --help          Displays this message
```

Quick Start
------------
  ```
   aria-mocha 
    --dir demo \
    --check-coverage \
    --include-dir demo \
    --reporters lcov,html,text-summary \
    --threshold statements=50,functions=50,branches=50,lines=50
  ```