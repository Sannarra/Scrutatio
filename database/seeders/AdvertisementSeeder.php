<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Companie;
use App\Models\Advertisement;
use Illuminate\Support\Facades\Schema;

class AdvertisementSeeder extends Seeder
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
        Advertisement::truncate();
        Schema::enableForeignKeyConstraints();

        for ($i = 0; $i < 50; $i++) {
            Advertisement::create([
                'title' => $faker->jobTitle(),
                'description' => $faker->paragraph(),
                'salary' => $faker->numberBetween(500, 4000),
                'working_time' => $faker->numberBetween(15, 40),
                'city' => $faker->city(),
                'contract_type' => $faker->numberBetween(0, 5),
                'companie_id' => $faker->numberBetween(1, Companie::count())
            ]);
        }
    }
}