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

  const read = async (signal, lessonId) => {
    try {
      let response = await fetch('/api/topics/' + lessonId, {
        method: 'GET',
        signal: signal,
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  const create = async (lesson, token) => {
    try {
        let response = await fetch('/api/topics/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(lesson)
        })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  const update = async (lesson, token) => {
    try {
        let response = await fetch('/api/topics/' + lesson._id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(lesson)
        })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  const remove = async (lessonId, token) => {
    try {
      let response = await fetch('/api/topics/' + lessonId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  export {
    list,
    read,
    create,
    update,
    remove
  }