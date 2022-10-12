<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->text('description');
            $table->integer('salary')->unsigned()->nullable();
            $table->integer('working_time')->unsigned()->nullable();
            $table->string('city');
            $table->enum('contract_type', ["Not Defined", "Fixed-term", 'Permanent', "Internship", "Apprenticeship", "Seasonal"]);
            $table->text('short_brief');
            $table->text('icon_src')->nullable();
            $table->foreignId('company_id')->constrained("companies")->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};