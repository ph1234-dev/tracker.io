<script setup>
import { useRoute } from 'vue-router';
import {db} from '@/stores/db.js'
import {onMounted,ref} from 'vue'
import { useSession } from '@/stores/session';
let route = useRoute()

let piniaSession = useSession()

let showRecord = ref()
// console.log(`show record: ${showRecord}`)

onMounted( async () => {
    let key = piniaSession.getRecordOfSelectedDate()
    // console.log("Key identified:: " + key)
    let record = await db.foodRecord.get({date: key})
    console.log(`Get Record of selected date << ${key}`)
    
    console.log(`Record: ${record}`)
    if (record == undefined){
        showRecord.value = false  
        console.log("Where now? found undefined")
    }else{
        showRecord.value = true
        console.log("Where now? its great")
    }
    console.log(`Show Record: ${JSON.stringify(showRecord.value)}`)
})

// props
// https://blog.openreplay.com/an-ultimate-guide-to-the-vue-3-composition-api
let props = defineProps(['date'])
// console.log("date passed into props: " + JSON.stringify(props))


</script>



<template>
    <div class="panel panel-vertical">
        <span class="text text-biggest text-bold">Daily Summary</span>
        <div class="block block-gapless">
            <div id="total-cal" class="text text-bigger text-bold ">1500 cal</div>
            <div class="text">Consumed</div>
        </div>
        <span class="panel">
            <router-link
                v-if="showRecord"
                class="btn btn-accent" 
                :to= "{name: 'daily_actual_record'}">
                Show Record
            </router-link>
            <router-link
                :to= "{name: 'store_food'}"
                class="btn btn-primary"  >
                Store Record
            </router-link>
        </span>
    </div>
</template>
