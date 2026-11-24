<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'avatar',
        'plan',
        'is_connected',
        'connected_phone',
        'bot_nickname',
        'referral_code',
        'referral_balance',
        'pending_referral',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_connected' => 'boolean',
            'referral_balance' => 'decimal:2',
            'pending_referral' => 'decimal:2',
        ];
    }

    public function wallets()
    {
        return $this->hasMany(Wallet::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function debts()
    {
        return $this->hasMany(Debt::class);
    }

    public function budgets()
    {
        return $this->hasMany(Budget::class);
    }

    public function reminders()
    {
        return $this->hasMany(Reminder::class);
    }

    public function chatMessages()
    {
        return $this->hasMany(ChatMessage::class);
    }

    public function referrals()
    {
        return $this->hasMany(Referral::class, 'referrer_user_id');
    }
}
