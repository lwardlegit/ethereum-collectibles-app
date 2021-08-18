import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import vector from '../cute_vector.png';
import fire from '../fire.png';


import Web3 from 'web3';
import Color from '../abis/color.json'
import './App.css';
import { result } from 'underscore';



class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
}

 mint = (color) =>{
  console.log(color)
  this.state.contract.methods.mint(color).send({from:this.state.account})
  .once('receipt', (receipt) =>{
    this.setState({
      colors: [...this.state.colors, color]
    })
  })
}

  async loadBlockchainData(){
    const web3 = window.web3;
    const acc = await web3.eth.getAccounts();
    this.setState({ account: acc[0] });

    const networkId = await web3.eth.net.getId()
    const networkData = Color.networks[networkId]

    if(networkData){
      const abi = Color.abi
    const address = networkData.address
    const myContract = new web3.eth.Contract(abi,address)
    this.setState({contract:myContract})
    const totalSupply= await myContract.methods.totalSupply().call()
    this.setState({totalSupply})

    console.log(myContract)

    //load colors

    for(var i = 1; i <= totalSupply; i++){
      const color = await myContract.methods.colors(i-1).call()
      this.setState({colors: [...this.state.colors, color]})
    }
    }else{
      window.alert('smart contract is not deployed to detected network')
    }
    
  }

  constructor(props){
    super(props)
    this.state={
      account: '',
      contract: null,
      totalSupply: 0,
      colors: []

    }
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="fancyBigText">Cute Vectors</h2>
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-one d-sm-none d-sm-block">
              <small className = "text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto tokenContainer ">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={vector} className="App-logo vector" alt="logo" />
                </a>
                {/*form goes here*/}

                <h2 className="fancyBigText">ISSUE TOKEN</h2>
                <form className = "form" onSubmit={(event)=>{
                    event.preventDefault()
                    const color = this.color.value
                    this.mint(color)
                }}>
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="e.g. #FFFFFF"
                    ref={(input)=>{this.color=input}}

                  />
                  <input type="submit" className="btn mint" value="MINT"/>
                 

                </form>

              <div className="row text-center">
                  <Carousel className="caro" variant="dark">
                      {this.state.colors.map((color,key)=>{
                        return(
                        <Carousel.Item interval={1200} key= {key} className="center">
                          <div className="token" style={{backgroundColor:color}}>
                              <div style={{color:color}}>{color}</div>
                          </div>   
                        </Carousel.Item>
                        )
                      })}
                </Carousel>
              </div>
                <h1 className="fancyText">Cute Vectors ^ Collectible Series </h1>
                <p>
                  a campfire venture
                </p>
                  PURCHASE YOURS <u><b>NOW! </b> <img src={fire} width="50px" height="60px"/></u>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
