function AllData() {
    const [data, setData] = React.useState([]);
    

    React.useEffect(() => {

        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                    
                    setData(data);
                    console.log(data);

            });
    }, []);

    function renderTableData(){
       return(
                data.map((num, index)=>
                (
                  <tr key={index}>
                      <td>{num.name}</td>
                        <td>{num.email}</td>
                        <td>{num.password}</td>
                  </tr>
                ))
            )
        }


    return (
        <Card
            bgcolor="primary"
            header="All Data"
            text=""
            status=""
            body={
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                        </tr>
                    </thead>
                    <tbody>{renderTableData()}</tbody>
                </table>
            }
        />
    )
}
