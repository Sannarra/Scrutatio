<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Sector;

class SectorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        Sector::truncate();
        // Create 50 product records
        for ($i = 0; $i < 50; $i++) {
            Sector::create([
                'name' => $faker->name,
            ]);
        }
    }
}