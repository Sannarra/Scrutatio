<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;


use App\Models\Companie;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
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