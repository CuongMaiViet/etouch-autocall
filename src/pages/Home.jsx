import React from 'react'
// import CallAPI from '../apis/CallAPI'
import ImportCSV from '../functions/ImportCSV'

const Home = () => {
  // const { createCall, sendToN8N } = CallAPI()
  const { ButtonImportCSV, phoneList } = ImportCSV()

  return (
    <div>
      {ButtonImportCSV()}
      {/* <button onClick={() => sendToN8N({ data: phoneList })}>Send</button> */}
    </div>
  )
}

export default Home
