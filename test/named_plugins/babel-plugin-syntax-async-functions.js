export default function () {
  return {
    name: "syntax-async-async-function",
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("asyncFunctions");
    },
  };
}
