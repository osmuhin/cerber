<?php

use Illuminate\Foundation\AliasLoader;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

$bootstrapCache = __DIR__.'/../storage/framework/bootstrap';

putenv('APP_SERVICES_CACHE='.$bootstrapCache.'/services.php');
putenv('APP_PACKAGES_CACHE='.$bootstrapCache.'/packages.php');
putenv('APP_CONFIG_CACHE='.$bootstrapCache.'/config.php');
putenv('APP_ROUTES_CACHE='.$bootstrapCache.'/routes-v7.php');
putenv('APP_EVENTS_CACHE='.$bootstrapCache.'/events.php');

AliasLoader::getInstance();

$app = Application::configure(basePath: dirname(__DIR__))
	->withProviders([
		\App\Providers\AppServiceProvider::class,
		\App\Providers\AuthServiceProvider::class,
	])
	->withRouting(
		web: __DIR__.'/web.php',
		api: __DIR__.'/api.php',
		commands: __DIR__.'/console.php',
		health: '/up',
		apiPrefix: '',
	)
	->withCommands([
		__DIR__.'/Console/Commands',
	])
	->withMiddleware(function (Middleware $middleware): void {
		$middleware->use([
			\Illuminate\Http\Middleware\TrustHosts::class,
			\Illuminate\Http\Middleware\TrustProxies::class,
			\Illuminate\Http\Middleware\HandleCors::class,
			\Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance::class,
			\App\Http\Middleware\DecryptRequest::class,
			\Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
			\Illuminate\Foundation\Http\Middleware\TrimStrings::class,
			\Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
		]);

		$middleware->api(prepend: [
			\Illuminate\Routing\Middleware\ThrottleRequests::class.':api',
		]);

		$middleware->api(append: [
			\App\Http\Middleware\HasUserAgent::class,
		]);

		$middleware->alias([
			'encrypt-response' => \App\Http\Middleware\EncryptResponse::class,
		]);
	})
	->withExceptions(function (Exceptions $exceptions): void {
		$exceptions->shouldRenderJsonWhen(
			fn (Request $request) => $request->expectsJson(),
		);
	})
	->create()
	->useBootstrapPath(__DIR__);

$app->singleton(
	\Illuminate\Contracts\Debug\ExceptionHandler::class,
	\App\Exceptions\Handler::class,
);

return $app;
