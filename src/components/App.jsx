import { Component } from "react"
import { Layout } from "./Layout";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";


export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  addContact = newContact => {
    const normalizedName = newContact.name.toLocaleLowerCase();

    if(this.state.contacts.find(contact => contact.name.toLowerCase() === normalizedName)) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact]
      };
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  deleteContact = e => {
    const contactName = e.currentTarget.closest('li').firstChild.firstChild.firstChild.textContent;
  
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => !contact.name.includes(contactName))
    }));
  };

  render() {
    const { filter } = this.state;
    const addContact = this.addContact;
    const changeFilter = this.changeFilter;
    const visibleContacts = this.getVisibleContacts();
    const deleteContact = this.deleteContact;

    return (
      <Layout>  
        <h1>Phonebook</h1>
        <ContactForm onFormSubmit={addContact}/>

        <h2>Contacts</h2>
        <Filter inputValue={filter} onChange={changeFilter} />
        <ContactList contacts={visibleContacts} deleteContact={deleteContact} />    
      </Layout>
    );
  };
};
