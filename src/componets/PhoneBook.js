import React from 'react'
import PropTypes from 'prop-types'

export const PhoneBook = (props) => {
  const { filter, name, number, handleSubmit, handleChange } = props

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <h2>Name</h2>
        <input
          onChange={(event) => handleChange('name', event)}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
        <h2>Number</h2>
        <input
          value={number}
          onChange={(event) => handleChange('number', event)}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
        <button type="submit">Add contact</button>
      </form>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        value={filter}
        onChange={(event) => handleChange('filter', event)}
      />
    </div>
  )
}
PhoneBook.propTypes = {
  filter: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}
