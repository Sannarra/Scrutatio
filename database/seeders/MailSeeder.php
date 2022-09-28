<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mail;
use App\Models\Application;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

class MailSeeder extends Seeder
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
        Mail::truncate();
        Schema::enableForeignKeyConstraints();

        for ($i = 0; $i < 20; $i++) {
            Mail::create([
                'subject' => $faker->sentence(),
                'content' => $faker->text(),
                'application_id' => $faker->numberBetween(1, Application::count()),
                'sender_id' => $faker->numberBetween(1, User::count())
            ]);
        }
    }
}