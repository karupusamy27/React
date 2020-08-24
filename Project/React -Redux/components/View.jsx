import React from 'react';
import { NavLink } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { connect } from 'react-redux';


class View extends React.Component {
    constructor(props) {

        super(props);

        this.state = {

            claims: [],
            date: ' ',
            time:' '
        }
    };
    getDate() {
        var newDate = new Date();
        var date = newDate.getDate();
        var month = newDate.getMonth() + 1;
        var year = newDate.getFullYear();
        var hh = newDate.getHours();
        var mm = newDate.getMinutes();
        var ss = newDate.getSeconds();
        var displayDate=date+'-'+month+'-'+year;
        var displayTime=hh+':'+mm+':'+ss;
        this.setState({
            date:displayDate,
            time:displayTime 
        });
    }
    componentDidMount() {
    this.getDate();
        axios.get(`http://localhost:7000/claims`)
            .then(res => {
                const claims = res.data;
                this.props.dispatch(this.viewList(claims))
            })
    }
    viewList(claims){
        return{
            type:'LIST',
            claims:claims
        }
    }
    render() {
        console.log('Claims List', this.props.claims);
        return (
            <div>
                <header>
                    <h1>Claim Management System</h1>
                </header>
                <div className="topnav">
                    <NavLink to="/">Login</NavLink>
                    <NavLink to="/view" className="active">View Claim Summary</NavLink>
                    <NavLink to="/submit">Update Claim</NavLink>
                    <div className="topnav_right">
                        <p>Welcome karupu</p>
                        <p>{this.state.date} {this.state.time}</p>
                        <NavLink to="/">Logout</NavLink>
                    </div>
                </div>
                <div className='wrapper1'>
                    <h2>View Claim Summary</h2>
                    <h1>{this.props.username}</h1>
                    <Table striped bordered hover variant="dark" className="center">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Claim Number</th>
                                <th>Claim Type</th>
                                <th>Claim Programs</th>
                                <th>Claim Start date</th>
                                <th>Claim End date</th>
                                <th>Update Claim Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.claims.map(claim => <tr>
                            <td>{claim.id}</td>
                                <td>{`${claim.first_name} ${claim.last_name}`}</td>
                                <td>{claim.claim_num}</td>
                                <td>{claim.claim_type}</td>
                                <td>{claim.claim_pro}</td>
                                <td>{claim.claim_sd}</td>
                                <td>{claim.claim_ed}</td>
                                <td><NavLink to={`/submit/${claim.id}`} >UPDATE</NavLink></td>
                                </tr>)}

                        </tbody>
                    </Table>
                </div>
                <footer>
                    <p></p>
                </footer>
            </div>
        );
    }
}
const mapStateToProps = state => {

    console.log('App state', state);

    return { claims: state.claims }

}

export default connect(mapStateToProps)(View);