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

// Try on console:
// yarn global add babel-register
// codemod --require babel-register --plugin src/ test/unnamed_plugins/babel-plugin-syntax-async-functions.js
export default function({ types: t }) {

  return {
    visitor: {
      ExportDefaultDeclaration(path) {
        let pluginReturn;
        try {
          pluginReturn = path          // "ExportDefaultDeclaration"
            .get('declaration')        // "FunctionDeclaration"
            .get('body')               // "BlockStatement"
            .get('body.0')             // "ReturnStatement"
            .get('argument')           // "ObjectExpression"
            .get('properties.0');      // "ObjectMethod"
        } catch(e) {
          console.log(e);
        } finally {
          const nameKey = t.identifier("name");
          const nameValue = t.stringLiteral("pluginName");
          pluginReturn.insertBefore(t.objectProperty(nameKey, nameValue));
        }
      }
    }
  }
}
