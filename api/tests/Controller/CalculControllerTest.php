<?php

namespace App\Tests\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class CalculControllerTest extends WebTestCase
{
    public function testCalculResult(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneById(1);

        $client->loginUser($testUser);

        $client->xmlHttpRequest('POST', '/api/calcul', ['input' => '2+3']);

        $content = $client->getResponse()->getContent();

        $this->assertResponseIsSuccessful();
        $this->assertJsonStringEqualsJsonString(json_encode(['result' => '5']), $content);
    }

    
    public function testAccessForbidden(): void
    {
        $client = static::createClient();

        $client->xmlHttpRequest('POST', '/api/calcul', ['input' => '2+3']);

        $this->assertResponseIsUnprocessable();
    }
}
