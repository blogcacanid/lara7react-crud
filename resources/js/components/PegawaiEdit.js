import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
 
class PegawaiEdit extends Component {

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
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleUpdateRecord = this.handleUpdateRecord.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
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

    handleUpdateRecord (event) {
        event.preventDefault()
        const pegawai = {
            pegawai_id: this.state.pegawai_id,
            nip: this.state.nip,
            nama_pegawai: this.state.nama_pegawai,
            alamat: this.state.alamat
        }
        const pegawaiId = this.props.match.params.id
        axios.put(`/api/pegawai/${pegawaiId}`, pegawai)
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

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    render () {
        const { pegawai } = this.state
        return (
            <div className='container py-4'>
                <div className='row'>
                    <div className='col-md-6'>
                      <div className='card'>
                            <div className='card-header'><h3>Edit Record # {this.state.pegawai_id}</h3></div>
                            <div className='card-body'>
                                <form onSubmit={this.handleUpdateRecord}>
                                    <div className='form-group'>
                                        <label htmlFor='nip'>NIP</label>
                                        <input
                                            id='nip'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('nip') ? 'is-invalid' : ''}`}
                                            name='nip'
                                            value={this.state.nip}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('nip')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='nama_pegawai'>Nama Pegawai</label>
                                        <input
                                            id='nama_pegawai'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('nama_pegawai') ? 'is-invalid' : ''}`}
                                            name='nama_pegawai'
                                            value={this.state.nama_pegawai}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('nama_pegawai')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='alamat'>Alamat</label>
                                        <input
                                            id='alamat'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('alamat') ? 'is-invalid' : ''}`}
                                            name='alamat'
                                            value={this.state.alamat}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('alamat')}
                                    </div>
                                    <Link className='btn btn-secondary' title="Cancel" to={'/'}>Cancel</Link>
                                    &nbsp;&nbsp;
                                    <button className='btn btn-primary' title="Update Record">Update Record</button>
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

export default PegawaiEdit