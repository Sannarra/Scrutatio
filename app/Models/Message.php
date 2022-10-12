<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Application;
use App\Models\User;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_id', //with company_id
        'sender_account_id',
        'content'];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class , 'sender_account_id');
    }
}