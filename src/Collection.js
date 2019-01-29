import React, { Component } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const FEED_QUERY = gql`
{
  shop {
    productByHandle(handle: "zoo-art-mouse-pad") {
      id
      title
    }
  }
}
`

class Collection extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
    
          const testProduct = data.shop.productByHandle
          console.log(testProduct)
    //pass the GraphQL query as prop and <Query /> component will fetch the data for you under the hood, then it’ll make it available in the component’s render prop function.

          return (
            <div>
            {testProduct.title}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Collection;