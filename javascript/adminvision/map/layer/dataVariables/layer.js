import {  densiteDeLaPopulation } from './templates/densiteDeLaPopulation.js';
import { tauxDePauvrete } from './templates/tauxDePauvrete.js';
import { evolutionDeLaPopulation } from './templates/evolutionDeLaPopulation.js';
import { niveauDeVieMedian } from './templates/niveauDeVieMedian.js';
import { grilleCommunaleDeDensite } from './templates/grilleCommunaleDeDensite.js';
import { categoriesDuRuralEtDeLurbain } from './templates/categoriesDuRuralEtDeLurbain.js';
import { quartiersPrioritairesDeLaPolitiqueDeLaVille } from './templates/quartiersPrioritairesDeLaPolitiqueDeLaVille.js';
import { entreprisesCulturellesDuSecteurMarchand } from './templates/entreprisesCulturellesDuSecteurMarchand.js';
import { salarieActifsDesSecteursCulturelsMarchand } from './templates/salarieActifsDesSecteursCulturelsMarchand.js';
import { actifExercantUneProfessionCulturelle } from './templates/actifExercantUneProfessionCulturelle.js';
import { actifsDansLesSecteursCulturels } from './templates/actifsDansLesSecteursCulturels.js';
import { depensesCulturellesDesRegion } from './templates/depenses/depensesCulturellesDesRegion.js';
import { depensesCulturellesDesDepartements } from './templates/depenses/depensesCulturellesDesDepartements.js';
import { depenseCulturellesDesIntercommunalites } from './templates/depenses/depenseCulturellesDesIntercommunalites.js';
import { depensesCulturellesDesCommunes } from './templates/depenses/depensesCulturellesDesCommunes.js';
import { depenseDuMinistereDeLaCulture } from './templates/depenses/depenseDuMinistereDeLaCulture.js';
import { airesAttractionDesVille } from './templates/airesAttractionDesVille.js';
import { population } from './templates/population.js';
import { actionCoeurDeVille } from './templates/actionCoeurDeVille.js';
import { planDeRelance } from './templates/planDeRelance.js';
import { indiceDeJeunesse } from './templates/indiceDeJeunesse.js';

const layerDataVariables = (indicator,dataVariable) => {


  densiteDeLaPopulation(indicator,dataVariable);
  tauxDePauvrete(indicator,dataVariable);
  evolutionDeLaPopulation(indicator,dataVariable);
  niveauDeVieMedian(indicator,dataVariable);
  grilleCommunaleDeDensite(indicator,dataVariable);
  categoriesDuRuralEtDeLurbain(indicator,dataVariable);

  quartiersPrioritairesDeLaPolitiqueDeLaVille(indicator,dataVariable);
  entreprisesCulturellesDuSecteurMarchand(indicator,dataVariable);
  salarieActifsDesSecteursCulturelsMarchand(indicator,dataVariable);
  actifExercantUneProfessionCulturelle(indicator,dataVariable);

  actifsDansLesSecteursCulturels(indicator,dataVariable);

  depensesCulturellesDesRegion(indicator,dataVariable);
  depensesCulturellesDesDepartements(indicator,dataVariable);

  depenseCulturellesDesIntercommunalites(indicator,dataVariable);

  depensesCulturellesDesCommunes(indicator,dataVariable);

  depenseDuMinistereDeLaCulture(indicator,dataVariable);
  airesAttractionDesVille(indicator,dataVariable);

  population(indicator,dataVariable);

  actionCoeurDeVille(indicator,dataVariable);
  planDeRelance(indicator,dataVariable);

  indiceDeJeunesse(indicator,dataVariable);
}

export { layerDataVariables }
