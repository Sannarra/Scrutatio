<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
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
        'id',
        'created_at',
        'updated_at',
        'firstname',
        'lastname',
        'phone',
        'city',
        'account_id'
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class , 'sender_account_id');
    }
}