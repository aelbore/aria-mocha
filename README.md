[![npm version](https://badge.fury.io/js/aria-mocha.svg)](https://www.npmjs.com/package/aria-mocha)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# aria-mocha
Simple Testing tool for your nodejs

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
    -d, --dir           Directory folder of spec or test files. (default: src)  (default src)
    -t, --threshold     Enable the thresholds
    -r, --reporters     Output reporters.  (default lcov,html,text-summary)
    -c, --config        config file of aria-build. i.e aria.config.ts
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
    --browser
    --dir demo \
    --check-coverage \
    --include-dir demo \
    --reporters lcov,html,text-summary \
    --threshold statements=50,functions=50,branches=50,lines=50
  ```