import React from 'react';
import axios from 'axios';

import { seeds } from '../../db/data/seed';

import styles from './Shipping.css';

import ReturnPolicyTable from './tables/ReturnPolicyTable.jsx';
import PaymentDetails from './tables/PaymentDetailsTable.jsx';

class Shipping extends React.Component {
  constructor(props) {
    super(props);

    const countries = seeds.map(item => item.country);

    this.state = {
      citycode: '',
      defaultCountry: 'United States of America',
      selectedCountry: 'United States of America',
      countries: [...countries],
      basicRate: '',
      expeditedRate: '',
      oneDayRate: '',
      quantity: 1,
      zipcode: '',
      warn: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleZipCodeInput = this.handleZipCodeInput.bind(this);
    this.handleCityCodeInput = this.handleCityCodeInput.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    // not implemented yet the auction page isn't implenting this on the page:
    // this.handleChangeInQty = this.handleChangeInQty.bind(this);
  }

  componentDidMount() {
    this.handleDefault();
  }

  handleDefault() {
    axios({
      method: 'get',
      url: 'http://ec2-54-183-215-102.us-west-1.compute.amazonaws.com:3000/api/shipping',
      params: {
        country: this.state.defaultCountry,
        zipcode: '08561',
        citycode: '272277818824'
      }
    })
    .then(({ data }) => {
      this.setState({
        basicRate: data.basic_rate + '.00',
        expeditedRate: data.expedited_rate + '.00',
        oneDayRate: data.one_day_rate + '.00'
      });
    })
    .catch(err => {
      console.log('Error fetching from client');
    });
  }

  postTest() {
    axios({
      method: 'post',
      url: 'http://ec2-54-183-215-102.us-west-1.compute.amazonaws.com:3000/api/add',
      params: {
        country: "A test country 0",
        basic_rate: 5.00,
        expedited_rate: 10.00,
        one_day_rate: 15.00
      }
    })
    .then(result => {
      console.log('Post successful');
    })
    .catch(err => {
      console.log(err);
    })
  }

  putTest() {
    axios({
      method: 'put',
      url: 'http://ec2-54-183-215-102.us-west-1.compute.amazonaws.com:3000/api/update',
      params: {
        country: "A test country 2",
        basic_rate: 5.00
      }
    })
    .then(result => {
      console.log('Put successful');
    })
    .catch(err => {
      console.log(err);
    })
  }

  deleteTest() {
    axios({
      method: 'delete',
      url: 'http://ec2-54-183-215-102.us-west-1.compute.amazonaws.com:3000/api/delete',
      params: {
        country: "A test country 1"
      }
    })
    .then(result => {
      console.log('Delete successful');
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleSubmit() {
    event.preventDefault();
    if (this.state.selectedCountry) {
      axios({
        method: 'get',
        url: 'http://ec2-54-183-215-102.us-west-1.compute.amazonaws.com:3000/api/shipping',
        params: {
          country: this.state.selectedCountry,
          zipcode: this.state.zipcode,
          citycode: this.state.citycode
        }
      })
      .then(({ data }) => {
        if (!data.basic_rate) {
          this.setState({warn: true, citycode: ''})
        } else {
          this.setState({
            basicRate: data.basic_rate + '.00',
            expeditedRate: data.expedited_rate + '.00',
            oneDayRate: data.one_day_rate + '.00'
          });
        }
      })
      .catch(err => {
        console.log('Error fetching from DB', err);
      });
    }
  }

  handleChange(event) {
    selectedCountry !== 'United States of America' && this.setState({ zipcode: '' });
    this.setState({
      selectedCountry: event.target.value
    }, () => console.log(this.state.selectedCountry));
  }

  handleCityCodeInput(event) {
    event.preventDefault();
    this.setState({
      citycode: event.target.value
    });
  }

  handleDismiss() {
    this.setState({ warn: false });
  }

  handleZipCodeInput(event) {
    event.preventDefault();
    this.setState({
      zipcode: event.target.value
    });
  }

  /*
  not implemented on the actual ebay site

  handleChangeInQty(event) {
    console.log(event.target.value);
    let expeditedFee = this.state.quantity * 3;
    let oneDayRateFee = this.state.quantity * 5;

    if (this.state.quantity > 1) {
      let totalExp = this.state.expeditedRate + expeditedFee;
      let totalOne = this.state.oneDayRate + oneDayRateFee;

      this.setState({
        expeditedRate: totalExp,
        oneDayRate: totalOne
      });
    }
  }
  */

  render() {
    let selectedCountry = this.state.selectedCountry;
    let getZip;

    if (selectedCountry === 'United States of America' || !selectedCountry) {
      getZip = true;
    } else {
      getZip = null;
    }
    return(
      <div>
        <div className={styles['shipping-outside-border']}>
          <h3>Shipping and Billing</h3>
          <div className={styles['shipping-conditions']}>
            <div>Item location: <b>Windsor, New Jersey, United States</b></div>
            <div>Shipping to: Worldwide</div>
            <div>Excludes: Russian Federation</div>
          </div>
          <form
            className={styles['form-padding']}
            onSubmit={this.handleSubmit}
          >
            <label>{ "Quantity: "}</label>
            <input
              type="qty"
              onChange={this.handleChangeInQty}
              value={this.state.quantity} width="30px"
            ></input>{"  "}
            <label>
              { "Change Country: " }
              <select
                value={this.state.selectedCountry || this.state.defaultCountry}
                onChange={this.handleChange}
              >
                {
                  this.state.countries.map((country, i) => (
                    <option key={i}>{country}</option>
                  ))
                }
              </select>
            </label>{"  "}
            {
              getZip ?
              (<label>Zip Code:   
                <input
                  type="number"
                  max="99999"
                  onChange={this.handleZipCodeInput}
                  required
                ></input></label> ) : null
            }{"  "}
            <label>{ "City Code: " }
              <input 
                type="citycode"
                min="100000000000"
                max="999999999999"
                onChange={this.handleCityCodeInput}
                value={this.state.citycode}
                required
              ></input> 
            </label>{"  "}
            <button>Get Rates</button>
          </form>
          { this.state.warn === true ? <div id="noCity">City code not found! <span className="closeBtn"
            onClick={this.handleDismiss}>&#10006;</span></div> : null }
        
          <br />
          <div>
            <table className={styles.shipping}>
              <thead>
                <tr className={styles['shipping-header']}>
                  <th>Shipping and handling</th>
                  <th>Each additional item</th>
                  <th>To</th>
                  <th>Service</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{`US $${this.state.basicRate}`}</td>
                  <td>Free</td>
                  <td>{this.state.defaultCountry}</td>
                  <td>Standard Shipping</td>
                </tr>
                <tr>
                  <td>{`US $${this.state.expeditedRate}`}</td>
                  <td>$3.00</td>
                  <td>{this.state.defaultCountry}</td>
                  <td>Expedited Shipping</td>
                </tr>
                <tr>
                  <td>{`US $${this.state.oneDayRate}`}</td>
                  <td>$5.00</td>
                  <td>{this.state.defaultCountry}</td>
                  <td>{`One-day Shipping`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles['shipping-delivery-conditions']}>
            <div>
              * <a href="https://pages.ebay.com/help/buy/contextual/estimated-delivery.html">
                  Estimated delivery dates
                </a>{' '}
                include seller's handling time, origin ZIP Code, destination ZIP Code
                and time of acceptance and will depend on shipping service selected and receipt of
                {' '}<a href="https://pages.ebay.com/help/buy/contextual/domestic-handling-time.html">cleared payment</a>.{' '}
                Delivery times may vary, especially during peak periods.  
                <button className="testButton" onClick={this.postTest.bind(this)} />&nbsp;&nbsp;    
                <button className="testButton" onClick={this.putTest.bind(this)} />&nbsp;&nbsp;  
                <button className="testButton" onClick={this.deleteTest.bind(this)} />
            </div>
          </div>
        </div>
        <br></br>
        <div>
          <ReturnPolicyTable />
        </div>
        <br></br>
        <div>
          <PaymentDetails />
        </div>
      </div>
    );
  }
}

export default Shipping;
