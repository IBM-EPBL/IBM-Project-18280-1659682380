import React from 'react'

const OrderTable = ({name,items,openModal,orderNo,total}) => {
  return (
    <div className="bg-light border">
        <h6 style={{padding:'10px',color:'white',backgroundColor:'#212529',margin:'0'}}>Order No. crwn-id#00{orderNo+1}</h6>
        <h6 style={{padding:'10px',backgroundColor:'#dfe0e1'}}>User : {name}</h6>
        <table className="table table-light table-striped table-hover" style={{textAlign:'center',margin:'0'}}>
      <thead>
        <tr>
          <th scope="col" style={{width:'150px'}}>Item Id.</th>
          <th scope="col" style={{width:'250px'}}>Product</th>
          <th scope="col" style={{width:'400px'}}>Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {
            items.map((item)=>{
                return <tr>
                <th scope="row" style={{width:'150px'}}>{item.id}</th>
                <td style={{width:'250px'}}><button type="button" className="btn btn-primary" onClick={()=>openModal(item.img_url)} style={{padding:'5px 10px'}} data-bs-toggle="modal" data-bs-target="#exampleModal">View</button>
                </td>
                <td style={{width:'400px'}}>{item.title}</td>
                <td>{item.quantity}</td>
                <td>&#8377; {item.price}</td>
              </tr>
            })
        }
        
      </tbody>
      <tfoot>
        <tr>
          <td style={{width:'150px'}}></td>
          <td style={{width:'250px'}}></td>
          <td style={{width:'400px'}}></td>
          <td>Total :</td>
          <td>&#8377; {total}</td>
        </tr>
      </tfoot>
    </table>
        </div>
  )
}

export default OrderTable
