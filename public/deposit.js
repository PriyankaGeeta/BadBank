function Deposit() {
    const ctx = React.useContext(UserContext); 
    const [status, setStatus]     = React.useState(true);
    const [balance,setBalance] = React.useState("");
    const [enableButton, setEnableButton] = React.useState(false);
    
    
    function fetchAccount() {
        if (ctx.user!=='') { 
        fetch(`/account/balance/${ctx.email}`)
        .then(response => response.json())
        .then(data => {
                console.log(data);
                setBalance('Your current balance is : $' + data[0].balance);
        });
        } 
    }

    fetchAccount();

    function validateAmount(e){
        if (e.currentTarget.value <= 0) {
            setStatus("Amount cannot be negative");
            setEnableButton(false)
            setTimeout(() => setStatus(""), 1000);
            
        }
        
        else{
        ctx.balance=e.currentTarget.value;
        setEnableButton(true)
        }
       
    }

        
    

    function depositAmount() {
        if (ctx.user!=='') { 
        setStatus(`$${ctx.balance} deposit successful!`);
        setTimeout(() => setStatus(''),2000);

        ctx.balance.toString();
        const url = `/account/deposit/${ctx.user}/${ctx.balance}`;
        (async () => {
            var res = await fetch(url);
            var data = await res.json();
            console.log(data);
        })();
         setEnableButton(false)
        } else {
            setStatus('Login to make a deposit');
            setTimeout(() => setStatus(''),3000);
        }
    }

    return (
        <Card
            bgcolor="success"
            header="Deposit"
            text={balance}
            status={status}
            body={
                <>
                Amount
                <br/>
                <input type="number" className="form-control" placeholder="Enter amount" onChange={e => validateAmount(e) }/>
                <br/>
                {<button type="submit" className="btn btn-light" onClick={depositAmount} disabled={!enableButton}>Deposit</button>}
                </>
            }
        />
    )
}


