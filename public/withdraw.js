function Withdraw() {
    const ctx = React.useContext(UserContext); 
    const [status, setStatus]     = React.useState(true);
    const [balance,setBalance] = React.useState(0)
    
    function fetchAccount() {
        if (ctx.user!=='') { 
        fetch(`/account/balance/${ctx.email}`)
        .then(response => response.json())
        .then(data => {
                console.log(data);
                setBalance('$' + data[0].balance);
        });
        } 
    }

    fetchAccount();


    function withdrawAmount() {
        if (ctx.user!=='') { 
        setStatus(`$${ctx.balance} withdrawal successful!`);
        setTimeout(() => setStatus(''),2000);

        ctx.balance.toString();
        const url = `/account/withdraw/${ctx.email}/${ctx.balance}`;
        (async () => {
            var res = await fetch(url);
            var data = await res.json();
            console.log(data);
        })();
        } else {
            setStatus('Login to make a withdrawal');
            setTimeout(() => setStatus(''),3000);
        }
    }

    return (
        <Card
            bgcolor="success"
            header="Withdraw"
            text={balance}
            status={status}
            body={
                <>
                <CardForm
                    showName="none"
                    showPassword="none"
                    showEmail="none"
                />
                {<button type="submit" className="btn btn-light" onClick={withdrawAmount}>Withdraw</button>}
                </>
            }
        />
    )
}