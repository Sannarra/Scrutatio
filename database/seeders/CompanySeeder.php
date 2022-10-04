<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Company;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

class CompanySeeder extends Seeder
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
        Company::truncate();
        Schema::enableForeignKeyConstraints();

        for ($i = 0; $i < 20; $i++) {
            Company::create([
                'name' => $faker->company(),
                'creation_date' => $faker->date(),
                'size' => $faker->numberBetween(10, 50000),
                'headquarter' => $faker->city(),
                'postal_code' => $faker->postcode(),
                'account_id' => $i + 51,
                'website' => $faker->url(),
            ]);
        }
    }
}