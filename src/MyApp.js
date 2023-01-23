import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp() {
  const [characters, setCharacters] = useState([]);  


function removeOneCharacter (index) {
  var user_id = characters[index].id;
  makeDeleteCall(user_id).then( result => {
    if (result && result.status === 204)
      //  person = result.data;
      //  setCharacters([...characters, person] )
       console.log("Sucessfully deleted");
    });
 
  // const updated = characters.filter((character, i) => {
  //     return i !== index
  //   });
  //   setCharacters(updated);
  }

  useEffect(() => {
    fetchAll().then( result => {
       if (result)
          setCharacters(result);
     });
 }, [] );

 async function makePostCall(person){
  try {
     const response = await axios.post('http://localhost:5000/users', person);
     return response;
  }
  catch (error) {
     console.log(error);
     return false;
  }
}

async function makeDeleteCall(user_id){
  try {
     const response = await axios.delete('http://localhost:5000/users' + user_id);
     return response;
  }
  catch (error) {
     console.log(error);
     return false;
  }
}



  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:5000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
 }

  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 201)
       person = result.data;
       setCharacters([...characters, person] );
    });
 }
 
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}




export default MyApp;