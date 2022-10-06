<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\CompanySector;
use App\Models\Advertisement;

class Company extends Model
{
    use HasFactory;

    protected $fillable = ['name',
        'creation_date',
        'size',
        'headquarter',
        'postal_code',
        'human_resources_id',
        'website'];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function sectors()
    {
        return $this->hasMany(CompanySector::class);
    }

    public function advertisements()
    {
        return $this->hasMany(Advertisement::class);
    }
}