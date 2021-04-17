rm package.json
rm -r src
cp -a ./server/. ./
rm -r server
rm -r client
rm -r dist
rm LICENSE
rm README.md
npm i
npm build
npm start