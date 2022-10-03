<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Companie;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'firstname',
        'lastname',
        'phone',
        'city',
        'status'
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function mails()
    {
        return $this->hasMany(Mail::class , 'sender_user_id');
    }
}