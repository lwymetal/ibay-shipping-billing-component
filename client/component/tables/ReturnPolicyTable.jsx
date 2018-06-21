import React from 'react';

import styles from './ReturnPolicyTable.css';

const ReturnPolicyTable = () => (
  <div className={styles['return-outside-border']}>
    <h3>Return Policy</h3>
    <table className={styles.return}>
      <thead>
        <tr className={styles['return-header']}>
          <th>After receiving item, contact seller within</th>
          <th>Refund will be given as</th>
          <th>Return shipping</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles['return-lower-border']}>
          <td>30 days</td>
          <td>Money back</td>
          <td>Seller pays for return shipping</td>
        </tr>
        <tr>
          <td colSpan="3">
            <p>
                Refer to <a href="https://www.ebay.com/help/buying/returns-refunds/return-item-refund?id=4041#section3">iBay Return policy</a> for more details. You are covered by the <a href="https://www.ebay.com/help/policies/ebay-money-back-guarantee-policy/ebay-money-back-guarantee-policy?id=4210">iBay Money Back Guarantee</a> if you receive an item that is not as described in the listing.
            </p>
          </td>
        </tr>
        <tr className={styles['return-policy-header']}>
          <th colSpan="3">Return policy details</th>
        </tr>
        <tr>
          <td colSpan="3">
            All buyers remorse returns or returns for refused delivery will be subject to 20% restocking fee.
            Any items that are returned not complete or with damaged pieces will not be refunded. 
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ReturnPolicyTable;
