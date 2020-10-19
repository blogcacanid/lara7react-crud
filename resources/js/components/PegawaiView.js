import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
class PegawaiView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            pegawai: {}
        }
    }

    componentDidMount () {
        const pegawaiId = this.props.match.params.id
        axios.get(`/api/pegawai/${pegawaiId}`).then(response => {
            this.setState({
                pegawai: response.data
            })
        })
    }

    render () {
        const { pegawai } = this.state
        return (
            <div className='container py-4'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'><h3>View Record # {pegawai.pegawai_id}</h3></div>
                            <div className='card-body'>
                                <table className="table table-striped table-bordered" cellSpacing="0" style={{fontStyle:'Calibri',fontSize:13}} >
                                    <tbody>
                                        <tr>
                                            <th width="150">NIP</th>
                                            <td>{pegawai.nip}</td>
                                        </tr>
                                        <tr>
                                            <th>Nama Pegawai</th>
                                            <td>{pegawai.nama_pegawai}</td>
                                        </tr>
                                        <tr>
                                            <th>Alamat</th>
                                            <td>{pegawai.alamat}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Link className='btn btn-secondary' title="Back" to={'/'}>Back</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default PegawaiView