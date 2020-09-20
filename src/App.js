/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createNewWatch } from './graphql/mutations'
import { getWatchList } from './graphql/queries'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', bitcoinaddress: '' }

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [watches, setWatches] = useState([])

  useEffect(() => {
    fetchWatches()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchWatches() {
    try {
      const watchData = await API.graphql(graphqlOperation(getWatchList))
      const watches = watchData.data.getWatchList
      setWatches(watches)
    } catch (err) { console.log('error fetching watches') }
  }

  async function addWatch() {
    try {
      console.log('Create watch:', { ...formState })
      if (!formState.name || !formState.bitcoinaddress) return
      const watch = { ...formState }
      setWatches([...watches, watch])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createNewWatch, {name: formState.name, bitcoinaddress: formState.bitcoinaddress}))
    } catch (err) {
      console.log('error creating watch:', err)
    }
  }

  return (
      <div style={styles.container}>
        <h2>Bitcoin Watch List</h2>
        <input
            onChange={event => setInput('name', event.target.value)}
            style={styles.input}
            value={formState.name}
            placeholder="Name"
        />
        <input
            onChange={event => setInput('bitcoinaddress', event.target.value)}
            style={styles.input}
            value={formState.bitcoinaddress}
            placeholder="bitcoinaddress"
        />
        <button style={styles.button} onClick={addWatch}>Create Watch</button>
        {
          watches.map((watch, index) => (
              <div key={watch.id ? watch.id : index} style={styles.watch}>
                <p style={styles.watchName}>{watch.name}</p>
                <p style={styles.watchBitcoinAddress}>{watch.bitcoinaddress}</p>
                <p style={styles.watchBalance}>{watch.balance}</p>
              </div>
          ))
        }
      </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
  watch: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  watchName: { fontSize: 20, fontWeight: 'bold' },
  watchBitcoinAddress: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default App