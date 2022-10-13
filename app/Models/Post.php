<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Company;
use App\Models\Application;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title',
        'description',
        'salary',
        'working_time',
        'city',
        'contract_type',
        'company_id',
        'short_brief'];

    public function company()
    {
        return $this->belongsTo(Company::class , 'company_id');
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }


    public function toJobCard()
    {
        return [
            "title" => $this->title,
            "company_name" => $this->company->name,
            "city" => $this->city,
            "publication_date" => date('m-d H:i', strtotime($this->created_at)),
            "contract_type" => $this->contract_type,
            "salary" => $this->salary,
            "working_time" => $this->working_time,
            "description" => $this->description,
            "short_brief" => $this->short_brief,
            "id" => $this->id
        ];
    }
}