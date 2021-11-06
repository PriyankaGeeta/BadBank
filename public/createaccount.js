function CreateAccount(props){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');
    const ctx = React.useContext(UserContext);
    const [enableButton, setEnableButton] = React.useState(false);
    const [validName,setValidName] = React.useState(false);
    const [validEmail,setValidEmail] = React.useState(false);
    const [validPassword,setValidPassword] = React.useState(false);

  

    function nameSubmit(e){
        if(e.currentTarget.value == '' && (validEmail && validPassword)) {
            setValidName(false);
            setStatus("ERROR : Name cannot be blank")
            setEnableButton(false)
        } 
        if(e.currentTarget.value.length > 0 && (validEmail && validPassword) ) {
            ctx.name=e.currentTarget.value;
            setStatus("")
            setValidName(true);
            setEnableButton(true)
        }
        
      }
    
      function emailSubmit(e){
        if(e.currentTarget.value == ''  && (validName && validPassword)) {
            setValidEmail(false);
            setStatus("ERROR : Email cannot be blank");
            setEnableButton(false)
            
        } 
        
        if(e.currentTarget.value.length > 0  && (validName && validPassword))  {
            ctx.email=e.currentTarget.value;
            let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regEmail.test(ctx.email)){
                setStatus("ERROR : Enter the valid email id!")
                setValidEmail(false);
                setEnableButton(false)
            }
            else{
            setStatus("")
            setValidEmail(true);
            setEnableButton(true)
            }
        }
        
      }
      
      function passwordSubmit(e){
        if((e.currentTarget.value.length <= 7) && validEmail && validName) {
            setValidPassword(false);
            setStatus("ERROR : Password must be minimum 8 character")
            setEnableButton(false)
        } 
        if((e.currentTarget.value.length > 7) && validEmail && validName ){
            setValidPassword(true);
            setStatus("")
            ctx.password=e.currentTarget.value;
            setEnableButton(true)
            
        }
        
        
        
      }
    

    function addUser() {
        ctx.balance = '0';
        fetch(`/account/find/${ctx.email}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.length===0) ctx.user = true;
        })
        .then(() => {
        if (ctx.user===true) {
            const url = `/account/create/${ctx.name}/${ctx.email}/${ctx.password}/${ctx.balance}`;
            (async () => {
                var res = await fetch(url);
                var data = await res.json();
                console.log(data);
            })();
            ctx.user='';
            setShow(false);
        } else {
            ctx.user='';
            setStatus('User already exists with that email');
            setTimeout(() => setStatus(''),3000);
        }})
    }

    return (
        <Card
            bgcolor="warning"
            header="Create Account"
            text=""
            status={status}
            body={
                <>
                {show ? 
                <>
                Name
                 <input type="input" className="form-control" id="name" placeholder="Enter name" onChange={e => nameSubmit(e)}/>
                 <br/>
                    Email address
                <br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" onChange={e => emailSubmit(e)} />
                <br/>
                Password
                <br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={e => passwordSubmit(e)} />
                <br/>
                <button type="submit" className="btn btn-light" onClick={addUser} disabled={!enableButton}>Create Account</button>
                </>
                : 
                <Success setShow={setShow}/>}
                </>
            }
        />      
    );
}

function Success(props) {
    return (
        <>    
        <h5>Success!</h5><br/>
        <button type="submit" 
            className="btn btn-light" 
            onClick={() => props.setShow(true)}>Add another account</button>
        </>
    )
}
  
  
