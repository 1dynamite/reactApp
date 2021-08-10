const list = async (signal) => {
    try {
      let response = await fetch('/api/topics/', {
        method: 'GET',
        signal: signal,
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  const read = async (signal) => {
    try {
      let response = await fetch('/api/topics/education/', {
        method: 'GET',
        signal: signal,
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  export {
    list,
    read
  }