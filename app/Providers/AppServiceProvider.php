<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class AppServiceProvider extends ServiceProvider
{
	/**
	 * Register any application services.
	 */
	public function register(): void
	{
		if (env('DB_LOG_SQL_QUERIES', false)) {
			$this->enableDbQueriesLogging();
		}

		$this->app->singleton(\App\Services\Encryption\RequestEncrypter::class);
	}

	/**
	 * Bootstrap any application services.
	 */
	public function boot(): void
	{
		RateLimiter::for('api', function (Request $request) {
			return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
		});

		$this->registerMixins();

		JsonResource::withoutWrapping();

		Relation::enforceMorphMap([
			\App\Services\Auth\GrantTypes\PasswordGrantType::getIdentifier().'_grant' => \App\Models\Auth\PasswordGrant::class,
			\App\Services\Auth\GrantTypes\RefreshTokenGrantType::getIdentifier().'_grant' => \App\Models\Auth\RefreshTokenGrant::class,
		]);
	}

	protected function registerMixins(): void
	{
		Str::mixin(new \App\Mixins\Str);
		FilesystemAdapter::mixin(new \App\Mixins\FilesystemAdapter);
	}

	protected function enableDbQueriesLogging(): void
	{
		DB::listen(function (QueryExecuted $query) {
			$sql = DB::connection()
				->getQueryGrammar()
				->substituteBindingsIntoRawSql($query->sql, $query->bindings);

			Log::channel('sql')->debug("({$query->time}) {$sql}");
		});
	}
}
