git submodule init
git submodule update --remote

cd packages/aria-fs
npm install

cd ../../
npm run build

npm run build.packages

npm test --prefix ./packages/aria-fs/