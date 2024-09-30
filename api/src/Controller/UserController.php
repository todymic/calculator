<?php

namespace App\Controller;

use App\Entity\User;
use App\Manager\UserManager;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\ControllerTrait;
use FOS\RestBundle\View\View;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[Route('/users', name: 'app_user')]
class UserController extends AbstractController
{

    public function __construct(private readonly UserManager $userManager)
    {
    }

    #[Route('/{id}', name: 'profil', requirements: ['id' => "\d+"], methods: ['GET'])]
    public function getProfile(UserInterface $user): Response
    {
        $serializedUser = $this->userManager->serializeUser($user, [AbstractNormalizer::GROUPS => 'get_user']);

        return $this->json($serializedUser);
    }

    #[Route('/me', name: 'app_me', methods: 'GET')]
    public function getCurrentUser(?UserInterface $user): Response
    {
        $serializedUser = $this->userManager->serializeUser($user, [AbstractNormalizer::GROUPS => 'get_user']);

        return $this->json($serializedUser);
    }
}
