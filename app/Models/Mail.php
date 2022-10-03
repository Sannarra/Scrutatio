<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Application;
use App\Models\User;

class Mail extends Model
{
    use HasFactory;

    protected $fillable = ['application_id',
        'sender_user_id',
        'subject',
        'content'];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class , 'sender_user_id');
    }
}