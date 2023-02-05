export const orders = [
    { _id: "67rdca3e2b7f6hgeed471818", value: [1, 29], type: 'order', text: "1 - 29" },
    { _id: "67rdca3e3b7f6jgeed471820", value: [30, 99], type: 'order', text: "30 - 99" },
    { _id: "67rdca3e4b7f6jgeed471814", value: [100, 299], type: 'order', text: "100 - 299" },
    { _id: "67rdca3e5b7f6jgeed471824", value: [300, 999], type: 'order', text: "300 - 999 " },
    { _id: "67rdca3e6b7f6jgeed471829", value: [1000, Infinity], type: 'order', text: "1000+" }
];

const fetchOrders = () =>
    new Promise((resolve) => {
        setTimeout(function () {
            resolve(orders);
        }, 500);
    });

export default fetchOrders

