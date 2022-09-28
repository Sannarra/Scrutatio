<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Companie;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

class CompanieSeeder extends Seeder
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
        Companie::truncate();
        Schema::enableForeignKeyConstraints();

        for ($i = 0; $i < 20; $i++) {
            Companie::create([
                'name' => $faker->company(),
                'creation_date' => $faker->date(),
                'size' => $faker->numberBetween(10, 50000),
                'headquarter' => $faker->city(),
                'postal_code' => $faker->postcode(),
                'human_resources_id' => $faker->numberBetween(1, User::count()),
                'website' => $faker->url(),
            ]);
        }
    }
}