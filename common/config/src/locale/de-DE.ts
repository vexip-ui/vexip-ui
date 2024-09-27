import { defineLocaleConfig } from './helper'

/**
 * German locale config.
 *
 * @author @Andrek18
 */
export function deDELocale() {
  return defineLocaleConfig({
    locale: 'de-DE',
    wordSpace: true,

    calendar: {
      year: '',
      month: '',
      month1: 'Jan',
      month2: 'Feb',
      month3: 'Mär',
      month4: 'Apr',
      month5: 'Mai',
      month6: 'Jun',
      month7: 'Jul',
      month8: 'Aug',
      month9: 'Sep',
      month10: 'Okt',
      month11: 'Nov',
      month12: 'Dez',
      week1: 'Mo',
      week2: 'Di',
      week3: 'Mi',
      week4: 'Do',
      week5: 'Fr',
      week6: 'Sa',
      week7: 'So',

      ariaLabel: {
        year: 'Jahr',
        month: 'Monat',
        month1: 'Januar',
        month2: 'Februar',
        month3: 'März',
        month4: 'April',
        month5: 'Mai',
        month6: 'Juni',
        month7: 'Juli',
        month8: 'August',
        month9: 'September',
        month10: 'Oktober',
        month11: 'November',
        month12: 'Dezember',
        week1: 'Montag',
        week2: 'Dienstag',
        week3: 'Mittwoch',
        week4: 'Donnerstag',
        week5: 'Freitag',
        week6: 'Samstag',
        week7: 'Sonntag'
      }
    },

    captcha: {
      slideEnd: 'Bitte zum Ende schieben',
      slide: 'Bitte in eine geeignete Position schieben',
      success: 'Test erfolgreich',
      fail: 'Test fehlgeschlagen, bitte wiederholen',
      doCaptcha: 'Bitte füllen Sie das folgende Captcha aus',
      pointInOrder: 'Bitte zeigen Sie in der Reihenfolge',
      trigger: 'Klicken Sie auf das Captcha',
      completed: 'Captcha abgeschlossen'
    },

    checkbox: {
      all: 'Alle'
    },

    colorPicker: {
      confirm: 'Bestätigen',
      cancel: 'Abbrechen',

      ariaLabel: {
        clear: 'Farbe löschen'
      }
    },

    confirm: {
      confirm: 'Bestätigen',
      cancel: 'Abbrechen'
    },

    datePicker: {
      confirm: 'Bestätigen',
      cancel: 'Abbrechen',
      placeholder: {
        year: 'Jahr',
        month: 'Monat',
        date: 'Datum',
        datetime: 'Datum/Zeit',
        start: 'Start',
        end: 'Ende',
        select: 'Bitte auswählen'
      },
      startTime: 'Start Zeit',
      endTime: 'Ende Zeit',

      ariaLabel: {
        clear: 'Datum löschen',
        quarter: 'Quartal',
        week: 'Woche',
        date: 'Tag',
        hour: 'Stunde',
        minute: 'Minute',
        second: 'Sekunde'
      }
    },

    drawer: {
      confirm: 'Bestätigen',
      cancel: 'Abbrechen'
    },

    form: {
      submit: 'Senden',
      reset: 'Zurücksetzen',
      notNullable: 'Darf nicht leer sein',
      validateFail: 'Überprüfung fehlgeschlagen'
    },

    image: {
      placeholder: 'Lade...',
      error: 'Laden fehlgeschlagen'
    },

    input: {
      placeholder: 'Platzhalter',

      ariaLabel: {
        clear: 'Löschen'
      }
    },

    layout: {
      signOut: 'Abmelden',
      signType: 'Navigationsart',
      majorColor: 'Hauptfarbe',
      themeMode: 'Themeart'
    },

    modal: {
      confirm: 'Bestätigen',
      cancel: 'Abbrechen'
    },

    numberInput: {
      placeholder: 'Bitte Nummer eingeben',
      outOfRange: 'Außerhalb des definierten Bereichs',

      ariaLabel: {
        clear: 'Löschen',
        increase: 'Erhöhen',
        decrease: 'Verringern'
      }
    },

    pagination: {
      page: 'Seite | Seiten',
      perPage: '/ Seite',
      prevPage: 'Vorherige Seite',
      nextPage: 'Nächste Seite',
      prev: 'Vorherige',
      next: 'Nächste',
      total: 'Total',
      jumpTo: 'Springe zu',
      itemUnit: 'Item | Items'
    },

    select: {
      placeholder: 'Bitte auswählen',
      empty: 'Keine Daten',
      search: 'Suche Optionen',

      ariaLabel: {
        clear: 'Löschen'
      }
    },

    table: {
      empty: 'Keien Daten',
      filterConfirm: 'Filtern',
      filterReset: 'Zurücksetzen',
      filterAll: 'Alle'
    },

    timeAgo: {
      ago: 'Vor',
      late: 'Später',
      justNow: 'Jetzt',
      second: 'Sekunde | Sekunden',
      minute: 'Minute | Minuten',
      hour: 'Stunde | Stunden',
      yesterday: 'Gestern',
      days: 'Tage',
      lastMonth: 'Letzter Monat',
      months: 'Monate',
      lastYear: 'Letztes Jahr',
      years: 'Jahre'
    },

    timePicker: {
      confirm: 'Bestätigen',
      cancel: 'Abbrechen',
      placeholder: {
        time: 'Zeit',
        start: 'Start',
        end: 'Ende',
        select: 'Bitte auswählen'
      },

      ariaLabel: {
        clear: 'Zeit löschen',
        hour: 'Stunde',
        minute: 'Minute',
        second: 'Sekunde'
      }
    },

    tour: {
      prev: 'Voherige',
      next: 'Nächste',
      done: 'Fertig',
      stepCount: 'Schritt {n}'
    },

    transfer: {
      source: 'Quelle',
      target: 'Ziel',
      empty: 'Keine Daten',
      reverse: 'Auswahl umkehren',
      search: 'Suche (Strg + F)'
    },

    tree: {
      empty: 'Keine Daten'
    },

    upload: {
      upload: 'Dateiupload',
      uploading: 'Hochladen',
      dragOrClick: 'Ziehen Sie Dateien hierher oder klicken Sie zum Hochladen',

      ariaLabel: {
        preview: 'Dateivorschau',
        delete: 'Datei löschen'
      }
    },

    video: {
      play: 'Spielen',
      pause: 'Pause',
      playPrev: 'Zurück',
      playNext: 'Nächster',
      refresh: 'Auffrischen',
      flip: 'Schnipsen',
      requestPip: 'Hier kommt PIP ins Spiel',
      exitPip: 'PIP beenden',
      fullWindow: 'Volles Fenster',
      fullWindowExit: 'Volles Fenster beenden',
      fullScreen: 'Vollbild',
      fullScreenExit: 'Vollbild beenden',
      chapterCount: 'Kapitel {n}'
    },

    viewer: {
      rotateRight: 'Nach rechst drehen',
      rotateLeft: 'Nach links drehen',
      flipHorizontal: 'Horizontal spiegeln',
      flipVertical: 'Vertikal spiegeln',
      zoomIn: 'Hineinzoomen',
      zoomOut: 'Hinauszoomen',
      fullScreen: 'Vollbild',
      fullScreenExit: 'Vollbild beenden',
      reset: 'Zurücksetzen'
    }
  })
}
