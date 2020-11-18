if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => {
            console.log('Registration succeeded. Scope is ' + reg.scope);
        });
}



window.addEventListener('load', () => {
    let notificationPermission = false;

    const askPermissionButton = document.querySelector('#askPermissionButton');
    const showNotificationButton = document.querySelector('#showNotificationButton');

    askPermissionButton.addEventListener('click', async () => {
        const answer = await Notification.requestPermission();
        if(answer == 'granted') {
            notificationPermission = true;
            console.log('Notification: Permission granted, user allowed notifications')
        } else if(answer == 'denied') {
            console.log('Notificaton: User denied notification');
        } else {
            console.log('Notification: user declined to answer');
        }
    })

    showNotificationButton.addEventListener('click', () => {
        if (!notificationPermission) {
            console.log('We do not have permission to show notification');
            return;
        }

        const options = {
            body: "It's time to study!",
            icon: '../img/512.png'
        }

        let notif = new Notification('Reminder', options);

        notif.addEventListener('show', () => {
            console.log('Showing notification');
        })

        notif.addEventListener('click', () => {
            console.log('User clickad on notification');
        })
    })
})