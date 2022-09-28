<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CompanieSector;

class Sector extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function sectors()
    {
        return $this->hasMany(CompanieSector::class);
    }
}