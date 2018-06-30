import React from 'react';
import styles from './PaymentDetails.css';

const PaymentDetails = () => (
  <div className={styles['payment-outside-border']}>
    <h3>Payment details</h3>
    <table className={styles.payment}>
      <thead>
        <tr className={styles['payment-header']}>
          <th>Payment Method</th>
          <th>Preferred / Accepted</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><img className={styles['paypal']} src="http://localhost:3000/3e94_bp.png"/></td>
          <td>BayPal Preferred</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default PaymentDetails;
