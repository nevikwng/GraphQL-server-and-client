let mockData = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', status: 'done', age: 30 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', status: 'todo', age: 30 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', status: 'todo', age: 30 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', status: 'todo', age: 30 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', status: 'todo', age: 30 },
  { id: 6, lastName: 'Melisandre', firstName: 'Daenerys', status: 'todo', age: 30 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', status: 'todo', age: 30 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', status: 'todo', age: 30 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', status: 'todo', age: 30 }
]

export const resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return mockData
    },
  },
  Mutation: {
    createUser(root, args, context) {
      args.id = mockData.length + 1
      mockData.push(args)
      console.log(args);
      return args
    },
    deleteUser(root, args, context) {
      mockData = mockData.filter(el => el.id !== Number(args.id))
      return args
    },
  }
}
