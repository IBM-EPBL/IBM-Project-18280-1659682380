import React, { useEffect, useState } from 'react'

const UserContainer = () => {
  const [users,setUsers] = useState([])
  useEffect(()=>{
    const fetchUsers = async () => {
      const response = await fetch('/user-details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const response_1 = await response.json()
      return setUsers(response_1)
    }
    fetchUsers()
  },[])
  return (
    <div style={{margin:'50px'}}>
      <table className="table table-dark table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">S.No.</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Account Created</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user, idx)=>{
            return (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                <td>{user.NAME}</td>
                <td>{user.EMAIL}</td>
                <td>{user.DATE_CREATED}</td>
              </tr>)
          })
        }
        
      </tbody>
    </table>
  </div>
  )
}

export default UserContainer
