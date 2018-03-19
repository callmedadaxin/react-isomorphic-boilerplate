import React from 'react'

const User = (props) => {
  const { userList } = props

  return (
    <div>
      <h2>User</h2>
      <ul>
        {
          userList.list.map(item => (
            <li key={item.name}>{item.name}: {item.age}</li>
          ))
        }
      </ul>
      
    </div>
  )
}

export default User