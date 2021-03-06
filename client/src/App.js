import React from "react";
import axios from "axios";
import "./App.css";
import Book from "./Book";
import Bookview from "./BookView";
class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      API_KEY:`AIzaSyCOFhfX0lDmkWfbXmyS9vXQVLuSEEVMaMg`,
      books:[],
      search:'',
      view:''
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleClick=this.handleClick.bind(this)
  }

  handleSubmit(event){
    event.preventDefault()
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.search}:keyes&key=${this.state.API_KEY}&maxResults=10`)
    .then(data=>{
      this.setState({books:data.data.items})   
      console.log(this.state.books)
    })
  }


  handleChange(event){
    this.setState({search:event.target.value})
  }

  handleClick(option){
    this.setState({view:option})
  }
  

  render(){
    if (this.state.view===''){
      return (
        <div className='App'>
      <form onSubmit={this.handleSubmit} className='search-form'>
        <input placeholder='search for books' className="search-bar" type='text' value ={this.state.search} onChange={this.handleChange}></input>
        <button className="search-button" type='submit'>Search</button>
      </form>
      {this.state.books.map(book=>(
        <Book key={book.volumeInfo.title}
        title ={book.volumeInfo.title}
        author={book.volumeInfo.authors}
        image={book.volumeInfo.imageLinks.thumbnail}
        handleClick={()=>this.handleClick(book.volumeInfo.title)}
        />
      ))}
      </div>
      )
    }else{
      var books = this.state.books
      console.log(this.state.view)
      console.log(books)
      for(var i =0 ; i<books.length;i++){
        if(books[i].volumeInfo.title===this.state.view){
          return  <Bookview 
          key ={books[i].volumeInfo.title}
          title={books[i].volumeInfo.title} 
          image={books[i].volumeInfo.imageLinks.thumbnail}
          author={books[i].volumeInfo.authors}
          description={books[i].volumeInfo.description}
          link={books[i].volumeInfo.previewLink}
          handleClick={()=>this.handleClick('')}
          />
        }
      }
    }
  }
}

export default App;
