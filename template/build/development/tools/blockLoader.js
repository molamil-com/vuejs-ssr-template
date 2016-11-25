var blockLoader = require("block-loader");
var options = {
  start: "<script>",
  end: "</script>",
    process: function fixPreBlocks(pre) {
        // var re = new RegExp(options.start + '[\s\S]*?' + options.end +'/')
        var replaced = pre.replace(/<script>([\s\S]*?)<\/script>/g, '')

        return replaced
    }
};
module.exports = blockLoader(options);
