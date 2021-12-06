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

    setContacts((contacts) => {
      if (contacts.some((contact) => contact.name === name)) {
        alert(`${name} is already in contacts`)
        return contacts
      } else {
        setName('')
        setNumber('')
        return [...contacts, { name, id: uuidv4(), number }]
      }
    })
  }

  const handleDeleteItem = (id) => {
    setContacts((contacts) => contacts.filter((contact) => contact.id !== id))
  }

  const handleNameChange = (event) => {
    setName(event.currentTarget.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.currentTarget.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.currentTarget.value)
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
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleFilterChange={handleFilterChange}
      />
      <Contacts
        contacts={filterContacts()}
        handleDeleteItem={handleDeleteItem}
      />
    </div>
  )
}

export default App
