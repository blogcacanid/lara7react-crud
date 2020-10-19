import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class PegawaiRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td width="100" className="text-center">
                    <div className="btn-group">
                        <Link className='btn btn-primary btn-sm' to={`/pegawai/${this.props.obj.pegawai_id}`}>View</Link>
                        <Link className='btn btn-success btn-sm' to={`/pegawai/edit/${this.props.obj.pegawai_id}`}>Edit</Link>
                        <Link className='btn btn-danger btn-sm' to={`/pegawai/delete/${this.props.obj.pegawai_id}`}>Delete</Link>
                    </div>
                </td>
                <td>{this.props.obj.nip}</td>
                <td>{this.props.obj.nama_pegawai}</td>
                <td>{this.props.obj.alamat}</td>
            </tr>
        );
    }
}

export default PegawaiRow;