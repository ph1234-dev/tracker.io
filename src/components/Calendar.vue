<template>

    <div id="calendar-panel" class="panel panel-vertical panel-paddingless">
        <span class="panel">
            <span @click.stop="getPrevMonth" class="icon-circle-left"></span>
            <h3>{{ currentMonth }} , {{ currentYear }}</h3>
            <!-- <span class="text text-big text-bold"></span> -->
            <span @click.stop="getNextMonth" class="icon-circle-right"></span>
        </span>
        <p>Hover and select the date to start logging your record</p>
    </div>

    <div id="calendar" class="calendar">
        <div class="calendar-head">
            <span v-for="day in days">{{ day }}</span>
        </div>
        <div id="calendar-body" class="calendar-body">
            <span class="calendar-day extra-day" v-for="skip in currentMonthFirstDayIndex">
               <span> {{ lastDayPrevMonth - (currentMonthFirstDayIndex - skip) }}</span>
            </span>
             <template v-for="date in lastDateCurrentMonth">
               <router-link
                    :data-month="currentMonthIndex + 1"
                    :data-date="date"
                    :data-year="currentYear"
                    class="calendar-day effect-hover" 
                    :to="{ name: 'daily_summary'}"
                    @click.stop ="peekDateRecord(date)"
                    >
                    {{ date }}
                    <span class=" calorie-data"></span>
                </router-link>
            </template>

            <span class="calendar-day extra-day" v-for="skip in (nextMonthDayIndex)">
                <span>{{ skip }}</span>
            </span>
        </div>
    </div>
</template>



<script setup>

import {useSession} from '@/stores/session';
import { db } from "@/stores/db.js"
import { useRouter } from 'vue-router';


import { ref,onMounted,watch,toRaw} from 'vue'

let router = useRouter()


// taken form previous work
let calendarData = []
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
let date = new Date()

const monthToday = date.getMonth(); 
console.log(`Month Today: ${monthToday}`)
console.log(`New Month Today: ${new Date().getMonth()}`)


const currentDate = date.getDate()
let currentMonth = ref(months[date.getMonth()])
let currentYear = ref(date.getFullYear())
let currentMonthIndex = ref(date.getMonth())

// const date = new Date()

// returns the first day of the month given the year
// changing 1 into zero here gets the last day of the previous month
// so we add 1 to get the last day of the current month
let lastDateCurrentMonth = ref(
    new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0).getDate()
)

// it will return the index of the week
// this will be needed to display the days 
// of the following month
let lastDayCurrentMonthIndex = ref(
    new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0).getDay()
)


let lastDayPrevMonth = ref(
    new Date(
        date.getFullYear(),
        date.getMonth(),
        0).getDate()
)

// set the first day of the month since we specified
// that today is the date
date.setDate(1)

// returns the day (mon, tue...)
let currentMonthFirstDayIndex = ref(date.getDay())

// show how many days are remaining for the next calendar day
// 6 - last day because it starts with 0
let nextMonthDayIndex = ref(6 - lastDayCurrentMonthIndex.value)

let getNextMonth =  async () => {

    // get updated values for the date
    let nextMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 2,
        0)

    date = nextMonth
    // console.log(`Date for following month: ${date}`)

    currentYear.value = date.getFullYear()
    currentMonth.value = months[date.getMonth()]
    currentMonthIndex.value = date.getMonth()

    // Note:: Set the days of the next month
    // set the first day of the month 
    date.setDate(1)
    currentMonthFirstDayIndex.value = date.getDay()
    // console.log(`First day for following month: ${currentMonthFirstDayIndex.value}`)

    lastDayPrevMonth.value = new Date(
        date.getFullYear(),
        date.getMonth(),
        0).getDate()

    // https://www.geeksforgeeks.org/how-to-get-the-number-of-days-in-a-specified-month-using-javascript/
    // new Date(...).getDate() -> returns the number of days in the month
    lastDateCurrentMonth.value = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0).getDate()
    // console.log(`last day of current month: ${lastDateCurrentMonth.value}`)


    lastDayCurrentMonthIndex.value =
        new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0).getDay()

    nextMonthDayIndex.value = 6 - lastDayCurrentMonthIndex.value


    showTotalCalories()
   
    
}

