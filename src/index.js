import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from "react-apollo"
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const restLink = new RestLink({
  uri: process.env.REACT_APP_HTTP_URL,
  headers: {
    "Content-Type": "application/json"
  },
 });

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
