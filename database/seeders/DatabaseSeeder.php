<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([AccountSeeder::class ,
            UserSeeder::class ,
            SectorSeeder::class ,
            CompanieSeeder::class ,
            CompanieSectorSeeder::class ,
            AdvertisementSeeder::class ,
            ApplicationSeeder::class ,
            MailSeeder::class]);
    }
}