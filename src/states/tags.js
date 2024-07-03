import { reactive } from 'vue'

export const tags = reactive({
  // Strany
  parties: {
    Pravicová: {
      tag: 'bg-indigo-400',
      color: 'indigo-400',
      text: 'text-indigo-400'
    },
    SocDem: {
      tag: 'bg-red-400',
      color: 'red-400',
      text: 'text-red-400'
    },
    Kresťanská: {
      tag: 'bg-green-300',
      color: 'green-300',
      text: 'text-green-300'
    },
    Liberálna: {
      tag: 'bg-sky-300',
      color: 'sky-300'
    },
    Antisystém: {
      tag: 'bg-gray-300',
      color: 'gray-300'
    },
    Maďarská: {
      tag: 'bg-orange-300',
      color: 'orange-300'
    }
  },
  // Výbory
  committees: {
    Zahraničný: ' border-amber-900 text-amber-900',
    Finančný: ' border-lime-800 text-lime-800',
    Ľudskoprávny: ' border-pink-700 text-pink-700',
    Zdravotnícky: ' border-blue-600 text-blue-600',
    Školský: ' border-yellow-500 text-yellow-500',
    Kultúra: ' border-indigo-800 text-indigo-800'
  }
})
