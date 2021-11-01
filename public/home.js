function Home() {
    
    return (
        <Card
        bgcolor="primary"
        header="BadBank International Bank"
        title="Welcome to the BadBank"
        text="You can move around using the navigation bar."
            body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
        />
    )
}