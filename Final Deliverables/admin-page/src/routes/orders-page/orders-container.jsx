import React, { useEffect,useState } from 'react'
import ImageModal from './image-modal.component'
import OrderTable from './table.component'


const OrderContainer = () => {

  const [data,setData] = useState([])
  const [imgUrl,setImgUrl] = useState("")

  const openModal = (img_url) => {
    setImgUrl(img_url)
    console.log(imgUrl)
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
  useEffect(() => console.log(data),[data]);
  // useEffect(()=>{
  //   data.map(({name,items})=>{
  //     console.log(items)
  //   })
  // })

  return (
    <div style={{margin:'50px'}}>
      <div className="vstack gap-3">
        {
          data.map(({name,items,total}, idx)=>{
            return <OrderTable orderNo={idx} openModal={openModal} total={total} name={name} items={items} />              
          })
        }
        <ImageModal imgUrl={imgUrl}/>
        </div>
    </div>
  )
}

export default OrderContainer
