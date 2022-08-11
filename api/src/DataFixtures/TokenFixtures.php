<?php

namespace App\DataFixtures;

use App\Factory\ApiTokenFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class TokenFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        ApiTokenFactory::createMany(
            30,
            function () {
                return ['user' => UserFactory::random()];
            }
        );
    }

    /**
     * @return string[]
     */
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
}
