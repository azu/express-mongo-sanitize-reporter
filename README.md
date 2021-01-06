# express-mongo-sanitize-reporter

Dry-Run mode for [express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize).

This express middleware does not drop sanitized property. Instead of it, It just calls `report` function as callback.

## Motivation

[express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize) drop invalid property from request.

I want to check that the application use `$` and `.` as valid case before introducing [express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize).

So, I want to get dry-run/report-only mode for [express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize).

## Install

Install with [npm](https://www.npmjs.com/):

    npm install express-mongo-sanitize-reporter

## Usage

Dry-Run mode:

```diff
import express from 'express';
import bodyParser from 'body-parser'; 
- import mongoSanitize from 'express-mongo-sanitize';
+ import mongoSanitize from 'express-mongo-sanitize-reporter';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// To remove data, use:
- app.use(mongoSanitize());
+ app.use(mongoSanitize({
+   report: (req, key) => console.warn("This request will be invalid", req);
+ }));
```

Sanitizing mode:

```diff
import express from 'express';
import bodyParser from 'body-parser'; 
+ import mongoSanitize from 'express-mongo-sanitize';
- import mongoSanitize from 'express-mongo-sanitize-reporter';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// To remove data, use:
+ app.use(mongoSanitize());
- app.use(mongoSanitize({
-   report: (req, key) => console.warn("This request will be invalid", req);
- }));
```

## Changelog

See [Releases page](https://github.com/azu/express-mongo-sanitize-reporter/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/express-mongo-sanitize-reporter/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- azu: [GitHub](https://github.com/azu), [Twitter](https://twitter.com/azu_re)

## License

MIT © azu
