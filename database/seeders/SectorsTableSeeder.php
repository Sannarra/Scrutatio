<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Sector;
use Illuminate\Support\Facades\Schema;

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

        Schema::disableForeignKeyConstraints();
        Sector::truncate();
        Schema::enableForeignKeyConstraints();

        for ($i = 0; $i < 50; $i++) {
            Sector::create([
                'name' => $faker->name,
            ]);
        }
    }
}