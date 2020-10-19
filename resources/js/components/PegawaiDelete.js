import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
 
class PegawaiDelete extends Component {

    constructor (props) {
        super(props)
        this.state = {
            pegawai_id: '',
            nip: '',
            nama_pegawai: '',
            alamat: '',
            alert: null,
            message:'',
            errors: []
        }
        this.handleDeleteRecord = this.handleDeleteRecord.bind(this)
    }
 
    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
 
    componentDidMount () {
        const pegawaiId = this.props.match.params.id
        axios.get(`/api/pegawai/edit/${pegawaiId}`).then(response => {
            this.setState({
                pegawai_id: response.data.pegawai_id,
                nip: response.data.nip,
                nama_pegawai: response.data.nama_pegawai,
                alamat: response.data.alamat
            })
        })
    }

    goToHome(){
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess() }
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="OK"
                >
                {this.state.message}
            </SweetAlert>
          );
          this.setState({
            alert: getAlert()
          });
    }

    onSuccess() {
        this.props.history.push('/');
    }
 
    hideAlert() {
        this.setState({
          alert: null
        });
    }

    handleDeleteRecord (event) {
        event.preventDefault()
        const pegawai = {
            nip: this.state.nip,
            nama_pegawai: this.state.nama_pegawai,
            alamat: this.state.alamat
        }
        const pegawaiId = this.props.match.params.id
        axios.delete(`/api/pegawai/${pegawaiId}`, pegawai)
            .then(response => {
                // redirect to the homepage
                var msg = response.data.success;
                if(msg == true){
                    this.setState({
                        message: response.data.message
                    })
                    return this.goToHome();
                }
            });
    }

    render () {
        const { pegawai } = this.state
        return (
            <div className='container py-4'>
                <div className='row'>
                    <div className='col-md-6'>
                      <div className='card'>
                            <div className='card-header'><h3>Delete Record # {this.state.pegawai_id}</h3></div>
                            <div className='card-body'>
                                <form onSubmit={this.handleDeleteRecord}>
                                    <table className="table table-striped table-bordered" cellSpacing="0" style={{fontStyle:'Calibri',fontSize:13}} >
                                        <tbody>
                                            <tr>
                                                <th width="150">NIP</th>
                                                <td>{this.state.nip}</td>
                                            </tr>
                                            <tr>
                                                <th>Nama Pegawai</th>
                                                <td>{this.state.nama_pegawai}</td>
                                            </tr>
                                            <tr>
                                                <th>Alamat</th>
                                                <td>{this.state.alamat}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p><b>Are you sure delete this record ?</b></p>
                                    <Link className='btn btn-secondary' title="Cancel" to={'/'}>Cancel</Link>
                                    &nbsp;&nbsp;
                                    <button className='btn btn-danger' title="Delete Record">Delete Record</button>
                                    {this.state.alert}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PegawaiDelete