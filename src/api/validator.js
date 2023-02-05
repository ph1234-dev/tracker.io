// https://softauthor.com/vue-js-3-composition-api-reusable-scalable-form-validation/
import { reactive } from "@vue/reactivity";


// reactive dictionary 
// to check its length 
// Object.keys(myObject).length 
// as suggested from https://tomekkolasa.com/how-to-check-if-object-is-empty-in-javascript
const formErrors = reactive({});
export let useFormValidator = () =>{    
    
    let validateEmptyField = (fieldName,fieldValue,customMessage) => {
        
        if ( customMessage ){
            // console.log("has custom message")
            if (fieldValue === ""){
                formErrors[fieldName] =  customMessage
            }else{
                formErrors[fieldName] =  ""
                delete formErrors[fieldName]
            };
        }else{
            // console.log("no custom message")
            if (fieldValue === ""){
                formErrors[fieldName] = "The " + fieldName + " field is required"
            }else{
                formErrors[fieldName] =  ""
                delete formErrors[fieldName]
            };

        }
    }

    let validateRangeValue = (fieldName,val,min,max,customMessage) => {

        // if value is valid
        if (val) {

            console.log(`checking value ${val} - ${typeof val}|${min} - ${typeof val}|${max} - ${typeof val}`)
            if (customMessage) {

                if ((val < min || val > max) ){
                    formErrors[fieldName] = customMessage
                }else{
                    delete formErrors[fieldName]
                }

            } else {
                if ((val < min || val > max) ){
                    formErrors[fieldName] = `Value should be between ${min} and ${max}`
                }else{
                    delete formErrors[fieldName]
                }

            }
        }else {
            if  (val != 0 ) {
                formErrors[fieldName] = `Value should be between ${min} and ${max}`
            }else{
                delete formErrors[fieldName]
            }
        }
    }

    return {
        formErrors,
        validateEmptyField,
        validateRangeValue
    }
}