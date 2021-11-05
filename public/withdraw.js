function Withdraw() {
    const ctx = React.useContext(UserContext); 
    const [status, setStatus]     = React.useState(true);
    const [balance,setBalance] = React.useState("");
    const [dbbalance,setdbbalance] = React.useState(0);
    const [enableButton, setEnableButton] = React.useState(false);
    
    function fetchAccount() {
        if (ctx.user!=='') { 
        fetch(`/account/balance/${ctx.email}`)
        .then(response => response.json())
        .then(data => {
                console.log(data);
                setdbbalance(parseInt(data[0].balance))
                setBalance('Your current balance is : $' + data[0].balance);
        });
        } 
    }

    fetchAccount();


    function validateAmount(e){
        if (isNaN(+e.currentTarget.value)){
            setStatus("ERROR : NAN! Amount entered should be a Number");
            setEnableButton(false)
            setTimeout(() => setStatus(""), 3000);
            return;
        }

        if (e.currentTarget.value <= 0) {
            setStatus("ERROR : Amount cannot be negative");
            setEnableButton(false)
            setTimeout(() => setStatus(""), 3000);
            
        }
        
        else{
        ctx.balance=e.currentTarget.value;
        setEnableButton(true)
        }
       
    }


    function withdrawAmount() {
        if (ctx.user!=='') { 
        if (ctx.balance > dbbalance){
            setStatus("ERROR: Transaction Failed, Amount greater than current Balance");
            setTimeout(() => setStatus(""), 3000);
            return;
        }
        else {
        setStatus(`$${ctx.balance} withdrawal successful!`);
        setTimeout(() => setStatus(''),2000);

        ctx.balance.toString();
        const url = `/account/withdraw/${ctx.email}/${ctx.balance}`;
        (async () => {
            var res = await fetch(url);
            var data = await res.json();
            console.log(data);
        })();
        setEnableButton(false)
        }
    } 
        
        else {
            setStatus('Login to make a withdrawal');
            setTimeout(() => setStatus(''),3000);
        }
    }

    return (
        <Card
            bgcolor="danger"
            header="Withdraw"
            text={balance}
            status={status}
            body={
                <>
                Amount
                <br/>
                <input type="number" className="form-control" placeholder="Enter amount" onChange={e => validateAmount(e) }/>
                <br/>
                {<button type="submit" className="btn btn-light" onClick={withdrawAmount} disabled={!enableButton}>Withdraw</button>}
                </>
            }
        />
    )
}
