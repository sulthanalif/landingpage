<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ActionRegisNotification extends Notification
{
    use Queueable;

    protected $regis;


    /**
     * Create a new notification instance.
     */
    public function __construct($regis)
    {
        $this->regis = $regis;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $message = $this->regis->approvalRegis->status ? 'Congratulation, your registration has been approved' : 'Sorry, your registration has been rejected';

        return (new MailMessage)
                    ->subject("Notification Registration")
                    ->greeting("Halo, {$this->regis->name}")
                    ->line("{$message}.")
                    ->line('Thank you for registering.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
