<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Companie;
use App\Models\Application;

class Advertisement extends Model
{
    use HasFactory;

    protected $fillable = ['title',
        'description',
        'salary',
        'working_time',
        'city',
        'contract_type',
        'company_id'];

    public function companie()
    {
        return $this->belongsTo(Companie::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}