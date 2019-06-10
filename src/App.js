import React, { Component } from 'react';
import './App.css';

import IconexConnect from './IconexConnect';
import {
  IconConverter
} from 'icon-sdk-js'
import SDK from './SDK.js';

import date1 from "../src/assets/images/date1.jpg"
import date2 from "../src/assets/images/date2.jpg"
import date3 from "../src/assets/images/date3.jpg"
import date4 from "../src/assets/images/date4.jpg"
import date5 from "../src/assets/images/date5.jpg"
import date6 from "../src/assets/images/date6.jpg"
import date7 from "../src/assets/images/date7.jpg"

function randomImg(hex) {
  return parseInt(hex[hex.length - 1], 16) % 7;
}

const DATEURL = [
  date1,
  date2,
  date3,
  date4,
  date5,
  date6,
  date7
]

const DATESTR = [
  "< 서울 스카이 >",
  "< 잠실 자동차 극장 >",
  "< 1890 남산골 야시장 >",
  "< 남산골 한옥마을 >",
  "< 응봉산 전망대 >",
  "< 동대문 디자인 플라자 >",
  "< 동대문 메가박스 무비 올나잇 >",
]

export default class App extends Component {
  state = {
    login: false,
    dateurl: DATEURL[0],
    myAddress: '',
    datestr: DATESTR[0]
  }

  click = async (e) => {
    const myAddress = await IconexConnect.getAddress()
    this.setState({
      login: true,
      myAddress: myAddress
    })
  }

  getDatePlace = async () => {
    const { sendTxBuild2 } = SDK
    const txObj = sendTxBuild2({
      from: this.state.myAddress,
      to: window.CONTRACT_ADDRESS,
    })

    const tx = await IconexConnect.sendTransaction(txObj)

    console.log(randomImg(tx), this.state.dateurl)
    if (tx) {
      console.log(1234)
      this.setState({
        dateurl: DATEURL[randomImg(tx)],
        datestr: DATESTR[randomImg(tx)]
      })
    }
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1><a href="/"></a></h1>
          {
            !this.state.login ? (
              <>
                {/* <div className="wrap2" onClick={this.click}  style={{ backgroundImage: `url(${this.state.dateurl})` }}></div> */}
                <div className="wrap" onClick={this.click}>
                  <a href="#" className="button" >내일 뭐하지?</a>
                 
                </div>
              </>
            ) : (
                <>
                   <h2>{this.state.datestr}</h2>
                  <div className="wrap" onClick={this.getDatePlace}  style={{ backgroundImage: `url(${this.state.dateurl})`, width: "100%" ,height:"300px"}}>
                  <a>그림을 클릭하면 다음 데이트 장소를 추천받을 수 있어요!</a>
                  </div>
                </>
              )
          }
        </header>
      </div>
    );
  }

}



