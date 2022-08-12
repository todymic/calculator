<?php

namespace App\Tests\Controller;

use App\Repository\UserRepository;
use Exception;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class CalculControllerTest extends WebTestCase
{
    /**
     * @throws Exception
     */
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

    /**
     * @dataProvider UnauthorizedProvider
     */
    public function testAccessForbidden(array $excepted): void
    {
        $client = static::createClient();

        $client->xmlHttpRequest('POST', '/api/calcul');

        $contentResponse = $client->getResponse()->getContent();
        $jsonExpected = json_encode($excepted);

        $this->assertResponseStatusCodeSame($client->getResponse()->getStatusCode());
        $this->assertJsonStringEqualsJsonString($jsonExpected, $contentResponse);
    }

    public function UnauthorizedProvider()
    {
        return [
            '401_unauthorized' => [
                ['error' => 'Full authentication is required to access this resource.'],
            ]
        ];
    }
}
