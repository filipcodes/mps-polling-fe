<template>
  <AppButtonLink @click="changeLanguage" type="secondary" class="uppercase">{{
    currentLanguage
  }}</AppButtonLink>
</template>

<script>
import AppButtonLink from '@/components/AppButtonLink.vue'
import { i18n } from '@/plugins/index.js'
export default {
  name: 'AppChangeLanguageButton',
  setup() {
    return {}
  },
  data() {
    return {
      currentLanguage: 'sk',
      languages: [
        {
          name: 'Slovensky',
          code: 'sk'
        },
        {
          name: 'English',
          code: 'en'
        }
      ]
    }
  },
  methods: {
    changeLanguage() {
      const newLanguage = this.currentLanguage === 'sk' ? 'en' : 'sk'
      i18n.global.locale = newLanguage
      this.currentLanguage = newLanguage
    }
  },
  components: {
    AppButtonLink
  }
}
</script>

<style scoped></style>
