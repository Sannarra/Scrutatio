<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use App\Models\Account;
use Illuminate\Support\Facades\Hash;


class AccountSeeder extends Seeder
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
        Account::truncate();
        Schema::enableForeignKeyConstraints();

        Account::create([
            'email' => "company@scrutatio.fr",
            'password' => Hash::make("scrutatio"),
            'is_admin' => false
        ]);
        Account::create([
            'email' => "admin@scrutatio.fr",
            'password' => Hash::make("scrutatio"),
            'is_admin' => true
        ]);

        for ($i = 1; $i < 70; $i++) {
            Account::create([
                'email' => $faker->email(),
                'password' => Hash::make($faker->password()),
                'is_admin' => false
            ]);
        }
    }
}