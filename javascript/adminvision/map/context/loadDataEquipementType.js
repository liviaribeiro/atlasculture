const loadDataEquipementType = () => {
  const elementDataEquipementTypes = document.getElementById('data-equipement-type-rich')
  let dataEquipementTypes = elementDataEquipementTypes.dataset.equipementTypeRich

  dataEquipementTypes = dataEquipementTypes.replace(/'name'/g,`"name"`)
  dataEquipementTypes = dataEquipementTypes.replace(/'equipement_type'/g,`"equipement_type"`)
  dataEquipementTypes = dataEquipementTypes.replace(/'code_DEPS'/g,`"code_DEPS"`)
  dataEquipementTypes = dataEquipementTypes.replace(/'domaine_id'/g,`"domaine_id"`)
  dataEquipementTypes = dataEquipementTypes.replace(/'sous_domaine_id'/g,`"sous_domaine_id"`)
  dataEquipementTypes = dataEquipementTypes.replace(/'definition'/g,`"definition"`)
  dataEquipementTypes = dataEquipementTypes.replace(/'link'/g,`"link"`)
  dataEquipementTypes = dataEquipementTypes.replace(/'logo'/g,`"logo"`)

  dataEquipementTypes = dataEquipementTypes.replace(/'source_id'/g,`"source_id"`)

  dataEquipementTypes = dataEquipementTypes.replace(/'year'/g,`"year"`)


  dataEquipementTypes = dataEquipementTypes.replace(/'}}/g,`"}}`)
  dataEquipementTypes = dataEquipementTypes.replace(/'}/g,`"}`)
  dataEquipementTypes = dataEquipementTypes.replace(/: '/g,`: "`)
  dataEquipementTypes = dataEquipementTypes.replace(/', "/g,`", "`)
  dataEquipementTypes = dataEquipementTypes.replace(/'}, {"/g,`"}, {"`)
  dataEquipementTypes = dataEquipementTypes.replace(/'}]/g,`"}]`)
  dataEquipementTypes = dataEquipementTypes.replace(/>, "/g,`>", "`)
  dataEquipementTypes = dataEquipementTypes.replace(/>, "/g,`>", "`)
  dataEquipementTypes = dataEquipementTypes.replace(/'complementary_ressource'/g,`"complementary_ressource"`)
  dataEquipementTypes = dataEquipementTypes.replace(/None/g,`"None"`)

  dataEquipementTypes = JSON.parse(dataEquipementTypes);

  window.dataEquipementTypesRicheGlobal = dataEquipementTypes

}

export { loadDataEquipementType }
