Blockly.Blocks['move'] = {
  init: function () {
    this.appendValueInput ('VALUE').setCheck ('String').appendField ('移动一下');
    this.setOutput (true, 'Number');
    this.setColour (100);
    this.setTooltip ('Returns number of letters in the provided text.');
    this.setHelpUrl ('http://www.w3schools.com/jsref/jsref_length_string.asp');
  },
};

Blockly.JavaScript['move'] = function (block) {
  // String or array length.
  var argument0 =
    Blockly.JavaScript.valueToCode (
      block,
      'VALUE',
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || "''";
  return ['move()', Blockly.JavaScript.ORDER_MEMBER];
};
console.log ($ ('#box-item')[0].getBoundingClientRect());

function move () {
  const blocks = document.getElementById ('box-item');
  console.log ('我在移动', blocks.offsetLeft);
    // blocks.style.marginLeft = blocks.offsetLeft + 10 + 'px';
  blocks.offsetLeft = blocks.offsetLeft + 10 + 'px';
}
