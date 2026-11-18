<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    protected $fillable = ['date', 'city', 'venue', 'ticket_link', 'is_active'];
    protected $casts = [
        'date' => 'date',
        'is_active' => 'boolean',
    ];
}