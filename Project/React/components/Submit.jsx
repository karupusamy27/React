import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const validateNumber = RegExp(/^(?:\(\w{3}\)|\w{3}-)\d{3}-\d{3}$/);
class Submit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ' ',
            first_name: ' ',
            last_name: ' ',
            claim_num: null,
            claim_type: null,
            claim_pro: null,
            claim_sd: null,
            claim_ed: null,
            claim: {},
            date: ' ',
            time: ' ',
            errors: {
                claim_num: ' ',
                claim_type: ' ',
                claim_pro: ' ',
                claim_sd: '',
                claim_ed: '',
            }
        }
        this.handleClaimNum = this.handleClaimNum.bind(this);
        this.handleClaimType = this.handleClaimType.bind(this);
        this.handleClaimPro = this.handleClaimPro.bind(this);
        this.handleClaimSD = this.handleClaimSD.bind(this);
        this.handleClaimED = this.handleClaimED.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };
    getDate() {
        var newDate = new Date();
        var date = newDate.getDate();
        var month = newDate.getMonth() + 1;
        var year = newDate.getFullYear();
        var hh = newDate.getHours();
        var mm = newDate.getMinutes();
        var ss = newDate.getSeconds();
        var displayDate = date + '-' + month + '-' + year;
        var displayTime = hh + ':' + mm + ':' + ss;
        this.setState({
            date: displayDate,
            time: displayTime
        });
    }
    handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'claim_num':
                errors.claim_num =
                    validateNumber.test(value)
                        ? ''
                        : 'NumberFormat is not valid!';
                break;
            case 'claim_type':
                errors.claim_type =
                    value.length <= 0
                        ? 'Claim type must be Filled!'
                        : '';
                break;
            case 'claim_pro':
                errors.claim_pro =
                    value.length <= 0
                        ? 'Claim Program must be Filled!'
                        : '';
                break;
            case 'claim_sd':
                errors.claim_sd =
                    value.length <= 0
                        ? 'Claim Start Date must be Filled!'
                        : '';
                break;
            case 'claim_ed':
                errors.claim_ed =
                    value.length <= 0
                        ? 'Claim End Date must be Filled!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }
    handleClaimNum(event) {
        this.setState({ claim_num: event.target.value });
    }
    handleClaimType(event) {
        this.setState({ claim_type: event.target.value });
    }
    handleClaimPro(event) {
        this.setState({ claim_pro: event.target.value });
    }
    handleClaimSD(event) {
        this.setState({ claim_sd: event.target.value });
    }
    handleClaimED(event) {
        this.setState({ claim_ed: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const update = {
            id: this.state.claim.id,
            first_name: this.state.claim.first_name,
            last_name: this.state.claim.last_name,
            claim_num: this.refs['claim_num'].value,
            claim_type: this.refs['claim_type'].value,
            claim_pro: this.refs['claim_pro'].value,
            claim_sd: this.refs['claim_sd'].value,
            claim_ed: this.refs['claim_ed'].value
        };
        const id = this.props.match.params.id;
        axios.put(`http://localhost:7000/claims/${id}`, update)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/view');
            })
    }
    componentDidMount() {
        this.getDate();
        const id = this.props.match.params.id;
        axios.get(`http://localhost:7000/claims/${id}`)
            .then(res => {
                this.setState({ claim: res.data });
            })
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="body">

                <header>
                    <h1>Claim Management System</h1>
                </header>

                <div className="topnav">
                    <NavLink to="/" >Login</NavLink>
                    <NavLink to="/view" >View Claim Summary</NavLink>
                    <NavLink to="/submit" className="active">Update Claim</NavLink>
                    <div className="topnav_right">
                        <p>Welcome karupu</p>
                        <p>{this.state.date} {this.state.time}</p>
                        <NavLink to="/">Logout</NavLink>
                    </div>
                </div>
                <div className='wrapper2'>
                    <div className='form-wrapper1'>
                        <h2>Update Claim Details</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <div className='password1'>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Employeee Name</Form.Label>
                                    <Form.Control type="text" value={`${this.state.claim.first_name ? this.state.claim.first_name : ' '} ${this.state.claim.last_name ? this.state.claim.last_name : ' '}`} placeholder="EmployeeName" readOnly />
                                </Form.Group>
                            </div>
                            <div className='password1'>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Claim Number</Form.Label>
                                    <Form.Control type="text" ref="claim_num" name="claim_num" defaultValue={this.state.claim.claim_num} onChange={this.handleClaimNum} onChange={this.handleChange} placeholder="ClaimNumber" />
                                    {errors.claim_num.length >= 0 &&
                                        <span className='error'>{errors.claim_num}</span>}
                                </Form.Group>
                            </div>
                            <div className='password1'>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Claim Type</Form.Label>
                                    <Form.Control as="select" ref="claim_type" name="claim_type" onChange={this.handleClaimType} onChange={this.handleChange}>
                                        <option defaultValue={this.state.claim.claim_type ? this.state.claim.claim_type : ' '}>{this.state.claim.claim_type}</option>
                                        <option value="Submitted">Submitted</option>
                                        <option value="Received">Received</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Denied">Denied</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Paid">Paid</option>
                                        <option value="More Info Required">More Info Required</option>
                                    </Form.Control>
                                    {errors.claim_type.length > 0 &&
                                        <span className='error'>{errors.claim_type}</span>}
                                </Form.Group>
                            </div>
                            <div className='password1'>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Claim Program</Form.Label>
                                    <Form.Control type="text" ref="claim_pro" name="claim_pro" defaultValue={this.state.claim.claim_pro} onChange={this.handleClaimPro} onChange={this.handleChange} placeholder="ClaimPrograms" />
                                    {errors.claim_pro.length > 0 &&
                                        <span className='error'>{errors.claim_pro}</span>}
                                </Form.Group>
                            </div>
                            <div className='password1'>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Claim Start Date</Form.Label>
                                    <Form.Control type="date" ref="claim_sd" name="claim_sd" defaultValue={this.state.claim.claim_sd} onChange={this.handleClaimSD} onChange={this.handleChange} placeholder="ClaimStartDate" />
                                    {errors.claim_sd.length > 0 &&
                                        <span className='error'>{errors.claim_sd}</span>}
                                </Form.Group>
                            </div>
                            <div className='password1'>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Claim End Date</Form.Label>
                                    <Form.Control type="date" ref="claim_ed" name="claim_ed" defaultValue={this.state.claim.claim_ed} onChange={this.handleClaimED} onChange={this.handleChange} placeholder="ClaimEndDate" />
                                    {errors.claim_ed.length > 0 &&
                                        <span className='error'>{errors.claim_ed}</span>}
                                </Form.Group>
                            </div>
                            <div className='password1'>
                                <div id="position">


                                    <Button variant="primary" type="submit" >
                                        Submit
                    </Button>{' '}{' '}{' '}
                                    <Link to="/view"><Button variant="danger">
                                        Cancel
                    </Button></Link>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
                <footer>
                    <p></p>
                </footer>
            </div>
        );
    }
}
export default Submit;