import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CallAPI from '../apis/CallAPI'
import './index.css'

const ImportCSV = () => {
  const [file, setFile] = useState(null)
  const [phoneList, setPhoneList] = useState(null)
  const { sendToN8N } = CallAPI()

  const fileReader = new FileReader()

  const handleOnChange = (e) => {
    setFile(e.target.files[0])
  }

  useEffect(() => {
    if (file) {
      fileReader.readAsText(file)
      fileReader.onload = function (event) {
        const csvOutput = event.target.result.trim().split('\r\n')
        setPhoneList(csvOutput)
        sendToN8N({ data: csvOutput })
      }
    }
  }, [file])

  const ButtonImportCSV = () => (
    <div className="btn_import">
      <div className="outer">
        <input
          className="btn_import__csv"
          type={'file'}
          id={'csvFileInput'}
          accept={'.csv'}
          onChange={handleOnChange}
        />
      </div>
    </div>
  )

  return { ButtonImportCSV, phoneList }
}

export default ImportCSV
