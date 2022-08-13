<?php

namespace App\Manager;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserManager
{
    public function __construct(private readonly EntityManagerInterface $entityManager,
                                private readonly UserPasswordHasherInterface $passwordHasher)
    {
    }

    /**
     * @throws \Exception
     */
    public function register(User $user): User
    {
        $token = rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '=');
        $user->setApiToken($token);
        $user->setPassword($this->passwordHasher->hashPassword($user, $user->getPassword()));

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }


}
