import React, { useEffect, useState } from 'react'
import Table from './Table'

function Index() {
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   fetch('http://localhost:5000/product-data')
  //     .then((res) => res.json())
  //     .then((data) => setData(data))
  // }, [])

  return (
    <div>
      <Table />
    </div>
  )
}

export default Index
