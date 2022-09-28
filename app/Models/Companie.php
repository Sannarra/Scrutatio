<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\CompanieSector;

class Companie extends Model
{
    use HasFactory;

    protected $fillable = ['name',
        'creation_date',
        'size',
        'headquarter',
        'postal_code',
        'human_resources',
        'website'];

    public function human_resources_user()
    {
        return $this->belongsTo(User::class , 'human_resources');
    }

    public function sectors()
    {
        return $this->hasMany(CompanieSector::class);
    }
}