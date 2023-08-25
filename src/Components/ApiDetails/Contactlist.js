
import contactStyles from "./ContactList.module.css" 


function Contactlist(props){
 const {id,name,number,email,updateContact,deletecontact}=props;
 return(
    <>
    <div className={contactStyles.container}>
    <div className={contactStyles["Contact-details"]}>
    <h1 className={contactStyles.left}>{name}</h1>
    <h1 className={contactStyles.center}>{email}</h1>
    <h1 className={contactStyles.right}>{number}</h1>
    </div>
    <img className={contactStyles.icons} onClick={()=>updateContact({id,name,email,number})} src="https://cdn-icons-png.flaticon.com/128/1160/1160758.png"></img>
    <img className={contactStyles.icons} onClick={()=>deletecontact(id)} src="https://cdn-icons-png.flaticon.com/128/6096/6096937.png"></img>
    
  </div>
  </>
 )   
}

export default Contactlist;