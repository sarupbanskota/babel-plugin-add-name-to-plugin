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
// codemod --require babel-register -o index='{"pluginName": "babel-plugin-syntax-async-functions"}' --plugin src/index.js test/unnamed_plugins/babel-plugin-syntax-async-functions.js
const pluginName = JSON.parse(process.argv[5].replace(/index=/g,'')).pluginName;

const nameMissingIn = (properties) => {
  return !properties.some(property => property.node.key.name === "name");
};


export default function({ types: t }) {

  const nameKey = t.identifier("name");
  const nameValue = t.stringLiteral(pluginName);
  const pluginNameObject = t.objectProperty(nameKey, nameValue);

  return {
    visitor: {
      ExportDefaultDeclaration(path) {
        // let pluginReturn;
        let pluginProperties;
        try {
          pluginProperties = path.get([
            "declaration",                 // FunctionDeclaration
            "body",                        // BlockStatement
            "body",                        // Statements[]
            "0",                           // ReturnStatement
            "argument",                    // ObjectExpression
            "properties"                   // Properties[]
          ].join("."));
        } catch(e) {
          console.log(`ExportDefaultDeclaration-${pluginName}`);
          console.log(e);
        } finally {
          const nameMissing = pluginProperties ? nameMissingIn(pluginProperties) : null;
          if (nameMissing) {
            const objProp = pluginProperties[0];
            objProp ? objProp.insertBefore(pluginNameObject) : null;
          }
        }
      },

      ObjectExpression(path) {
        let pluginProperties;
        try {
          pluginProperties = path.get('properties');
        } catch(e) {
          console.log(`objexpression-${pluginName}`);
          console.log(e);
        } finally {
          const nameMissing = pluginProperties ? nameMissingIn(pluginProperties) : null;
          for(let i=0; i < pluginProperties.length; i++) {
            if (pluginProperties[i].node.key.name === "visitor") {
              let objProp = pluginProperties[i];
              objProp ? objProp.insertBefore(pluginNameObject) : null;
            }
          }
        }
      }
    }
  }
}
