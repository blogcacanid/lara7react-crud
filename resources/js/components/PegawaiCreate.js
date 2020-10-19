import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
 
class PegawaiCreate extends Component {
     
    constructor (props) {
        super(props)
        this.state = {
            nip: '',
            nama_pegawai: '',
            alamat: '',
            alert: null,
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleAddRecord = this.handleAddRecord.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }
 
    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
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
                Created record successfully
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
 
    handleAddRecord (event) {
        event.preventDefault()
        const product = {
            nip: this.state.nip,
            nama_pegawai: this.state.nama_pegawai,
            alamat: this.state.alamat
        }
        axios.post(`/api/pegawai/store`, product).then(response => { 
            var msg = response.data.success;
            if(msg == true){
                return this.goToHome();
            }
        })
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
        return (
            <div className='container py-4'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'><h3>Add Record</h3></div>
                            <div className='card-body'>
                                <form onSubmit={this.handleAddRecord}>
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
                                    <Link className='btn btn-secondary' to={'/'}>Back</Link>
                                    &nbsp;&nbsp;
                                    <button className='btn btn-primary'>Save</button>
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

export default PegawaiCreate