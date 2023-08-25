import { useEffect, useState } from "react";
import "./App.css"; // Import your CSS file for styling
import Contactlist from "./Components/ApiDetails/Contactlist";
import AddContacts from "./Components/ContactDetails/AddContacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [showAddContact,setShowAddContact]=useState(false);
  const [editcontact,setEditContact]=useState(null);
  const [showedit,setShowEdit]=useState(false);
  

  async function fetchContacts() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setContacts(data)
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);


  function handleAddContact(){
    setShowAddContact(true);
  }

  const handleFormSubmit = async (formData) => {
    if (editcontact) {
      // Update an existing contact
      await fetch(`https://jsonplaceholder.typicode.com/users/${editcontact.id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const updatedContact={
        id:editcontact.id,
        name:formData.name,
        phone:formData.phone,
        email:formData.email
      }
       function editedcontacts (updatedContact) {
          const updatedContacts = contacts.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact
        );
        console.log(updatedContact)
        setContacts(updatedContacts);
        
        }
        editedcontacts(updatedContact)
    } else {
      // Add a new contact
      await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        const contact={
          id:new Date().getTime(),
          name:formData.name,
          phone:formData.phone,
          email:formData.email
        }
        setContacts([contact,...contacts])
    }
  
    // Clear the editcontact and showEdit states
    setEditContact(null);
    setShowEdit(false);
    setShowAddContact(false);
   
  };
  

  const onClose=()=>{
    setShowAddContact(false);
    setEditContact(null);
  }


  const updateContact= async (contact)=>{
    setEditContact(contact)
    setShowEdit(true);
    setShowAddContact(true);
  }


  const deletecontact=(id)=>{
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    });
   
  const deletedcontacts=contacts.filter((contact)=> contact.id!==id)
    
  setContacts(deletedcontacts)
  }

  return (
    <> 
    <div className="App">
      <h1 className="centered-text">Welcome to the contact List</h1>
      <button className="right-corner-button" onClick={handleAddContact}>Add Contact</button>
    </div>
    <div class="contacts-header">
    <span  id="th-name">Name:</span>
    <span  id="th-email">Email:</span>
    <span  id="th-phone">Number:</span>

   </div>

   <div className="content">
  { showAddContact &&
   <div className="contact-form-wrapper">
   <AddContacts onSubmit={handleFormSubmit} onClose={onClose} editcontact={editcontact} showedit={showedit}/>
   </div>
  }
    </div>
  
     {contacts.map((contact,index)=> <Contactlist
      key={index}
      id={contact.id}
      name={contact.name}
      email={contact.email}
      number={contact.phone}
      updateContact={updateContact}
      deletecontact={deletecontact}
      /> 
       )}
    </>
  );
}

export default App;
