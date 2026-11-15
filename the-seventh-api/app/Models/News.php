<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class News extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'excerpt', 'content', 'image_url'];

    protected static function booted(): void
    {
        static::creating(function (News $news) {
            if (empty($news->slug)) {
                $news->slug = Str::slug($news->title) . '-' . uniqid();
            }
        });
    }
}