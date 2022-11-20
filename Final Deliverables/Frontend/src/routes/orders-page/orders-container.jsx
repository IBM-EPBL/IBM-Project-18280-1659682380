import React, { useEffect,useState } from 'react'
import ImageModal from './image-modal.component'
import OrderTable from './table.component'


const OrderContainer = () => {

  const [data,setData] = useState([])
  const [imgUrl,setImgUrl] = useState("")
  const [productName,setProductName] = useState("")
  const openModal = (img_url,productName) => {
    console.log(imgUrl+" "+productName)
    setProductName(productName)
    setImgUrl(img_url)
  }

  useEffect(()=>{
   const fetchData = async () =>{
    return fetch('/admin',{
      'methods':'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
   .then(response => setData(response))
   .catch(error => console.log(error))
  
   } 
   fetchData()
  },[])

  return (
    <div style={{margin:'50px'}}>
      <div className="vstack gap-3">
        {
          data.map(({name,items,total}, idx)=>{
            return <OrderTable key={idx} orderNo={idx} openModal={openModal} total={total} userName={name} items={items} />              
          })
        }
        <ImageModal productName={productName} imgUrl={imgUrl}/>
        </div>
    </div>
  )
}

export default OrderContainer
