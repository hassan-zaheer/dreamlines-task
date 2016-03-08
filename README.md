# [dreamlines-test]

***

## Quick Start

Install Node.js and then:

```sh
$ git clone https://hassanzaheer@bitbucket.org/hassanzaheer/dreamlines-test.git
$ sudo npm -g install grunt-cli karma bower
$ npm install
$ bower install
$ grunt watch
```

Finally, open `file:///path/to/build/index.html` in your browser. (or )

## Learn

### Overall Directory Structure

At a high level, the structure looks roughly like this:

```
dreamlines-test/
  |- grunt-tasks/
  |- karma/
  |- src/
  |  |- app/
  |  |  |- <app logic>
  |  |- assets/
  |  |  |- <static files>
  |  |- common/
  |  |  |- <reusable code>
  |  |- less/
  |  |  |- main.less
  |- vendor/
  |  |- angular-bootstrap/
  |  |- bootstrap/
  |  |- placeholders/
  |- .bowerrc
  |- bower.json
  |- build.config.js
  |- Gruntfile.js
  |- module.prefix
  |- module.suffix
  |- package.json
```
