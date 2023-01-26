import React, { useEffect } from 'react';


const CustomizedPaypalButton: React.FC = () => {
  useEffect(() => {
    const setupPaypalButton = async () => {
      // await loadPaypalScript();
      
      const paypal = (window as any).paypal;

      paypal.Buttons({
        createOrder: function (data, actions) {
          return fetch("/api/orders", {
            method: "post",
          })
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              return response.id;
            });
        },

    onApprove: function (data, actions) {
      return fetch(`/api/orders/${data.orderID}/capture`, {
        method: "post",
      })
        .then((response) => response.json())
        .then(function (orderData) {
          // Successful capture! For dev/demo purposes:
          console.log(
            "Capture result",
            orderData,
            JSON.stringify(orderData, null, 2)
          );
          var transaction = orderData.purchase_units[0].payments.captures[0];
          alert(
            "Transaction " +
              transaction.status +
              ": " +
              transaction.id +
              "\n\nSee console for all available details"
          );

          // When ready to go live, remove the alert and show a success message within this page. For example:
          // var element = document.getElementById('paypal-button-container');
          // element.innerHTML = '';
          // element.innerHTML = '<h3>Thank you for your payment!</h3>';
          // Or go to another URL:  actions.redirect('thank_you.html');
        });
    },
      }).render('#paypal-button-container');
    };
    setupPaypalButton();
  }, []);
  
  return <div id="paypal-button-container"></div>;
};

export default CustomizedPaypalButton;




// import { loadPaypalScript } from './paypal';

// const CustomizedPaypalButton: React.FC = () => {
//   useEffect(() => {
//     const setupPaypalButton = async () => {
//       // await loadPaypalScript();
      
//       const paypal = (window as any).paypal;

//       paypal.Buttons({
//         createOrder: function(data, actions) {
//           return actions.order.create({
//             purchase_units: [{
//               amount: {
//                 value: '88.44'
//               }
//             }]
//           });
//         },
//         onApprove: function(data, actions) {
//           return actions.order.capture().then(function(orderData) {
//             // Successful capture! For demo purposes:
//             console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
//             var transaction = orderData.purchase_units[0].payments.captures[0];
//             alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
  
//             // Replace the above to show a success message within this page, e.g.
//             // const element = document.getElementById('paypal-button-container');
//             // element.innerHTML = '';
//             // element.innerHTML = '<h3>Thank you for your payment!</h3>';
//             // Or go to another URL:  actions.redirect('thank_you.html');
//           });
//         }
//       }).render('#paypal-button-container');
//     };
//     setupPaypalButton();
//   }, []);
  
//   return <div id="paypal-button-container"></div>;
// };

// export default CustomizedPaypalButton;