<?php

namespace App\Tests\Controller;

use App\Repository\UserRepository;
use Exception;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class LoginControllerTest extends WebTestCase
{
    /**
     * @throws Exception
     */
    public function testLoginSuccess(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneById(1);

        $client->loginUser($testUser);

        $payload = json_encode([
            'username' => 'braun.tessie@sporer.com',
            'password' => 'test',
        ]);
        $client->xmlHttpRequest('GET', '/api/login', [], [], [], $payload);

        $contentResponse = $client->getResponse()->getContent();
        $expected = json_encode([
            'user' => 'braun.tessie@sporer.com',
            'token' => 'b226775457cfa30a8fd52fdd818285cce851e9ec840b8ab77706e6b9672b5859008ca3da6b28db5c5c81ae0dd039610df4019bfdf53af5a36794e003',
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonStringEqualsJsonString($expected, $contentResponse);
    }

    /**
     * @dataProvider invalidCredentialsProvider
     */
    public function testLoginFailure(array $payload, array $excepted): void
    {
        $client = static::createClient();

        $payload = json_encode($payload);
        $client->xmlHttpRequest('GET', '/api/login', [], [], [], $payload);

        $contentResponse = $client->getResponse()->getContent();
        $jsonExpected = json_encode($excepted);

        $this->assertResponseStatusCodeSame($client->getResponse()->getStatusCode());
        $this->assertJsonStringEqualsJsonString($jsonExpected, $contentResponse);
    }

    public function invalidCredentialsProvider()
    {
        return [
            'invalid credentials' => [
                [
                    'username' => 'test@test.test',
                    'password' => 'test',
                ],
                ['error' => 'Invalid credentials.'],
            ],
            'password not provided' => [
                [
                    'username' => 'test@test.test',
                ],
                ['error' => 'The key "password" must be provided.'],
            ],
        ];
    }
}
