import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import ShowInfo from './ShowInfo/ShowInfo'
import Loader from './Loader/Loader'


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      isShown: false,
      index: 0,
      loading: true,
      currentUrl: "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",
      personInfo: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        description: '',
        address: {
          streetAddress: '',
    			city: '',
    			state: '',
    			zip: ''
        }
      }
    }

  }

  // get json data
  componentDidMount() {
    this.fetchData()
  }

  // all fetch logic
  fetchData = () => {
    fetch(this.state.currentUrl, {method: "GET"}).then(response => response.json()).then(posts => {
      this.setState({
        posts: posts,
        loading: false
      })
    })
    .catch(function(err) {
      console.log('Fetch Error :', err);
    })
  }

  // show more info below table (onClick)
  showMoreInfoHandler(id) {
    // index = row number
    const index = this.state.posts.findIndex(post => {
      return post.id === id
    })
    // this.setState({isShown: !this.state.isShown})
    this.setState({index: index})
    this.setState({personInfo: this.state.posts[index]})
  }

  // set min url
  MinUrlHandler = () => {
    this.setState({
      currentUrl: "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
    }, function() {
      console.log("currenturl (min): ", this.state.currentUrl)
    })
    this.fetchData()
  }

  // set max url
  MaxUrlHandler = () => {
    this.setState({
      currentUrl: "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
    }, function() {
      console.log("currenturl (max): ", this.state.currentUrl)
    })
    this.fetchData()
  }

  render() {

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      maxWidth: 100
    },
    {
      Header: "First Name",
      accessor: "firstName"
    },
    {
      Header: "Last Name",
      accessor: "lastName"
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "Phone",
      accessor: "phone"
    },
    {
      Header: "Info",
      Cell: props => {
        return (
          <button
            className="Infobtn"
            onClick={() => {
              this.setState({isShown: true})
              this.showMoreInfoHandler(props.original.id)
            }}
            >Show info</button>
        )
      },
      maxWidth: 120,
      sortable: false,
      filterable: false,
      style: {
        textAlign: "center"
      }
    }
  ]

    return (
      <div className="MainApp">

        <button
            style={{marginTop: '20px'}}
            className={'UrlButton'}
            onClick={this.MinUrlHandler}>Min Data
        </button>
        <button
            style={{marginTop: '20px'}}
            className={'UrlButton'}
            onClick={this.MaxUrlHandler}>Max Data
        </button>

        {this.state.loading
          ? <Loader />
          : <ReactTable
            columns={columns}
            data={this.state.posts}
            filterable
            defaultPageSize={20}
            noDataText={"Something went wrong. Try to restart the page or visit it later."}
            showPaginationTop
           />
        }

      {this.state.isShown && (
        <ShowInfo
          firstName={this.state.personInfo.firstName}
          lastName={this.state.personInfo.lastName}
          streetAddress={this.state.personInfo.address.streetAddress}
          city={this.state.personInfo.address.city}
          state={this.state.personInfo.address.state}
          zip={this.state.personInfo.address.zip}
          description={this.state.personInfo.description}
        />
      )}

      </div>
    );
  }
}

export default App;
