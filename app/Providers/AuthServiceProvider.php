<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Account;
use App\Models\Post;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::before(function ($user) {
            if ($user->is_admin == true) {
                return true;
            }
        });
        Gate::define('manage-posts', function (Account $user) {
            return $user->company !== null;
        });
        Gate::define('edit-post', function (Account $user, Post $post) {
            return $user->company !== null && $user->company->id == $post->company_id;
        });
        Gate::define('admin', function (Account $user) {
            return $user->is_admin == true;
        });
    }
}