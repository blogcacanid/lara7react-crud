import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import './App.css';
import PegawaiList from './PegawaiList'
import PegawaiCreate from './PegawaiCreate'
import PegawaiView from './PegawaiView'
import PegawaiEdit from './PegawaiEdit'
import PegawaiDelete from './PegawaiDelete'
 
class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={PegawaiList}/>
                        <Route path='/pegawai/create' component={PegawaiCreate} />
                        <Route path='/pegawai/edit/:id' component={PegawaiEdit} />
                        <Route path='/pegawai/delete/:id' component={PegawaiDelete} />
                        <Route path='/pegawai/:id' component={PegawaiView} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
 
ReactDOM.render(
    <App />, 
    document.getElementById('app')
)