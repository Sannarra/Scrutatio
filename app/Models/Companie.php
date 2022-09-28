<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}