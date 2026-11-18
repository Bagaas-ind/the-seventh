<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    use HasFactory;
    protected $table = 'music'; // Karena nama tabelnya 'music', bukan 'musics'
    protected $fillable = ['title', 'type', 'embed_url'];
}