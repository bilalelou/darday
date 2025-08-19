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
            // Drop old columns if they exist
            if (Schema::hasColumn('properties', 'city')) {
                $table->dropColumn('city');
            }
            if (Schema::hasColumn('properties', 'type')) {
                $table->dropColumn('type');
            }

            $table->foreignId('city_id')->nullable()->constrained()->after('address');
            $table->foreignId('property_type_id')->nullable()->constrained()->after('city_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->string('city')->nullable()->after('address');
            $table->string('type')->nullable()->after('city');

            if (Schema::hasColumn('properties', 'city_id')) {
                $table->dropConstrainedForeignId('city_id');
            }
            if (Schema::hasColumn('properties', 'property_type_id')) {
                $table->dropConstrainedForeignId('property_type_id');
            }
        });
    }
};
