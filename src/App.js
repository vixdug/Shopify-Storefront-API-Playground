import React, { Component } from 'react';
import './App.css';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';



class App extends Component {
  render() {

    if (this.props.shopData && this.props.shopData.loading) {
      return <div>Loading....soon</div>
    }

    // error retrieving shop data
    if (this.props.shopData && this.props.shopData.error) {
      return <div>Nope, better luck next time.</div>
    }

    // display products
    const productsToDisplay = this.props.shopData.shop.products
    return (
      <div classname="App">
        <div className="products-grid">

          {productsToDisplay.edges.map((el, i)=> {
            return(
              <div key={i}>
                <img src={el.node.images.edges[0].node.src} height="302" width="302"/>
                <h2>{el.node.title}</h2>
                <h4> {el.node.description}</h4>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
//gql template tag for parsing 

const HOME_QUERY = gql`
  query ShopData {
    shop {
      name
      description
      products(first:10, query:"tag:'local'") {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            title
            description
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;

// export default App;
export default graphql(HOME_QUERY, {name: 'shopData'})(App);