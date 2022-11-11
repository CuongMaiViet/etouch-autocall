import { useState } from 'react'
import axios from 'axios'

const BASEURL =
  'https://api.jambonz.us/v1/Accounts/e070b51d-d203-41fe-9973-673170a5a5f6/Calls/'
const TOKEN = 'Bearer 0b9d2332-6f8b-4fc6-8ac1-b63a4993fac5'

const CallAPI = () => {
  const [percentage, setPercentage] = useState(0)

  const createCall = async ({ to = null }) => {
    if (to === null) {
      console.log('No phone number provided')
      return
    }

    const payload = {
      application_sid: 'a21e905b-6564-4ad8-baee-3f3a360a5678',
      from: '12345',
      to: {
        type: 'phone',
        number: to,
        trunk: 'fusionpbx',
      },
    }

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        let percent = Math.floor((loaded * 100) / total)
        console.log(`${loaded}kb of ${total}kb | ${percent}%`)
        if (percent <= 100) setPercentage(percent)
      },
      headers: {
        Authorization: TOKEN,
      },
    }

    await axios.post(BASEURL, payload, options).then((res) => {
      console.log(res)
      setTimeout(() => {
        setPercentage(0)
      }, 1000)
    })
  }

  const sendToN8N = async ({ data = null }) => {
    if (data === null) {
      console.log('No data provided')
      return
    }

    const N8N_WEBHOOK =
      'https://inter.epacific.net/webhook/1c47a8ae-29f1-4bfa-86c3-2fd784ca2efc'

    const n8nHeader = new Headers()
    n8nHeader.append('Content-Type', 'application/x-www-form-urlencoded')

    const n8nPayload = new URLSearchParams()
    data.forEach((e) => n8nPayload.append('number', e))

    await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: n8nHeader,
      mode: 'no-cors',
      body: n8nPayload,
    })
  }

  return {
    percentage,
    createCall,
    sendToN8N,
  }
}

export default CallAPI
