import React, { useEffect, useRef, useState } from 'react'
import { PropagateLoader } from 'react-spinners'
import TableRow from './TableRow'

function Table() {
  let [loading, setLoading] = useState(true)
  const [pLowToHigh, setPLowToHigh] = useState(1)
  const [searchfild, setSearchFild] = useState('')
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [page, setPages] = useState(100)
  const [count, setCount] = useState(0)
  const search_ref = useRef()
  const current_num = parseInt(page) * parseInt(currentPage)
  useEffect(() => {
    const url = `http://localhost:5000/product-data?size=${page}&page=${currentPage}&search=${searchfild}&sortby=${pLowToHigh} `
    setLoading(true)

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.products)
        setCount(data.count)
        setLoading(false)
      })
      .catch((err) => setLoading(false))
  }, [page, currentPage, searchfild, pLowToHigh])

  const totalpages = Math.ceil(count / page)
  const pagess = [...Array(totalpages).keys()]

  //  seleted items
  //  seleted items
  const pagination_hendel = (e) => {
    setCurrentPage(e)
  }

  const search_hender = () => {
    // e.preventDefault()
    // const search = e.target.search.value
    const serarch_value = search_ref.current.value
    setSearchFild(serarch_value)
  }

  const sort_by_value_handler = (e) => {
    const value = e.target.value
    setPLowToHigh(value)
    // if (value === '1' || value === '-1') {
    // } else {
    //   const trims = value.split('-')
    //   const newValue1 = trims[0]
    //   const newValue2 = trims[1]
    // }
  }

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto relative shadow-md ">
        <div className="shadow flex justify-end p-2 gap-5">
          <div>
            <select
              onClick={(e) => setPages(e.target.value)}
              className="select select-bordered w-full max-w-xs border-yellow-500"
            >
              <option value="1000">1000</option>
              <option value="500">500</option>
              <option selected value="100">
                100
              </option>
              <option value="50">50</option>
              <option value="25">25</option>
              <option value="15">15</option>
              <option value="10">10</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <div className="flex items-center">
              <input
                ref={search_ref}
                type="text"
                name="search"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs rounded-r-none border-yellow-500"
              />
              <select className="select select-bordered rounded-none border-yellow-500">
                <option selected value="100">
                  Brand
                </option>
                <option value="50">50</option>
                <option value="25">25</option>
                <option value="15">15</option>
              </select>
              <select className="select select-bordered rounded-none border-yellow-500">
                <option selected value="100">
                  Category
                </option>
                <option value="50">50</option>
                <option value="25">25</option>
                <option value="15">15</option>
              </select>
              <button
                onClick={search_hender}
                className="btn bg-yellow-500 text-white hover:bg-yellow-600 border-none rounded-l-none"
              >
                Search
              </button>
            </div>
          </div>
          <div>
            <select
              className="select select-bordered w-full max-w-xs border-yellow-500"
              onChange={sort_by_value_handler}
            >
              <option className="py-10 my-10  " value="1" selected disabled>
                Sort By
              </option>
              <option className="py-10 my-10 " value="1">
                Price Low To High
              </option>
              <option className="py-10 my-10 " value="-1">
                Price High To Low
              </option>
              <option value="0-100" className="py-10 my-10 ">
                $0 - $100
              </option>
              <option value="100-300" className="py-10 my-10 ">
                $100 - $300
              </option>
              <option value="301-1000" className="py-10 my-10 ">
                $301 - $1000
              </option>
              <option value="1000-5000" className="py-10 my-10 ">
                $1000 - $5000
              </option>
              <option value="5000-0" className="py-10 my-10 ">
                $5000 +
              </option>
            </select>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 relative">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="border-t">
              <th scope="col" className="py-3 px-6">
                sr
              </th>
              <th scope="col" className="py-3 px-6">
                Product name
              </th>
              <th scope="col" className="py-3 px-6">
                Brand
              </th>
              <th scope="col" className="py-3 px-6">
                Category
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <div className="absolute left-1/2 top-14">
            <PropagateLoader loading={loading} color="#36d7b7" />
          </div>
          <tbody>
            {data?.map((e, id) => (
              <TableRow
                key={e._id}
                data={e}
                id={id}
                current_num={current_num}
              />
            ))}
          </tbody>
        </table>
        <div className="my-5">
          <div>You are In {currentPage + 1} Page</div>
          {pagess.map((e) => (
            <button
              key={e}
              className={`btn btn-sm  mx-1 rounded-sm hover:bg-blue-400 hover:text-white mt-3 ${
                currentPage === e ? 'bg-blue-400 text-white' : ''
              }`}
              onClick={() => pagination_hendel(e)}
            >
              {e + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Table
