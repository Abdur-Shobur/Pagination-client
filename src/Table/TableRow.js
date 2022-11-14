import React from 'react'

function TableRow({ data, id, current_num }) {
  const { title, category, brand, price } = data
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="py-4 px-6">{id + 1 + current_num}</td>
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {title}
      </th>
      <td className="py-4 px-6">{brand}</td>
      <td className="py-4 px-6">{category}</td>
      <td className="py-4 px-6">${price}</td>
      <td className="py-4 px-6 text-right">
        <a
          href="a"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a>
      </td>
    </tr>
  )
}

export default TableRow
