import React, { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
import { PhoneBook } from './componets/PhoneBook.js'
import { Contacts } from './componets/Contacts'

const contactsLocalstorageItemName = 'contacts'

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localStorageItem = localStorage.getItem(contactsLocalstorageItemName)

    if (localStorageItem !== null) {
      return JSON.parse(localStorageItem)
    } else {
      return []
    }
  })

  const [filter, setFilter] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  useEffect(() => {
    localStorage.setItem(contactsLocalstorageItemName, JSON.stringify(contacts))
  }, [contacts])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already in contacts`)
    } else {
      setName('')
      setNumber('')
      setContacts([...contacts, { name, id: uuidv4(), number }])
    }
  }

  const handleDeleteItem = (id) => {
    setContacts((contacts) => contacts.filter((contact) => contact.id !== id))
  }

  const handlChange = (name, event) => {
    switch (name) {
      case 'name':
        setName(event.currentTarget.value)
        break
      case 'number':
        setNumber(event.currentTarget.value)
        break
      case 'filter':
        setFilter(event.currentTarget.value)
        break
      default:
        break
    }
  }

  const filterContacts = () => {
    if (filter === '') {
      return contacts
    } else {
      return contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(filter.toLowerCase())
      })
    }
  }

  return (
    <div>
      <PhoneBook
        filter={filter}
        name={name}
        number={number}
        handleSubmit={handleSubmit}
        handleChange={handlChange}
      />
      <Contacts
        contacts={filterContacts()}
        handleDeleteItem={handleDeleteItem}
      />
    </div>
  )
}

export default App
