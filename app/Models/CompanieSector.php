<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Sector;
use App\Models\Companie;

class CompanieSector extends Model
{
    use HasFactory;

    protected $fillable = ['sector_id', 'companie_id'];

    public function companie()
    {
        return $this->belongsTo(Companie::class);
    }

    public function sector()
    {
        return $this->belongsTo(Sector::class);
    }
}