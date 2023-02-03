<template>

    <div id="calendar-panel" class="panel panel-vertical panel-paddingless">
        <span class="panel">
            <span @click.stop="getPrevMonth" class="icon-circle-left"></span>
            <span class="text text-big text-bold">{{ currentMonth }} , {{ currentYear }}</span>
            <span @click.stop="getNextMonth" class="icon-circle-right"></span>
        </span>
    </div>

    <div id="calendar" class="calendar">
        <div class="calendar-head">
            <span v-for="day in days">{{ day }}</span>
        </div>
        <div id="calendar-body" class="calendar-body">
            <span class="calendar-day extra-day" v-for="skip in currentMonthFirstDayIndex">
                {{ lastDayPrevMonth - (currentMonthFirstDayIndex - skip) }}
            </span>
             <template v-for="date in lastDateCurrentMonth">
                <router-link date="something here" v-if="date == currentDate && monthToday== currentMonthIndex"
                    :to="{ name: 'daily_summary', params: { date: date } }"
                    class="calendar-day current-day"
                    @click.stop ="peekDateRecord(date)"
                     >
                    {{ date }}
                </router-link>
                <router-link 
                    v-else 
                    class="calendar-day" 
                    :to="{ name: 'daily_summary', params: { date: date } }"
                    @click.stop ="peekDateRecord(date)"
                    >
                    {{ date }}
                </router-link>
            </template>

            <span class="calendar-day extra-day" v-for="skip in (nextMonthDayIndex)">
             {{ skip }}
            </span>
        </div>
    </div>
</template>



<script setup>

import {useSession} from '@/stores/session';

import { useRouter } from 'vue-router';


import { ref } from 'vue'

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

let getNextMonth =  () => {
    
    
    // get updated values for the date
    let nextMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 2,
        0)
    

    date = nextMonth
    // console.log(`Date for following month: ${date}`)

    
    
    currentYear = ref(date.getFullYear())
    currentMonth.value = months[date.getMonth()]
    currentMonthIndex.value = date.getMonth()
    // console.log(`current month: ${lastDayPrevMonth}`)
   
    // Note:: Set the days of the next month
    // set the first day of the month 
    date.setDate(1)
    currentMonthFirstDayIndex.value = date.getDay()
    // console.log(`First day for following month: ${currentMonthFirstDayIndex.value}`)
    
    lastDayPrevMonth.value = new Date(
        date.getFullYear(),
        date.getMonth(),
        0).getDate()
    
    // console.log(`Last day of previous month: ${lastDayPrevMonth}`)

    
    // https://www.geeksforgeeks.org/how-to-get-the-number-of-days-in-a-specified-month-using-javascript/
    // new Date(...).getDate() -> returns the number of days in the month
    // 
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
}

let getPrevMonth =  () => {

    
    // // get updated values for the date
    let previousMonth = new Date(
        date.getFullYear(),
        date.getMonth() ,
        0)
    


    date = previousMonth
    console.log(`Date for previous month: ${date}`)
    
    currentYear = ref(date.getFullYear())
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
}

let piniaSession = useSession()
let peekDateRecord = (selectedDate) =>{
    let month = date.getMonth()+1
    let year = date.getFullYear()
    let toLocaleDateStringValue = `${month}/${selectedDate}/${year}`
    piniaSession.showRecordOfSelectedDate(toLocaleDateStringValue)
}

</script>

<style scoped>
.icon-circle-right,
.icon-circle-left{
    cursor: pointer;
    font-size: 1.25rem;
}

.panel{
    padding: 0;
}
</style>