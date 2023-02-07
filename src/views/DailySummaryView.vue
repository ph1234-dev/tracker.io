<script setup>
import { useRoute } from 'vue-router';
import {db} from '@/stores/db.js'
import {onMounted,ref,toRaw} from 'vue'
import { useSession } from '@/stores/session';
let route = useRoute()

let piniaSession = useSession()

let showRecord = ref()
// console.log(`show record: ${showRecord}`)
let totalCalories = ref(0)

// non reactive since we aren't changing it anyway
let stringDate 
onMounted( async () => {
    let date = ref()
    date = piniaSession.getRecordOfSelectedDate()
    // console.log("Key identified:: " + key)
    
    // since its the first variable its considered th key path
    // even if you dont specify it , it will use date like {date: 'the date'}
    let record = await db.foodRecord.get(date)
    
    if (record == undefined){
        showRecord.value = false  
    }else{
        showRecord.value = true

        let list = record.foodTaken
        list.forEach(item => {
            totalCalories.value = totalCalories.value +  item.calories
        });

    }

    const convertedDateToRaw = new String(structuredClone(toRaw(date)));
    let [month,day,year] = convertedDateToRaw.split('/')
    stringDate = `${monthList[month-1]} ${day}, ${year}`
})

// props
// https://blog.openreplay.com/an-ultimate-guide-to-the-vue-3-composition-api
let props = defineProps(['date'])
// console.log("date passed into props: " + JSON.stringify(props))

let monthList = ['Jan','Feb','Mar','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

</script>



<template>
    <div class="panel panel-vertical">
        <div class="block block-gapless">
            <h2>{{ stringDate }}</h2>
            <p class="text">Here is how much you consumed</p>
        </div>
        <div class="block block-gapless">
            <span id="total-cal" class="text text-biggest text-bold">{{ totalCalories }} </span>
                <span class="text text text-big">calories</span>
        </div>
                
        <span class="panel">
            <router-link v-if="showRecord" class="btn btn-accent" :to="{ name: 'daily_actual_record' }">
                Show Record
            </router-link>
            <router-link :to="{ name: 'store_food' }" class="btn btn-primary">
                Store Record
            </router-link>
        </span>
    </div>
</template>
