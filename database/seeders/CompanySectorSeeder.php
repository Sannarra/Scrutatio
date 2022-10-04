<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\CompanySector;
use App\Models\Sector;
use Illuminate\Support\Facades\Schema;


class CompanySectorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();


        Schema::disableForeignKeyConstraints();
        CompanySector::truncate();
        Schema::enableForeignKeyConstraints();

        for ($i = 0; $i < 20; $i++) {
            CompanySector::create([
                'sector_id' => $faker->numberBetween(1, Sector::count()),
                'company_id' => $faker->numberBetween(1, Company::count())
            ]);
        }
    }
}