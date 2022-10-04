<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Company;
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
        'company_id',
        'icon_src',
        'short_brief'];

    public function company()
    {
        return $this->belongsTo(Company::class , 'company_id');
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}