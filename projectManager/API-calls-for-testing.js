// all of the calls require:
// authorization : 'helloworld'

let APICalls = [
  {
    // creates a new task
    name:'POST /task',
    url:'http:192.168.8.101:1337/task',
    payload: {
      "name": "Dig a potato",
      "description": "Take a shovel",
      "workHours": 2,
      "overtimeHours": 3,
      "status": "backlog",
      "project": 1,
      "assignedTo": 1
    }
  },
  {
    // gets projects for manager
    name:'GET /projects-for-manager/:id',
    url:'http:192.168.8.101:1337/projects-for-manager/:id',
    payload: {
      // not required
    },
  },
  {
    // gets overtime for developer
    name:'GET /developer-overtime/:id',
    url:'http:192.168.8.101:1337/developer-overtime/:id',
    payload: {
      // not required
    },
  },
  {
    // updates task
    name:'PUT /task/:id',
    url:'http:192.168.8.101:1337/task/:id',
    payload: {
      "name": "Dig a Hole in the ground",
    },
  },
  {
    //delete specific task
    name:'DELETE /task/:id',
    url:'http:192.168.8.101:1337/task/:id',
    payload: {
      // not required
    },
  },
]
