
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


// export const useSession = defineStore('session',()=>{

//     let dateSelected = ref()
    
//     let foodTakenRecord = ref()

//     function showRecordOfSelectedDate(date){
//       dateSelected.value = date
//       console.log(`Storing session[date] -> ${date}`)
//     }

//     function getRecordOfSelectedDate(){
//         return dateSelected.value
//     }

//     function setFoodTakenRecord(array){
//         foodTakenRecord.value = array
//     }

//     function getFoodTakenRecord(){
//         return foodTakenRecord
//     }
    
    
//     return{
//       dateSelected,
//       showRecordOfSelectedDate,
//       getRecordOfSelectedDate,
//       getFoodTakenRecord,
//       setFoodTakenRecord
//     }
//   })



export const useSession = defineStore('session',
    ()=>{

    let dateSelected = ref()
    
    let foodTakenRecord = ref()

    function showRecordOfSelectedDate(date){
      dateSelected.value = date
      console.log(`Storing session[date] -> ${date}`)
    }

    function getRecordOfSelectedDate(){
        return dateSelected.value
    }

    function setFoodTakenRecord(array){
    }

    function getFoodTakenRecord(){
        return foodTakenRecord
    }
    
    
    return{
      dateSelected,
      showRecordOfSelectedDate,
      getRecordOfSelectedDate,
      getFoodTakenRecord,
      setFoodTakenRecord
    }
    },
//   enabling plugin follow this
//   https://pinia.vuejs.org/core-concepts/plugins.html#adding-new-options
  {
    persist: true
  })