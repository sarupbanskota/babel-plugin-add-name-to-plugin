// Thoughts around how we want to inject the name
// Source: https://github.com/babel/babel/pull/5842#issuecomment-307553242
// body:
//   type: "ExportDefaultDeclaration"
//     declaration:
//       type: "FunctionDeclaration"
//         body:
//           type: "BlockStatement"
//             body:
//               type: "ReturnStatement"
//                 argument:
//                   type: "ObjectExpression"
//                     properties: [Array 1]  ← we wanna inject name here
