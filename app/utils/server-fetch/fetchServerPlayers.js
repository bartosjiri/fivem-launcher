import axios from "axios"

const fetchServerPlayers = async (address) => {
  try {
    const res = await axios.get(`http://${address}/players.json`, {headers: {'Access-Control-Allow-Origin': '*'}})
    return res.data
  } catch (err) {
    // console.log(`Error while fetching players for ${address}: `, err) // @DEBUG
    return null
  }
}

export default fetchServerPlayers