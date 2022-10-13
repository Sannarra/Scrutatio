<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\Post;
use Illuminate\Support\Facades\Schema;

class PostSeeder extends Seeder
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
        Post::truncate();
        Schema::enableForeignKeyConstraints();

        for ($i = 0; $i < 50; $i++) {
            Post::create([
                'title' => $faker->jobTitle(),
                'short_brief' => $faker->paragraph(),
                'description' => $faker->paragraphs($faker->numberBetween(3, 8), true),
                'salary' => $faker->numberBetween(500, 4000),
                'working_time' => $faker->numberBetween(15, 40),
                'city' => $faker->city(),
                'contract_type' => $faker->randomElement(["Not Defined", "Fixed-term", 'Permanent', "Internship", "Apprenticeship", "Seasonal"]),
                'company_id' => $faker->numberBetween(1, Company::count()),
            ]);
        }
    }
}