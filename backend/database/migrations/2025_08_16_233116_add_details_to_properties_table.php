<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->integer('bedrooms')->default(1)->after('type');
            $table->integer('bathrooms')->default(1)->after('bedrooms');
            $table->integer('area')->nullable()->after('bathrooms'); // المساحة بالمتر المربع
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropColumn(['bedrooms', 'bathrooms', 'area']);
        });
    }
};
