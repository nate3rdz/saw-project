import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private notificationAudio = new Audio();

    constructor() {
        this.notificationAudio.src = 'assets/notification.wav';
        this.notificationAudio.load();
    }

    playNotificationSound() {
        this.notificationAudio.play();
    }
}
