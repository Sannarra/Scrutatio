<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Sector;
use Illuminate\Support\Facades\Schema;

class SectorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sectors = ['Agriculture',
            'Metal Production',
            'Chemical industries',
            'Commerce',
            'Construction',
            'Education',
            'Financial services',
            'Food & drink',
            'Forestry',
            'Wood',
            'Health care',
            'Tourism',
            'Mining',
            'Mechanical and electrical engineering',
            'Media',
            'Culture',
            'Oil and gas production',
            'Postal and telecommunications services',
            'Public service',
            'Shipping',
            'Fisheries',
            'Textiles',
            'Clothing',
            'Transport'];

        Schema::disableForeignKeyConstraints();
        Sector::truncate();
        Schema::enableForeignKeyConstraints();

        foreach ($sectors as &$value)
            Sector::create(['name' => $value]);
    }
}