<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Companie;

class Advertisement extends Model
{
    use HasFactory;

    protected $fillable = ['title',
        'description',
        'salary',
        'working_time',
        'city',
        'contract_type',
        'companie_id'];

    public function companie()
    {
        return $this->belongsTo(Companie::class);
    }
}