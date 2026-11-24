<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Referral extends Model
{
    use HasFactory;

    protected $fillable = [
        'referrer_user_id',
        'referred_name',
        'plan_chosen',
        'commission_amount',
        'status',
        'join_date',
    ];

    protected $casts = [
        'commission_amount' => 'decimal:2',
        'join_date' => 'date',
    ];

    public function referrer()
    {
        return $this->belongsTo(User::class, 'referrer_user_id');
    }
}
