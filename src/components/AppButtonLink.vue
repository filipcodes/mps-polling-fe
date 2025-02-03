<template>
  <component
    :is="tag"
    :to="to"
    :class="[
      'relative tracking-wider block outline-none cursor-pointer transition duration-200 ease-out rounded-md',
      typeClasses
    ]"
    :href="href"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'ButtonLink',
  props: {
    tag: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'a', 'RouterLink'].includes(value)
    },
    to: {
      type: [String, Object],
      default: null
    },
    type: {
      type: String,
      default: 'primary',
      validator: (value) =>
        [
          'primary',
          'secondary',
          'tertiary',
          'underlined',
          'inactive',
          'pollOption',
          'alertClose',
          'adminButton',
          'adminButtonSecondary'
        ].includes(value)
    }
  },

  computed: {
    typeClasses() {
      switch (this.type) {
        case 'primary':
          return 'text-white text-lg font-bold bevan border-blue-500 border-2 fill-white hover:fill-blue-500 bg-blue-500 px-4 py-2 hover:bg-white hover:text-blue-500'
          break
        case 'secondary':
          return 'text-blue-500 text-lg font-bold bevan border-blue-500 border-2 bg-white px-4 py-2 hover:bg-blue-500 hover:text-white '
          break
        case 'tertiary':
          return 'text-gray-700 text-md md:text-lg font-bold bevan  bg-white px-4 py-2 hover:bg-gray-100 active:bg-gray-200'
          break
        case 'underlined':
          return 'text-gray-400 underline px-2 hover:no-underline active:bg-gray-100'
          break
        case 'inactive':
          return 'text-gray-400 text-lg bevan bg-gray-200 border-2 px-2 py-2 fill-gray-400  cursor-not-allowed pointer-events-none'
          break
        case 'pollOption':
          return 'text-blue-500 text-lg bevan bg-blue-200 px-2 border-2 border-blue-200 hover:border-blue-300  py-2 fill-blue-400 hover:bg-blue-300'
          break
        case 'alertClose':
          return 'text-gray-700 text-md font-bold bevan  bg-[#DEDEDE7F] px-4 py-2 hover:bg-gray-100 active:bg-gray-200'
          break
        case 'adminButton':
          return 'text-white text-lg font-bold bevan border-red-600 border-2 fill-white hover:fill-red-600 bg-red-600 px-4 py-2 hover:bg-white hover:text-red-600'
          break
        case 'adminButtonSecondary':
          return 'text-red-600 text-lg font-bold bevan border-red-600 border-2 bg-white px-4 py-2 hover:bg-red-600 hover:text-white '
          break
      }
    },

    href() {
      return this.tag === 'a' ? this.to : null
    }
  }
}
</script>

<style scoped>
button:focus {
  box-shadow: 0 0 0 4px #3b83f681;
}

a:focus {
  box-shadow: 0 0 0 4px #3b83f681;
}
</style>
