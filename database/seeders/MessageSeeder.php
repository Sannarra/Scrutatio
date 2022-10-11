<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Message;
use App\Models\Application;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

class MessageSeeder extends Seeder
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
        Message::truncate();
        Schema::enableForeignKeyConstraints();

        for ($i = 0; $i < 20; $i++) {
            Message::create([
                'content' => $faker->text(),
                'application_id' => $faker->numberBetween(1, Application::count()),
                'sender_user_id' => $faker->numberBetween(1, User::count())
            ]);
        }
    }
}