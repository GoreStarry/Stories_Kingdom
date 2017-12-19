# Stories Kingdom

> The environment builds for vertical writing

<p align="center">
  <img alt="Stories Kingdom ver.1 gif" src="https://raw.githubusercontent.com/GoreStarry/Stories_Kingdom/master/static/sk_v1.gif">
</p>

## Prerequisite Technologies

* _Node.js_ (^7.6.x)
* _MongoDB_

## Article Editing Shortcuts

| Key             |                    Description                    | shortcut only |
| --------------- | :-----------------------------------------------: | ------------: |
| `command+enter` | Break out with new block (when editor have focus) |            \* |
| `command+enter` |      Focus article editor (when editor blur)      |            \* |
| `command+s`     |                       Save                        |            \* |
| `command+/`     |               Toggle block comment                |            \* |
| `alt+right`     |                 Turn to next page                 |               |
| `alt+left`      |               Turn to previous page               |               |
| `alt+n`         |                  Insert new page                  |               |
| `alt+shift+n`   |              Insert new page before               |               |
| `alt+a`         |  Switch article text-align mode (Right / Center)  |               |
| `alt+d`         |             Toggle article detail bar             |               |

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run production server
# (should run build at first time)
npm start

# build .app, .exe, etc. for OS desktop
# (in ./release-builds folder)
npm run package-mac
npm run package-win
npm run package-linux

# run api tests
npm run api_test

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
