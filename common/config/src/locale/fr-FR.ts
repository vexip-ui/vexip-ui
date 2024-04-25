import { defineLocaleConfig } from './helper'

/**
 * French locale config
 */
export function frFRLocale() {
  return defineLocaleConfig({
    locale: 'fr-FR',
    wordSpace: true,

    calendar: {
      year: '',
      month: '',
      month1: 'Jan',
      month2: 'Fev',
      month3: 'Mar',
      month4: 'Avr',
      month5: 'Mai',
      month6: 'Juin',
      month7: 'Juil',
      month8: 'Août',
      month9: 'Sept',
      month10: 'Oct',
      month11: 'Nov',
      month12: 'Déc',
      week1: 'Lu',
      week2: 'Ma',
      week3: 'Me',
      week4: 'Je',
      week5: 'Ve',
      week6: 'Sa',
      week7: 'Di',

      ariaLabel: {
        year: 'Année',
        month: 'Mois',
        month1: 'Janvier',
        month2: 'Février',
        month3: 'Mars',
        month4: 'Avril',
        month5: 'Mai',
        month6: 'Juin',
        month7: 'Juillet',
        month8: 'Août',
        month9: 'Septembre',
        month10: 'Octobre',
        month11: 'Novembre',
        month12: 'Décembre',
        week1: 'Lundi',
        week2: 'Mardi',
        week3: 'Mercredi',
        week4: 'Jeudi',
        week5: 'Vendredi',
        week6: 'Samedi',
        week7: 'Dimanche'
      }
    },

    captcha: {
      slideEnd: "Veuillez faire défiler jusqu'à la fin",
      slide: "Veuillez faire définer jusqu'à une position appropriée",
      success: 'Test réussi',
      fail: 'Test échoué, veuillez recommencer',
      doCaptcha: 'Veuillez compléter le captcha ci-dessous',
      pointInOrder: "Veuillez indiquer dans l'ordre",
      trigger: 'Cliquer pour déclencher le captcha',
      completed: 'Captcha complété'
    },

    checkbox: {
      all: 'Tous'
    },

    colorPicker: {
      confirm: 'Confirmer',
      cancel: 'Annuler'
    },

    confirm: {
      confirm: 'Confirmer',
      cancel: 'Annuler'
    },

    datePicker: {
      confirm: 'Confirmer',
      cancel: 'Annuler',
      placeholder: {
        year: 'année',
        month: 'mois',
        date: 'journée',
        datetime: 'date & heure',
        start: 'Début',
        end: 'Fin',
        select: 'Sélectionner une'
      },
      startTime: 'Heure de début',
      endTime: 'Heure de fin',

      ariaLabel: {
        quarter: 'Trimestre',
        week: 'Semaine',
        date: 'Jour',
        hour: 'Heure',
        minute: 'Minute',
        second: 'Seconde'
      }
    },

    drawer: {
      confirm: 'Confirmer',
      cancel: 'Annuler'
    },

    form: {
      submit: 'Soumettre',
      reset: 'Réinitialiser',
      notNullable: 'Ne doit pas être vide',
      validateFail: 'Echec de la validation'
    },

    image: {
      placeholder: 'Chargement...',
      error: 'Echec du chargement'
    },

    input: {
      placeholder: 'Veuillez saisir'
    },

    layout: {
      signOut: 'Se déconnecter',
      signType: 'Type de navigation',
      majorColor: 'Couleur principale',
      themeMode: 'Thème de couleur'
    },

    modal: {
      confirm: 'Confirmer',
      cancel: 'Annuler'
    },

    numberInput: {
      placeholder: 'Veuillez saisir le numéro',
      outOfRange: 'En dehors de la zone définie',

      ariaLabel: {
        increase: 'Augmenter',
        decrease: 'Diminuer'
      }
    },

    pagination: {
      page: 'Page | Pages',
      perPage: '/ Page',
      prevPage: 'Page précédente',
      nextPage: 'Page suivante',
      prev: 'Précédent',
      next: 'Suivant',
      total: 'Total',
      jumpTo: 'Sauter vers',
      itemUnit: 'Objet | Objets'
    },

    select: {
      placeholder: 'Veuillez sélectionner',
      empty: 'Pas de données'
    },

    table: {
      empty: 'Pas de données',
      filterConfirm: 'Filtrer',
      filterReset: 'Effacer les filtres',
      filterAll: 'Tous'
    },

    timeAgo: {
      ago: 'Avant',
      late: 'Plus tard',
      justNow: 'Maintenant',
      second: 'Seconde | Secondes',
      minute: 'Minute | Minutes',
      hour: 'Heure | Heures',
      yesterday: 'Hier',
      days: 'Jour',
      lastMonth: 'Le mois dernier',
      months: 'Mois',
      lastYear: "L'année dernière",
      years: 'Années'
    },

    timePicker: {
      confirm: 'Confirmer',
      cancel: 'Annuler',
      placeholder: {
        time: 'heure',
        start: 'Début',
        end: 'Fin',
        select: 'Veuillez sélectionner'
      },

      ariaLabel: {
        hour: 'Heure',
        minute: 'Minute',
        second: 'Seconde'
      }
    },

    tour: {
      prev: 'Précédent',
      next: 'Suivant',
      done: 'Prêt',
      stepCount: 'Étape {n}'
    },

    transfer: {
      source: 'Source',
      target: 'Cible',
      empty: 'Pas de données',
      reverse: 'Inverser la sélection',
      search: 'Rechercher (Ctrl + F)'
    },

    tree: {
      empty: 'Pas de données'
    },

    upload: {
      upload: 'Télécharger des fichiers',
      uploading: 'Téléchargement',
      dragOrClick: 'Faites glisser les fichiers ici, ou cliquez pour les télécharger'
    },

    video: {
      play: 'Jouer',
      pause: 'Pause',
      playPrev: 'Précédent',
      playNext: 'Suivant',
      refresh: 'Rafraîchir',
      flip: 'Retourner',
      requestPip: 'Entrer dans PIP',
      exitPip: 'Quitter PIP',
      fullWindow: 'Fenêtre pleine',
      fullWindowExit: 'Quitter la fenêtre pleine',
      fullScreen: 'Plein écran',
      fullScreenExit: 'Quitter le plein écran',
      chapterCount: 'Chapitre {n}'
    },

    viewer: {
      rotateRight: 'Tourner vers la droite',
      rotateLeft: 'Tourner vers la gauche',
      flipHorizontal: 'Retourner horizontalement',
      flipVertical: 'Retourner verticalement',
      zoomIn: 'Zoomer avant',
      zoomOut: 'Zoom arrière',
      fullScreen: 'Plein écran',
      fullScreenExit: 'Quitter le plein écran',
      reset: 'Réinitialiser'
    }
  })
}
