const pluginName = JSON.parse(process.argv[5].replace(/index=/g,'')).pluginName;

const nameMissingIn = (properties) => {
  return !properties.some(property => property.node.key.name === "name");
};


export default function({ types: t }) {

  const nameKey = t.identifier("name");
  const nameValue = t.stringLiteral(pluginName);
  const pluginNameObject = t.objectProperty(nameKey, nameValue);

  return {
    name: "babel-plugin-add-name-to-plugin",

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
          // console.log(`ExportDefaultDeclaration-${pluginName}`);
          // console.log(e);
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
          // console.log(`objexpression-${pluginName}`);
          // console.log(e);
        } finally {
          const nameMissing = pluginProperties ? nameMissingIn(pluginProperties) : null;
          if (nameMissing) {
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
  };
}
