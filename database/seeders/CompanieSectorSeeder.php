<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Companie;
use App\Models\CompanieSector;
use App\Models\Sector;
use Illuminate\Support\Facades\Schema;


class CompanieSectorSeeder extends Seeder
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
        CompanieSector::truncate();
        Schema::enableForeignKeyConstraints();

        for ($i = 0; $i < 20; $i++) {
            CompanieSector::create([
                'sector_id' => $faker->numberBetween(1, Sector::count()),
                'companie_id' => $faker->numberBetween(1, Companie::count())
            ]);
        }
    }
}