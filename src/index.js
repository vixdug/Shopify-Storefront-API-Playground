import React from 'react';
 import ReactDOM from 'react-dom';
 import './index.css';
 import App from './App';
 import ApolloClient from 'apollo-client';
 import { HttpLink } from 'apollo-link-http';
 import { ApolloLink, concat } from 'apollo-link';
 import { ApolloProvider } from 'react-apollo';
 import { InMemoryCache } from 'apollo-cache-inmemory';

 import { graphql } from 'react-apollo';
 import gql from 'graphql-tag';


const httpLink = new HttpLink({ uri: 'https://api-test-store-vix.myshopify.com/api/graphql' });

// auth headers 
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
    operation.setContext({
      headers: {
        'X-Shopify-Storefront-Access-Token': 'dfe36e96a80046885f8167d102f063e9'
      } 
    });

    return forward(operation);
  })

  const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

// create a provider to connect the ApolloClient to your react component tree.

ReactDOM.render((
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ),
  document.getElementById('root')
);

