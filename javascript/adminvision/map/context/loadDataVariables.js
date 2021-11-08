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

  dataVariables = JSON.parse(dataVariables);
  return dataVariables
}

export { loadDataVariables }
