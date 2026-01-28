# High Contrast Mode - Documentation

## Fonctionnalités implémentées

### 1. Accessibilité WCAG AAA
- **Ratios de contraste** : 7:1+ (conformité WCAG AAA)
- **Couleurs** : Noir (#000000), Blanc (#ffffff), Jaune (#ffff00)
- **Bordures visibles** : Tous les éléments interactifs ont des bordures de 2-3px

### 2. Persistance de la préférence
- **localStorage** : La préférence de l'utilisateur est sauvegardée
- **Cross-page** : Le mode persiste lors de la navigation entre les pages
- **Fallback** : Détection automatique de `prefers-contrast: high` du système

### 3. Interface utilisateur
- **Toggle dans le footer** : Disponible sur toutes les pages
- **Texte dynamique** : Change entre "High Contrast Mode" et "Normal Mode"
- **Feedback visuel** : Couleur jaune au survol en mode high contrast

### 4. Attributs ARIA pour l'accessibilité
- `role="button"` : Identifie le lien comme un bouton interactif
- `aria-pressed` : Indique l'état actif/inactif (true/false)
- `aria-label` : Description accessible pour les lecteurs d'écran

### 5. Compatibilité
- **Navigateurs modernes** : Chrome, Firefox, Safari, Edge
- **Lecteurs d'écran** : Compatible NVDA, JAWS, VoiceOver
- **Mobile** : Fonctionne sur iOS et Android

## Utilisation

### Pour les utilisateurs
1. Cliquer sur "High Contrast Mode" dans le footer
2. Le mode s'active instantanément
3. Cliquer sur "Normal Mode" pour revenir

### Pour les développeurs
Le script `high-contrast.js` :
- S'initialise automatiquement au chargement de la page
- Ajoute la classe `high-contrast` à l'élément `<html>`
- Utilise les variables CSS définies dans `styles.css`

## Éléments stylisés en mode high contrast

- ✅ Navbar (topbar)
- ✅ Footer
- ✅ Tiles/Cards
- ✅ Boutons sociaux
- ✅ Liens email
- ✅ Audio players
- ✅ Images (bordures blanches)
- ✅ Liens de navigation
- ✅ Contenu textuel

## Tests recommandés

1. **Test de contraste** : Utiliser WebAIM Contrast Checker
2. **Test de navigation** : Naviguer uniquement au clavier (Tab)
3. **Test de lecteur d'écran** : Vérifier avec NVDA ou VoiceOver
4. **Test de persistance** : Activer, recharger la page, vérifier l'état
5. **Test cross-page** : Activer sur une page, naviguer vers une autre

## Conformité WCAG

- ✅ **WCAG 2.1 Level AAA** : Contraste de 7:1+
- ✅ **1.4.6 Contrast (Enhanced)** : Contraste suffisant
- ✅ **1.4.8 Visual Presentation** : Personnalisation des couleurs
- ✅ **2.1.1 Keyboard** : Accessible au clavier
- ✅ **4.1.2 Name, Role, Value** : ARIA approprié
