# aria-mocha
Simple Testing for your nodejs

Installation
------------
  ```
    npm install --save-dev aria-mocha
  ```

Quick Start
------------
  ```
   aria test demo \
   --mocha \
   --check-coverage \
   --include-dir demo \
   --reporters lcov,html,text-summary \
   --threshold statements=50,functions=50,branches=50,lines=50
  ```