# Project Configuration

## Environment

**List of dependencies**

### 1. [commitlint](https://github.com/conventional-changelog/commitlint)

#### dd

```
yarn add @commitlint/cli @commitlint/config-conventional -D

echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

> or copy commitlint.config.js from another project

### 2. [commitzen](https://github.com/commitizen/cz-cli)

```
yarn add commitizen -D

yarn commitizen init cz-conventional-changelog --yarn --dev --exact
```

### 3. [husky](https://github.com/typicode/husky)

```
yarn add husky -D

Add to packege.json:
"husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "prepare-commit-msg": "exec < /dev/tty && git cz --hook || true"
    }
  },
```

## -> Create a repository, commit and push

```
. github || bitbucket
> git init
>>> Copy .gitignore
> git remote add origin https://rbalbi@bitbucket.org/rbalbi/omni-behero.git
> git add .
> git commit
> git push -u origin master
```

### 4. [jest](https://jestjs.io/) / [supertest](https://github.com/visionmedia/supertest)

> **Inside each project (backend, frontend, mobile)**

```
yarn add jest supertest @types/jest -D

Create __tests__ folder
Create __tests__/integration and __tests_/unit folders

yarn jest --init

Configure jest.config.js or copy from another project
```

### 5. [Faker](https://github.com/marak/Faker.js/) / [FactoryGirl](https://github.com/simonexmachina/factory-girl)

```
See the need
```

### 6. [dotenv](https://www.npmjs.com/package/dotenv)

> **Inside each project (backend, frontend, mobile)**

```
yarn add dotenv

Create .env || .env.test files or copy from another projects
```

### 7. [eslint](https://eslint.org/)

```
yarn add eslint -D

yarn eslint --init

Modify .eslintrc.json || Copy from another project

VSCode extension
```

### 8. [prettier](https://prettier.io/)

```
VSCode extension

"prettier.eslintIntegration": true  _is  deprecated_

```

### 9. [editorconfig](https://editorconfig.org/)

```
VSCode extension

Right button to generate .editorconfig


root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

### 10. Copy files

```
.gitignore (from another project)
```

### 11. Define Structure

```
1. Create folders:

  ** BACKEND
  ./src
      /app
        /controllers
        /models
    app.js
    routes.js (one or more?)
    server.js
```
