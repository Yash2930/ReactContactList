import { useEffect, useState } from "react";
import contactStyle from "./AddContact.module.css"

function AddContacts({onSubmit,onClose,editcontact,showedit}){
  

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
  
useEffect(()=>{
  if (editcontact) {
    setName(editcontact.name);
    setEmail(editcontact.email);
    setPhone(editcontact.number);
  }
},[editcontact])
  

 const handlesubmit= async (e)=>{
    e.preventDefault();
    const formData = { name, email, phone };
    
    onSubmit(formData);
    
    setName("");
    setEmail("");
    setPhone("");
    
 }

 const handleClose=()=>{
 onClose();

 }

    return(
   <>
    <div className={contactStyle.contactForm}>
              <img className={contactStyle.close} onClick={handleClose} src="https://cdn-icons-png.flaticon.com/128/4034/4034637.png"/>
              <form className={contactStyle.ContactForm} onSubmit={handlesubmit}>
                <h1 className={contactStyle.text}>Enter contact details.</h1>
                <div className={contactStyle.InputConatiner}>
                  <input className={contactStyle.Inputs}
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                    placeholder="Contact Name"
                  />
                  <input className={contactStyle.Inputs}
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    placeholder="Contact Email"
                  />
                  <input className={contactStyle.Inputs}
                    type="text"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    required
                    placeholder="Contact Number"
                  />
                </div>
                <input className={contactStyle.Inputs} type="submit" value="Add Contact" />
              </form>
            </div>
   </>
     )
}

export default AddContacts;