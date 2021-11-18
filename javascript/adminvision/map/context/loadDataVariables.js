const loadDataVariables = () => {
  const elementVariables = document.getElementById('data-variables')
  let dataVariables = elementVariables.dataset.variables
  dataVariables = dataVariables.replace(/'nom'/g,`"nom"`)
  dataVariables = dataVariables.replace(/'definition'/g,`"definition"`)
  dataVariables = dataVariables.replace(/'source'/g,`"source"`)
  dataVariables = dataVariables.replace(/'year'/g,`"year"`)
  dataVariables = dataVariables.replace(/: '/g,`: "`)
  dataVariables = dataVariables.replace(/', "/g,`", "`)
  dataVariables = dataVariables.replace(/'}, {"/g,`"}, {"`)
  dataVariables = dataVariables.replace(/'}]/g,`"}]`)
  dataVariables = dataVariables.replace(/'source__nom'/g,`"source__nom"`)
  dataVariables = dataVariables.replace(/', "/g,`", "`)
  dataVariables = dataVariables.replace(/'pk'/g,`"pk"`)
  dataVariables = dataVariables.replace(/',/g,`",`)
  dataVariables = dataVariables.replace(/'file'/g,`"file"`)
  dataVariables = dataVariables.replace(/None/g,`"none"`)


  dataVariables = JSON.parse(dataVariables);
  return dataVariables
}

const loadDataVariablesRich = () => {
  const elementDataVariableRich = document.getElementById('data-variables-rich')
  let dataVariablesRich = elementDataVariableRich.dataset.variablesRich

  dataVariablesRich = dataVariablesRich.replace(/'nom'/g,`"nom"`)
  dataVariablesRich = dataVariablesRich.replace(/'definition'/g,`"definition"`)
  dataVariablesRich = dataVariablesRich.replace(/'source'/g,`"source"`)
  dataVariablesRich = dataVariablesRich.replace(/'year'/g,`"year"`)
  dataVariablesRich = dataVariablesRich.replace(/'variable'/g,`"variable"`)
  dataVariablesRich = dataVariablesRich.replace(/'link'/g,`"link"`)

  dataVariablesRich = dataVariablesRich.replace(/'name'/g,`"name"`)
  dataVariablesRich = dataVariablesRich.replace(/'logo'/g,`"logo"`)


  dataVariablesRich = dataVariablesRich.replace(/'cr_0'/g,`"cr_0"`)
  dataVariablesRich = dataVariablesRich.replace(/'cr_1'/g,`"cr_1"`)
  dataVariablesRich = dataVariablesRich.replace(/'cr_2'/g,`"cr_2"`)
  dataVariablesRich = dataVariablesRich.replace(/'cr_3'/g,`"cr_3"`)


  dataVariablesRich = dataVariablesRich.replace(/: <Source:/g,`: "<Source:`)
  dataVariablesRich = dataVariablesRich.replace(/>, "/g,`>", "`)
  dataVariablesRich = dataVariablesRich.replace(/'complementary_ressource'/g,`"complementary_ressource"`)

  dataVariablesRich = dataVariablesRich.replace(/'}}/g,`"}}`)
  dataVariablesRich = dataVariablesRich.replace(/'}/g,`"}`)
  dataVariablesRich = dataVariablesRich.replace(/: '/g,`: "`)
  dataVariablesRich = dataVariablesRich.replace(/', "/g,`", "`)
  dataVariablesRich = dataVariablesRich.replace(/'}, {"/g,`"}, {"`)
  dataVariablesRich = dataVariablesRich.replace(/'}]/g,`"}]`)
  dataVariablesRich = dataVariablesRich.replace(/>, "/g,`>", "`)
  dataVariablesRich = dataVariablesRich.replace(/'complementary_ressource'/g,`"complementary_ressource"`)
  


  dataVariablesRich = JSON.parse(dataVariablesRich);



  window.dataVariablesRichGlobal = dataVariablesRich


}


export { loadDataVariables, loadDataVariablesRich }
