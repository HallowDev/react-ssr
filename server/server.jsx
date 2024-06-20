const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const axios = require('axios');
const App = require('../src/App');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/', async (req, res) => {
  try {
    const { data: tasks } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    const appString = renderToString(React.createElement(App, { tasks: tasks.slice(0, 10) }));

    const indexFile = path.resolve(__dirname, '../build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }

      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${appString}</div>`
        )
      );
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Error fetching tasks');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
