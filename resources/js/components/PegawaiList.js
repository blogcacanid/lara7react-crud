import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import PegawaiRow from './PegawaiRow';
import Pagination from "react-js-pagination";
 
class PegawaiList extends Component {
     
    constructor (props) {
        super(props)
        this.state = {
            pegawais: [],
            msg: null,
            type: null,
            flash:false,
            alert: null,
            activePage: 0,
            itemsCountPerPage: 0,
            totalItemsCount: 0,
            pageRangeDisplayed: 5,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }
 
    hideAlert() {
        this.setState({
            alert: null
        });
    }
 
    componentDidMount () {
        axios.get(`api/pegawais?page=` + this.state.activePage)
        .then(response => {
            this.setState({
                pegawais: response.data.data,
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
            })
        })  
    }
 
    handlePageChange(pageNumber) {
        axios.get(`api/pegawais?page=` + pageNumber)
            .then(response => {
                this.setState({
                    pegawais: response.data.data,
                    activePage: response.data.current_page,
                });
            })
    }

    tableRow() {
        if (this.state.pegawais instanceof Array) {
            return this.state.pegawais.map(function (object, i) {
                return <PegawaiRow
                    obj={object} st={this.state} key={i} index={i}
                />;
            }, this)
        }
    }

    render () {
        const { pegawais } = this.state
        return (
          <div className='container py-4'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='card'>
                  <div className='card-header'><h3>Pegawai List</h3></div>
                  <div className='card-body'>
                    <Link className='btn btn-success mb-3' title="Add New Record" to='/pegawai/create'>
                        Add Record
                    </Link>
                    <div className="table-responsive" >
                        <table className="table table-bordered table-striped" style={{fontStyle:'Calibri',fontSize:13}} >
                            <thead>
                                <tr>
                                    <th width="120" className="text-center">Action</th>
                                    <th>NIP</th>
                                    <th>Nama Pegawai</th>
                                    <th>Alamat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.tableRow()}
                            </tbody>
                        </table>
                        {this.state.alert}
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
 
export default PegawaiList