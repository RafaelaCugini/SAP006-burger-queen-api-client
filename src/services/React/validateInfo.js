export default function validation(values){
    let errors = {};
    
    if(values.email === ''){
        errors.email = 'Invalid e-mail'
    }
    
    if(values.password === '') {
        errors.password = 'Please, type your password.'
    }else if(values.password.length <6){
        errors.password = 'Password must be 6 characters or more.'
    }
    
    if(values.role === ''){
        errors.role = 'Sector not selected.'
    }
    
    return errors;
    }