<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Post;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'created_at',
        'updated_at',
        'name',
        'creation_date',
        'size',
        'headquarter',
        'description',
        'account_id',
        'website'];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}