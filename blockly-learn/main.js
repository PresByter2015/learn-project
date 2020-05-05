import * as Blockly from 'blockly/core';
var demoWorkspace = Blockly.inject ('blocklyDiv', {
  media: '../../media/',
  toolbox: document.getElementById ('toolbox'),
});

function showCode () {
  // Generate JavaScript code and display it.
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  var code = Blockly.JavaScript.workspaceToCode (demoWorkspace);
  console.log (code);
}

function runCode () {
  // Generate JavaScript code and run it.
  window.LoopTrap = 1000;
  Blockly.JavaScript.INFINITE_LOOP_TRAP =
    'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
  var code = Blockly.JavaScript.workspaceToCode (demoWorkspace);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
    eval (code);
  } catch (e) {
    alert (e);
  }
}
