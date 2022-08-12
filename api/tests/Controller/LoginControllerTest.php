<?php

namespace App\Tests\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class LoginControllerTest extends WebTestCase
{
    public function testLoginSuccess(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneById(1);

        $client->loginUser($testUser);
        $client->xmlHttpRequest('POST', '/api/login',[],[],[], json_encode([
            'username' => 'braun.tessie@sporer.com',
            'password' => 'test'
        ]));

        $this->assertResponseIsSuccessful();
    }
}
