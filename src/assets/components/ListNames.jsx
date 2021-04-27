import React, {useState} from 'react'
import uniqid from 'uniqid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSave} from '@fortawesome/free-solid-svg-icons'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {faEdit} from '@fortawesome/free-solid-svg-icons'

function ListNames() {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [listNames, setListNames] = useState([])
    const [editPerson, setEditPerson] = useState(false)
    const [personId, setPersonId] = useState(null)
    const [emptyField, setEmptyField] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const addPerson = (e) => {
        e.preventDefault()
        if (isEmptyField(name) === true) {
            if (isEmptyField(phone) === true) {
                const person = {
                    personId: uniqid(),
                    personName: name,
                    personPhone: phone
                }
                setListNames([...listNames, person])
                setName('')
                setPhone('')
            }
        }
    }

    const delPerson = (personId) => {
        const delPersonArray = listNames.filter(person => person.personId !== personId)
        setListNames(delPersonArray)
    }

    const getPerson = (person) => {
        setEditPerson(true)
        setPersonId(person.personId)
        setName(person.personName)
        setPhone(person.personPhone)
    }

    const updatePerson = (e) => {
        e.preventDefault()
        const editPersonArray = listNames.map(
                person => person.personId === personId ? {
                personId: personId, 
                personName: name,
                personPhone: phone
            } : person
        )
        setListNames(editPersonArray)
        setEditPerson(false)
        setPersonId('')
        setName('')
        setPhone('')
    }

    const isEmptyField = (field) => {
        if (!field.trim()) { 
            setErrorMessage('This field is required')
            setEmptyField(false)
        } else { 
            setErrorMessage('')
            setEmptyField(true)
        } 
        return emptyField
    }

    return (
        <div>
            <div className = "col-md-12">
            <h1 className = "text-center"></h1>
                <div className = "row">
                    <div className = "col-md-6">
                        <div className = "card mt-2 bg-light">
                            <div className = "card-body bg-light">
                                    <h3 className = "text-center">Formulario</h3>
                                    <form onSubmit = {editPerson ? (e) => updatePerson(e) : (e) => addPerson(e)}>
                                        <div className = "form-group">
                                            <label>Name</label>
                                            <input 
                                                type = "text" 
                                                className = "form-control form-control-sm" 
                                                onChange = {(e) => {setName(e.target.value)}} 
                                                placeholder = "Name" 
                                                value = {name}
                                            />
                                            {errorMessage !== '' ? <div className = "form-group error"><small>{errorMessage}</small></div> : ''}
                                        </div>
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input 
                                                type = "number" 
                                                className = "form-control form-control-sm" 
                                                onChange = {(e) => {setPhone(e.target.value)}} 
                                                placeholder = "Phone"
                                                value = {phone} 
                                            />
                                            {errorMessage !== '' ? <div className = "form-group error"><small>{errorMessage}</small></div> : ''}
                                        </div>
                                        <div className="form-group text-right">
                                            <button type="submit" className = {editPerson ? "btn btn-sm btn-info" : "btn btn-sm btn-success"} > 
                                                <FontAwesomeIcon icon={faSave}/> {editPerson ? 'Update' : 'Save' }
                                            </button>
                                        </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <table className="table table-sm table-bordered table-striped mt-2">
                            <thead>
                                <tr>
                                    <th scope="col" className="text-center">Name</th>
                                    <th scope="col" className="text-center">Phone</th>
                                    <th scope="col" className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        listNames.map(person =>
                                            <tr key = {person.personId}>
                                                <td>{person.personName}</td>
                                                <td className = "text-right">{person.personPhone}</td>
                                                <td className = "text-center">
                                                    <div className = "btn-group">
                                                        <button className = "btn btn-sm btn-warning" onClick = {() => {getPerson(person)}}> 
                                                            <FontAwesomeIcon icon = {faEdit}/>
                                                        </button>
                                                        <button className = "btn btn-sm btn-danger" onClick = {() => {delPerson(person.personId)}}> 
                                                            <FontAwesomeIcon icon = {faTimes}/>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListNames
