<?php

namespace Tests;

use App\Models\Auth\Grant;
use App\Models\Auth\PasswordGrant;
use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Testing\TestResponse;

abstract class TestCase extends BaseTestCase
{
	public function createApplication()
	{
		$app = require __DIR__.'/../app/app.php';

		putenv('APP_ROUTES_CACHE');
		unset($_ENV['APP_ROUTES_CACHE'], $_SERVER['APP_ROUTES_CACHE']);

		$app->make(Kernel::class)->bootstrap();

		return $app;
	}

	public function setUp(): void
	{
		parent::setUp();

		TestResponse::macro('assertUnauthenticated', $this->assertUnauthenticated());
	}

	protected static function createUser(?string $login = null, ?string $password = null): User
	{
		/** @var \Database\Factories\Auth\PasswordGrantFactory */
		$passwordGrantFactory = PasswordGrant::factory()->state([
			'login' => $login ?: fake()->userName(),
			'password' => $password ?: fake()->password(),
		]);

		/** @var \Database\Factories\Auth\GrantFactory */
		$grantFactory = Grant::factory()->asActive()->for($passwordGrantFactory, 'extendedGrant');

		/** @var \App\Models\User */
		return with(User::factory(), function (UserFactory $factory) use ($grantFactory) {
			return $factory->has($grantFactory)->create();
		});
	}

	protected function assertUnauthenticated(): callable
	{
		return function () {
			/** @var \Illuminate\Testing\TestResponse $this */
			return $this->assertStatus(401)
				->assertJson(fn (AssertableJson $json) => $json
					->where('error_reason', 'unauthenticated')
					->etc()
				);
		};
	}
}
