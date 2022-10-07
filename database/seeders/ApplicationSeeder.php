<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Application;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Schema;

class ApplicationSeeder extends Seeder
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
        Application::truncate();
        Schema::enableForeignKeyConstraints();

        for ($i = 0; $i < 20; $i++) {
            Application::create([
                'post_id' => $faker->numberBetween(1, Post::count()),
                'user_id' => $faker->numberBetween(1, User::count())
            ]);
        }
    }
}