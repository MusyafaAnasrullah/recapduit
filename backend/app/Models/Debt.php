<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Debt extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'person',
        'type',
        'amount',
        'due_date',
        'note',
        'status',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
