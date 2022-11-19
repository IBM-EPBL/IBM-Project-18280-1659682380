import React from 'react'

const ProductDetail = () => {
  return (
    <>
    <div className="card" style={{width: "20rem",margin:'25px'}}>
    <img src="https://www.themanual.com/wp-content/uploads/sites/9/2020/07/best-sneakers.jpg?p=1" class="card-img-top"/>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">An item</li>
    <li className="list-group-item">A second item</li>
    <li className="list-group-item">A third item</li>
  </ul>
  <div className="card-body">
    <button href="#" className="btn btn-light">Card link</button>
    <button href="#" className="btn btn-light">Another link</button>
  </div>
</div>
    </>
  )
}

export default ProductDetail