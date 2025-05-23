<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CareerNotification extends Notification
{
    use Queueable;

    protected $register;
    protected $career;

    /**
     * Create a new notification instance.
     */
    public function __construct($register, $career)
    {
        $this->register = $register;
        $this->career = $career;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject($this->career['title'] . ' - ' . $this->register['name'])
                    ->greeting("From {$this->register['name']} ({$this->register['email']})")
                    ->line($this->register['description'])
                    ->action('Go to website', route('career.register'));
                    // ->line('Thank you for using our application!');
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
