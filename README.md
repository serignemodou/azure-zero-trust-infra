###### Pour quoi azure policy
- Mise en place de le gouvernance pour la coherence des ressources
- Conformité réglementaire
- La sécurité
- La gestion des coûts.  

###### Azure policy definition
Recommandation: Créer et utiliser les Initiative Definition
- Definition strategy
- Intiative Definition

###### Azure Policy Evaluation
Comment les Policy sont évaluées (déclanchées)
- Création ou mise à jour d'une ressource
- Création ou mise à jour d'un Definition Policy ou Initiative Defiinition déjà affecter à une ressource
- Affection d'une definition strategy ou Iniative definition à une étendue
- Lors du cycle de vie d'évaluation standard, qui se produit toutes les 24H. 

###### Azure Policy Affectation
Recommandation: Assigner les Policy à des niveaux supérieurs comme: Subscription
- Management Group
- Subscription
- Resource Group
- Resources

###### Azure Policy Concept
- Effect
    1. Audit, AuditIfNotExist, Deny, DenyIfNotExist, Modify
    2. Recommandation: Commencer par les effects: Audit, ou AuditIfNotExist
- Parameters
- Conditions
- PolicyRule
- mode: Determine les types de ressources à évaluer
- Operator Logique
  1. not -> inverse le résultat de la condition
  2. allOf -> Exige que toutes les conditions soient remplies (semblable à un and)
  3. anyOf -> Exige qu'au moins une conditions soient remplies (semblable à or)



###### Azure Policy Deployment
Recommandation: Déployer les azure policy avec de l'IAC

###### Tutorial avec Pulumi
1. Créer des policy definition stratégy azure pour le storage account
   - Public access must be disabled
   - Geo-redundant storage should be enabled
   - Enforce minimum TLS version
   - Soft delete should be enabled for blobs
   - Restrict Ips ranges in storage account firewall rules
   - Restrict network access to allow address range only 
   - Allow access from trusted microsoft services

2. Créer une initiative definition
3. Ajouter toutes les policy definition stratégy dans l'initiative definition
4. Assigner l'iniative definition au subscription