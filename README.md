[![npm version](https://badge.fury.io/js/aria-mocha.svg)](https://www.npmjs.com/package/aria-mocha)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# aria-mocha
Simple Testing tool for your nodejs

Installation
------------
  ```
    npm install --save-dev aria-mocha
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