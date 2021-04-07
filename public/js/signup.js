
const signupForm = document.getElementById('user-signup-form')

signupForm.addEventListener('submit', function(event) {
    event.preventDefault()
    const email = event.target['user-signup-email'].value;
    const password = event.target['user-signup-password'].value
    console.log(' email => ', email, ' / password => ',password)


    fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({email, password})
    }).then(res => res.json()).then(data=> console.log(data))

})