# My First Xeneta

<details>
<summary>Task</summary>

We are providing a simplified real-world usage scenario of a core
Xeneta feature. In our system, users are given the option to search
for origin and destination ports by name, and see a visualisation of
the price development over a selected period of time. We provide a
small backend with three API endpoints that return port information,
do a simple string search, or return the time-series information about
the prices. Your task is to develop an interface for the actions
described below.



## Usage

```sh
# Install dependencies
$ npm install
# Single build
$ npm run build
# Watcher build (Rebuilds on file changes)
$ npm run watch
# Start development server at localhost:3000
$ npm start
```

# Task
Create a simple port-to-port search page, with visualization of the freight rates over time, on a provided port-port
combination, within a customizable date range.

* Make it pretty-ish, using your awesome CSS skills
* Make it efficient, limit network use, and load fast
* Feel free to add your personal flair

Please read the full document for the details on the build process and the APIs.

# Building
The project will build HTML using EJS templates from the `views` folder. Client-side JavaScript is built
from the `src/index.js` entrypoint with Webpack 4 and Babel 7. CSS is currently loaded
statically from the `public/stylesheets` folder.

You are free to install any frameworks, libraries, and software you want using NPM or Yarn. You can also change
any aspect of the build process if needed. For example, the build setup supports React/JSX out of the box,
but if you are more comfortable using for example Vue.js, we're not going to stop you.

# API
Provided is a simple web server, with an API that allows looking up ports and querying for time-series of freight
rates between the respective ports. It is available from http://localhost:3000/

## /api/ports/:id
Returns a single port based on the provided port code. (NOOSL, CNSGH, NLRTM)

```json
{"id":"NOOSL","country":"NO","name":"Oslo"}
```

## /api/ports/search/:query
Free text search for port codes and port names. Returns an object with matching ports.

```json
{"results":[{"id":"CNSGH","country":"CN","name":"Shanghai"},{"id":"CNSTG","country":"CN","name":"Shantou"}]}
```

## /api/rates/:origin/:destination/:fromdate/:todate
Returns a timeseries of rates from port to port, within the given time-period. `origin` and `destination`
are port codes, the date formats are ISO-8601 dates, e.g. `2018-06-30`.
https://github.com/xeneta/portsearchtask
This returns an object containing a time-series of freight rates. The time-series is an array of arrays,
containing the date and the price for that given day.

```json
{"rates":[["2018-06-30",1972],["2018-07-01",2022],["2018-07-02",2022],["2018-07-03",2022]]}
```

Note that the dataset only contains data between `2017-08-30` and `2018-06-30`. If there is no rate available
on a specific date within the dataset, the price is set to `null`.

# Evaluation
When evaluating the code, we will install dependencies, run a single build, then start the development server.

</details>

# Solution

This project is made on React in JSX with [Styled Components](https://www.styled-components.com/) instead of native css.
Redux isn't used since I was running on the clock so I resorted to [State lifting](https://reactjs.org/docs/lifting-state-up.html)
which is something I don't like.

### Demo Instructions

First, clone the repository. Then do a:
```
yarn
```
Will install all the dependencies and development dependencies. Then do a:
```
yarn dev
```

That's it.

--------------



`yarn dev` will first fire the API server (so you dont have to start a development server manually) included in the task and then fire a `webpack-dev-server` which will bundle
the files and open up our browser to `localhost:8080`. Doing this first time will take about 10 seconds. It will then start watching for changes
in the `src` folder and refresh the page automatically as we make the changes to our js files. Consecutive reloads will be in milliseconds.

> Note: Ive made some changes to the build process before starting to code.
>We were using ejs templating to render the index
> but in this solution, I had to remove that. Instead, a normal html page is displayed. I think this also
> eases up the build process when it comes to generating index.htmls for CI/CD (we can attach hash chunks to the name of
or bundle files and inject it inside the html).
>
> But this was only done to make the devServer compatible and live reload the index.
> Ive also moved certain dependencies from dependencies to devDependencies in `package.json`
> You can find all the rest of the changes on this commit id `99a217622e7ffd51a4ba98c184788c7974839f7f`




### Tests

I've also written some basic unit tests. It doesn't do a 100% coverage. But I completed this before hand and was left with a couple of hours
so I went ahead and added some tests. We're using
 - Facebook's [Jest](https://jestjs.io/) as our test runner and assertion library,
 - AirBnB's [Enzyme](http://airbnb.io/enzyme/) for some tooling on our tests,
 - [Sinon](https://sinonjs.org/) for spying and
 - Kent C. Dodd's [React Testing Library](https://github.com/kentcdodds/react-testing-library) for actual DOM testing because using Enzyme to simulate actual events was becoming a pain.

 To run the tests, we need to do a
 ```
 yarn test
 ```

 Since Jest also gives us a beautiful test coverage, we can also do a
 ```
 yarn coverage
 ```
Jest internally uses [Istanbul](https://istanbul.js.org/) to provide code coverage. Right now,
I've added some configs on our to `package.json` to put all the coverage report in the
`.coverage` folder. It's gitignored right now but once you run the above command,
it should make this folder. To see the report, just open the `index.html` inside the `.coverage` folder

I had a fun time doing this. It actually made realize Enzyme's shortcomings when it comes to simulating
actual DOM events. That's when I looked at React Testing Library and immediately fell in love with it.
Cheers!
