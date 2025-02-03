import router from '../router'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  locale: 'sk',
  fallbackLocale: 'sk',
  messages: {
    //!  -------------------------
    //! SlOVAK
    //!  -------------------------
    sk: {
      general: {
        logOut: 'Odhlásiť sa',
        committees: {
          // TO BE ADDED and made work with the rest of the app
        }
      },
      attendee: {
        welcomeMessage: 'Vitajte v hlasovacom systéme MPS 2024 ',
        activePolls: {
          title: 'Aktívne hlasovania',
          noActivePolls: 'Žiadne aktívne hlasovania',
          pollVoteAction: 'Hlasovať'
        },

        loggedInAs: 'Prihlásený ako'
      },
      pageNotFound: {
        title: 'Strnánka, ktorú ste hľadali žiaľ neexistuje.',
        backToLogin: 'Späť na prihlásenie'
      },

      admin: {
        sideBar: {},
        userManagement: {
          title: 'Správa Účastníkov',
          subtitle: 'Sekcia na spravovanie účastníckych profilov',

          table: {
            name: 'Meno',
            email: 'Email',
            party: 'Ideológia',
            committee: 'Komisia',
            code: 'Kód',
            actions: 'Akcie',

            actionDescriptions: {
              edit: 'Upraviť',
              delete: 'Vymazať'
            },

            noAttendeesFound: 'Nenašli sa žiadni účastníci'
          }
        }
      }
    },

    //!  -------------------------
    //! ENGLISH
    //!  -------------------------
    en: {
      general: {
        logOut: 'Log out'
      },
      attendee: {
        welcomeMessage: 'Welcome to the voting system for MPS 2024',

        activePolls: {
          title: 'Current Polls',
          noActivePolls: 'No active polls',

          pollVoteAction: 'Vote'
        },
        loggedInAs: 'Logged in as'
      },

      pageNotFound: {
        title: 'The page you were looking for does not exist.',
        backToLogin: 'Back to login'
      }
    }
  }
})

export function registerPlugins(app) {
  app.use(router)
  app.use(i18n)
}