let getPrevMonth =   () => {


   
    // // get updated values for the date
    let previousMonth = new Date(
        date.getFullYear(),
        date.getMonth() ,
        0)
    
    date = previousMonth
    console.log(`Date for previous month: ${date}`)
    
    currentYear.value = date.getFullYear()
    currentMonth.value = months[date.getMonth()]
    currentMonthIndex.value = date.getMonth()
    console.log(`current month: ${currentMonth.value}`)

    // Note:: Set the days of the previous month
    date.setDate(1)
    currentMonthFirstDayIndex.value = date.getDay()
    console.log(`First day for following month: ${currentMonthFirstDayIndex.value}`)
    
    
    // Note:: Set the last days of the previous month
    // // https://www.geeksforgeeks.org/how-to-get-the-number-of-days-in-a-specified-month-using-javascript/
    // // new Date(...).getDate() -> returns the number of days in the month
    // read fix on why we need to add +1 in getMonth()
    // https://stackoverflow.com/questions/68749467/getting-the-wrong-number-of-days-from-js-date-object
    // as a date.getMonth() returns 9 which is October cause index start form 0, 
    // but while passing the parameter we need to pass the general index number 
    // of the month for that you have to do +1
    lastDateCurrentMonth.value = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0).getDate()
    console.log(`last day of current month: ${lastDateCurrentMonth.value}`)

    
    // Note:: Set the first days of the next month
    lastDayCurrentMonthIndex.value = 
        new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0).getDay()

    nextMonthDayIndex.value = 6 - lastDayCurrentMonthIndex.value    
    let currentDateElement = document.querySelector('.current-day')
    if (currentDate == undefined) {
        console.log(`Cannot remove marking`)
        currentDateElement.classList.remove('current-day')
    } else {
        console.log(`can remove marking`)
    }
    
    showTotalCalories()

}

let piniaSession = useSession()
let peekDateRecord = (selectedDate) =>{
    let month = date.getMonth()+1
    let year = date.getFullYear()
    let toLocaleDateStringValue = `${month}/${selectedDate}/${year}`
    piniaSession.showRecordOfSelectedDate(toLocaleDateStringValue)
}



let showTotalCalories = async () =>{

    // clear calorie indicator
    let clearDataIndicator = new Promise(resolve => {
        let calorieDataIndicator = document.querySelectorAll('.calorie-data')
        calorieDataIndicator.forEach(el => { 
             el.innerHTML = ''
        });
        resolve(true)
    })

    await clearDataIndicator


    let calendarDays = document.querySelectorAll('.calendar-day')

    let setCaloriesElement = async (el,month,date,year) =>{
        
        let strDate = `${month}/${date}/${year}`

        // // IF YOU WANT To resolve promise without making it asynchronous 
        // // or use await use .then(e=>{}).catch(e=>{})
        let data = await db.foodRecord.get(strDate)
        let totalCal = 0

        if (data != undefined ){
            let foodTaken = data.foodTaken
            
            if ( foodTaken != undefined){
                foodTaken.forEach(item=>{
                    totalCal += item.calories
                }) 
                el.querySelector('.calorie-data').innerHTML = totalCal + ' cal'
            }
        }
    }

    calendarDays.forEach(el=>{
        if (el == undefined) return
        let month = parseInt(el.getAttribute('data-month'))
        let date = parseInt(el.getAttribute('data-date'))
        let year = parseInt(el.getAttribute('data-year'))
        setCaloriesElement(el,month,date,year)
        
        // console.log(`Testing: ${month}/${date}/${year}`)
        // console.log(`\tCheck Flag: 
        //     ${currentMonthIndex.value}/${currentDate}/${currentYear.value}`)
        
        if ((month-1) == currentMonthIndex.value){
            if (date == currentDate){
                if (year == currentYear.value){
                    el.classList.add('current-day')
                }
            }
        }
    })


    let targetEl = document.querySelector('.current-day')
    if (targetEl.getAttribute('data-month') != null){
        let storedMonth = parseInt(targetEl.getAttribute('data-month'))

        // we subtract one because the counting of month starts with 0
        // but the storedMonth starts with 1 on counting 
        if ((storedMonth-1) != new Date().getMonth()){
            targetEl.classList.remove('current-day')
        }
    }

    
}

// lets update calendar for loading   
onMounted(() => {  showTotalCalories() })



let mouseHoverEvent = async (el) =>{
    
    let animation = new Promise((resolve,reject)=>{
        // el.style.
    })

    await animation
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variable';




.effect-hover:not(.current-day):hover{
    animation-name:  animation-hover-color-chnage;
    animation-duration: .6s;
    animation-fill-mode: forwards;
}

@keyframes animation-hover-color-chnage{
    // from{background-color: currentColor;}
    to {
        background-color: variable.$bg-accent
        // @include variable.paint-accent
    }
}


.icon-circle-right,
.icon-circle-left{
    cursor: pointer;
    font-size: 1.25rem;
}

.panel{
    padding: 0;
}

.calorie-data{
    /* background-color: gold; */
    font-size: 85%;
    word-break: break-all;
}

</style>