import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

compiler.run((error,stats) => {

  if (error) { // so a fatal error occurred. Stop here.
    console.log(error);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalkError(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: ');
    jsonStats.warnings.map(warning => console.log(warning));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  console.log('Your app is compiled in production mode in /dist. It\'s ready to roll!');


  return 0;
});
