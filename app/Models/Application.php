<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Post;
use App\Models\User;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'post_id',
        'user_id', ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function applicant()
    {
        return $this->belongsTo(User::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}