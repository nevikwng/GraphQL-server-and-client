import { gql, useQuery, useMutation } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      firstName
      lastName
      status
      age
    }
  }
`
const CREATE_USER = gql`
  mutation createUser($firstName: String!, $lastName: String!, $status: String!, $age: String! ) {
    createUser(firstName: $firstName, lastName: $lastName, status: $status, age: $age) {
      firstName
      lastName
      status
      age
    }
  }
`

const DEL_USER = gql`
  mutation deleteUser($id:ID!) {
    deleteUser(id:$id) {
      id
    }
  }
`
const Index = () => {
  const {
    data: { viewer },
  } = useQuery(ViewerQuery)

  const [createUser, { CreateUserError }] = useMutation(CREATE_USER, {
    refetchQueries: [ViewerQuery]
  });
  const [deleteUser, { deleteUserError }] = useMutation(DEL_USER, {
    refetchQueries: [ViewerQuery]
  });
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState("");
  const [age, setAge] = useState(33);

  const addTodo = async () => {
    try {
      if (lastName && firstName && status && age) {
        await createUser({
          variables: {
            lastName: lastName,
            firstName: firstName,
            status: status,
            age: age
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const TodoDone = async () => {
    try {
        await deleteUser({
          variables: {
            id: 1,
          },
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {

  }, [])


  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  return (
    <div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={viewer}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="FirstName"
            defaultValue={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="LastName"
            defaultValue={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="status"
            defaultValue={status}
            onChange={e => setStatus(e.target.value)}
          />
           <TextField
            required
            id="outlined-required"
            label="age"
            defaultValue={age}
            onChange={e => setAge(e.target.value)}
          />
        </div>
        <Button variant="outlined" onClick={addTodo}>Add</Button>
        <Button variant="outlined" onClick={TodoDone}>Del</Button>
      </Box>
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerQuery,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
