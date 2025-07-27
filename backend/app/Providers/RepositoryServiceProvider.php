<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            \App\Repositories\Contracts\InstitutionRepositoryInterface::class,
            \App\Repositories\Eloquent\InstitutionRepository::class
        );
        
        $this->app->bind(
            \App\Repositories\Contracts\SchoolRepositoryInterface::class,
            \App\Repositories\Eloquent\SchoolRepository::class
        );
        
        $this->app->bind(
            \App\Repositories\Contracts\UserRepositoryInterface::class,
            \App\Repositories\Eloquent\UserRepository::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
