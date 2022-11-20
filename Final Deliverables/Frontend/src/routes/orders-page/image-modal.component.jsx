import React from 'react'

const ImageModal = ({imgUrl,productName}) => {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">{productName}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <img src={imgUrl} alt={`${productName}`} className='img-fluid' />
      </div>
    </div>
  </div>
</div>
  )
}

export default ImageModal