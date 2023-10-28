// import createUser from "./users.js"
// import findUsers from "./readAllUsers.js"
// async function createUserAndPrintOutput() {
//     const fakeReq = {
//         method: 'POST',
//         body: {
//         first_name: 'dz',
//         last_name: 'chang',
//         email: 'dzchang@example.com',
//         password: 'securepassword',
//         },
// };

// const fakeRes = {
//     status: (statusCode) => ({
//     json: (data) => console.log(`Response status ${statusCode}:`, data),
//     end: () => console.log(`Response status ${statusCode}.`),
//     }),
// };

// await createUser(fakeReq, fakeRes);
// }
// createUserAndPrintOutput();


// // Call the function to create a user and print the output

// async function findUserAndPrintOutput() {
//     const fakeReq = {
//         method: 'GET',
//     }
//     const fakeRes = {
//         status: (statusCode) => ({
//         json: (data) => console.log(`Response status ${statusCode}:`, data),
//         end: () => console.log(`Response status ${statusCode}.`),
//         }),
//     };
//     await findUsers(fakeReq, fakeRes)
// };
// findUserAndPrintOutput();
  
// //one user


import readUser from "../pages/api/readUser/email.js"

const fakeReq = {
            method: 'GET',
        };
const fakeRes = {
    status: (statusCode) => ({
    json: (data) => console.log(`Response status ${statusCode}:`, data),
    end: () => console.log(`Response status ${statusCode}.`),
    }),
};
readUser(fakeReq, fakeRes)
// console.log(res)

  
