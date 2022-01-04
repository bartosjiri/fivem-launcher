import axios from "axios"

const fetchServerInfo = async (address) => {
  try {
    const res = await axios.get(`http://${address}/info.json`, {headers: {'Access-Control-Allow-Origin': '*'}})
    return res.data
  } catch (err) {
    // console.log(`Error while fetching info for ${address}: `, err) // @DEBUG
    return null
  }
}

export default fetchServerInfo