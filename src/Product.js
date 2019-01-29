import React, { Component } from 'react';

class Product extends Component {
  render() {
    const {images, title, description, options} = this.props.product
    const productOptions = options.map((option, i) => {
      return(
        <select name="{option.name}" key="{option.name}">
        {option.values.map((value) => {
        return (
        <option value="{value}" key="{`${option.name}-${value}`}">{value}</option>
        )
        })}
        </select>
 )
})
    return (
      <div classname="Product">
        <img src={images.edges[0].node.src} height="302" width="302"/>
        <h2>{title}</h2>
        <p> {productOptions}</p>
        <h4>{description}</h4>
      </div>
    );
  }
}

export default Product;